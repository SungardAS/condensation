var _ = require('lodash');
var fs = require('fs');
var File = require('vinyl');
var matter = require('gray-matter');
var VError = require('verror');


/**
* The build_helper function.
* Returns a helper function that is able to process a particle section
*
*
* @method buildHelper
* @param {String} particleName The name of the particle section (parameter|resource|...)
* @param {Object} options A config object
* @return {Function} A function that helps compile section particles
*/
module.exports = function buildHelper(particleName,options) {
  var opts = _.merge({
    wrapLogicalId: true
  },options);

  /**
   * @param {String} cModule The condensation module being processed
   * @param {String} pPath The particle path
   * @param {Object} hArgs Handlebars arguments
   * @param {Object} hOpts Handlebars options
   * @param {Object} cOpts Condensation options
   * @return {String} Finalized content for the particle section
   */
  var helper = function(cModule,pPath,hArgs,hOpts,cOpts) {

    // If this particle is extended by another and both have content blocks, merge them
    // This variable holds the extended output to be merged.
    var deepMerge = {};

    var engine = cOpts.handlebars;
    var data = cOpts.handlebars.createFrame(hOpts.data || {});

    var wrapLogicalId = _.isUndefined(data.wrapLogicalId) ? opts.wrapLogicalId : data.wrapLogicalId;
    var extended = data.extended || false;
    var callerFile = data._file;

    // Once a section has been started any subsequent calls should not wrap a logical id.
    // Allows a particle to 'extend' another particle
    data.extended = true;
    data.wrapLogicalId = false;

    var mergeParticleTemplate = '{}';
    var templateContent = '{}';

    if (hOpts.fn) {
      templateContent = processTemplate.call(this,hOpts.fn,hOpts,cOpts,{data:{}},data,extended,particleName);
    }

    if (pPath) {
      var particle = cOpts.particleLoader.loadParticle(particleName,cModule,pPath,{parentFile: hOpts.data._file});
      var file = new File({path: particle.path});
      var m = matter(fs.readFileSync(particle.fsPath,{encoding:'utf8'}));

      var pData = _.cloneDeep(data);
      pData._file = file;

      var fn = engine.compile(m.content,{noEscape:true,data:pData});
      mergeParticleTemplate = processTemplate.call(this,fn,hOpts,cOpts,m,pData,true,particleName);
    }

    templateContent = JSON.stringify(_.merge(JSON.parse(mergeParticleTemplate),JSON.parse(templateContent)));

    var finalContent = templateContent;
    if (wrapLogicalId === true) {

      var logicalId = hOpts.hash.logicalId;

      if (hOpts.hash.scope !== false) {
        var logicalIdPrefix = [hOpts.hash.logicalIdPrefix,this.logicalIdPrefix].join('');
        var logicalIdSuffix = [this.logicalIdSuffix,hOpts.hash.logicalIdSuffix].join('');
        logicalId = [logicalIdPrefix,logicalId,logicalIdSuffix].join('');
      }

      finalContent = ['"',logicalId,'":',finalContent].join('');

      if (!logicalId) {
        var message = [
          "LogicalId undefined for ",
          particleName,
          " ",
          (cModule ? cModule + ":" : ""),
          pPath,
          " called from ",
          callerFile.path,
          "\n\n",
          finalContent
        ].join('');
        throw new Error(message);
      }
    }

    /* Check to see if this is being added to a layout.
     * If so, add to the respective section.
     *
     * If not, return the string
     */
    if (data._layoutContentPusher && data._layoutContentPusher[particleName] && !extended) {
      data._layoutContentPusher[particleName](finalContent);
    }
    else {
      return finalContent;
    }
  };

  return helper;
};

var processTemplate = function(fn,hOpts,cOpts,m,data,extended,particleName) {

  var engine = cOpts.handlebars;
  var templateContent = '';

  try {
    if (extended) {
      // If extending another particle of the same type merge `hOpts.hash` before `this`
      templateContent = new engine.SafeString(fn(_.merge(m.data,hOpts.hash,this),{data:data}));
    }
    else {
      templateContent = new engine.SafeString(fn(_.merge(m.data,this,hOpts.hash),{data:data}));
    }
  }
  catch(e) {
    var ve = new VError(e,"Template Process Error");
    if (VError.findCauseByName(ve,"SyntaxError")) {
      throw(ve.message);
    }
    console.log(data);
    ve = new VError(ve,'%s\n\nParticle "%s included by %s"',m.orig,data._file.path,data._parent._file.path);
    throw(ve.message);
  }

  /* For backwards compatiblity with older partials check to see if the
   * content is a valid JSON object.  If it is, don't wrap the content in braces
   *
   */
  try {
    var testContent = JSON.parse(templateContent);
    if (!_.isObject(testContent)) {
      throw new VError("Must be an Object");
    }
  }
  catch(e) {
    /* If the try block does not work, no need to catch the error.
     * Wrap the string in braces and move on to the next try
     */
    templateContent = '{'+templateContent+'}';
  }

  /* Ensure the manufactured string is JSON compliant.
   * If not, trow an error for this inclusion.
   */
  try {
    JSON.parse(templateContent);
  }
  catch(e) {
    var ve = new VError(e,'Section Parse Error: particle "%s" in file %s\n%s\n\n',particleName,hOpts.data._file.path,templateContent);
    throw(ve);
  }
  return templateContent;
};
