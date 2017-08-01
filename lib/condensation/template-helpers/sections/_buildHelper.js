var _ = require('lodash');
var fs = require('fs');
var File = require('vinyl');
var matter = require('gray-matter');
var yaml = require('js-yaml');
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
module.exports = function buildHelper(particleName, options) {

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

    var engine = cOpts.handlebars;
    var data = cOpts.handlebars.createFrame(hOpts.data || {});

    var wrapLogicalId = _.isUndefined(data.wrapLogicalId) ? opts.wrapLogicalId : data.wrapLogicalId;
    var extended = data.extended || false;
    var callerFile = data._file;

    // Once a section has been started any subsequent calls should not wrap a logical id.
    // Allows a particle to 'extend' another particle
    data.extended = true;
    data.wrapLogicalId = false;

    var mergeParticleTemplate = {};
    var templateContent = {};
    var finalContent = {};

    if (hOpts.fn) {
      templateContent = processTemplate.call(
        this,
        {
          fn: hOpts.fn,
          hOpts: hOpts,
          cOpts: cOpts,
          m: {data:{}},
          data: data,
          extended: extended,
          particleName: particleName,
          helperOpts: opts
        }
      );
    }

    if (pPath) {

      var particle = cOpts.particleLoader.loadParticle(particleName,cModule,pPath,{parentFile: hOpts.data._file});
      var file = new File({path: particle.path});
      var m = matter(fs.readFileSync(particle.fsPath,{encoding:'utf8'}));

      var pData = _.cloneDeep(data);
      pData._file = file;

      var fn = engine.compile(m.content,{noEscape:true,data:pData});
      mergeParticleTemplate = processTemplate.call(
        this,
        {
          fn: fn,
          hOpts: hOpts,
          cOpts: cOpts,
          m: m,
          data: pData,
          extended: true,
          particleName: particleName,
          helperOpts: opts
        }
      );
    }

    templateContent = _.merge({},mergeParticleTemplate,templateContent);

    var logicalId = hOpts.hash.logicalId;

    if (wrapLogicalId && !logicalId && !opts.allowString) {
      var ve = new VError(
        'logicalId undefined for %s %s %s called from %s \n\n %s',
        particleName,
        (cModule ? cModule + ":" : ""),
        pPath,
        callerFile.path,
        finalContent
      );
      throw(ve);
    }

    if (wrapLogicalId && logicalId) {

      var logicalId = hOpts.hash.logicalId;

      if (hOpts.hash.scope !== false) {
        var logicalIdPrefix = [hOpts.hash.logicalIdPrefix,this.logicalIdPrefix].join('');
        var logicalIdSuffix = [this.logicalIdSuffix,hOpts.hash.logicalIdSuffix].join('');
        logicalId = [logicalIdPrefix,logicalId,logicalIdSuffix].join('');
      }

      finalContent[logicalId] = templateContent;
    }
    else {
      finalContent = templateContent
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

      if (hOpts.data._file.path.match(/ya?ml(\.hbs)?$/)) {
        var str = finalContent;
        str = str.toHTML ? str.toString() : yaml.dump(str);
        return str;
      }
      else {
        var str = finalContent;
        str = str.toHTML ? str.toString() : JSON.stringify(str);

        if (extended || opts.allowString) {
          return str;
        }
        else {
          return str.substring(1, str.length-1);
        }
      }
    }
  };

  return helper;
};

var processTemplate = function(conf) {

  var engine = conf.cOpts.handlebars;
  var templateContent = '';

  try {
    if (conf.extended) {
      // If extending another particle of the same type merge `hOpts.hash` before `this`
      templateContent = new engine.SafeString(conf.fn(_.merge({},conf.m.data,conf.hOpts.hash,this),{data:conf.data}));
    }
    else {
      templateContent = new engine.SafeString(conf.fn(_.merge({},conf.m.data,this,conf.hOpts.hash),{data:conf.data}));
    }
  }
  catch(e) {
    var ve = new VError(e,"Template Process Error");
    if (VError.findCauseByName(ve,"SyntaxError")) {
      throw(ve.message);
    }
    ve = new VError(ve,'%s\n\nParticle "%s included by %s"',conf.m.orig,conf.data._file.path,conf.data._parent._file.path);
    throw(ve.message);
  }

  /* For backwards compatiblity with older partials check to see if the
   * content is a valid JSON object.  If it is, don't wrap the content in braces
   *
   */
  if (conf.hOpts.data._file.path.match(/ya?ml(\.hbs)?$/)) {
    // do nothing for yaml
  }
  else if (!conf.helperOpts.allowString) {
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
  }

  /* Ensure the manufactured string is JSON or YAML compliant.
   * If not, trow an error for this inclusion.
   */
  var returnObject = {};
  try {
    if (conf.hOpts.data._file.path.match(/ya?ml(\.hbs)?$/)) {
      returnObject = yaml.safeLoad(templateContent);
    }
    else {
      returnObject = JSON.parse(templateContent);
    }
  }
  catch(e) {
    if (conf.helperOpts.allowString) {
      return templateContent;
    }
    else {
      var ve = new VError(e,'Section Parse Error: particle "%s" in file %s\n%s\n\n',conf.particleName,conf.hOpts.data._file.path,templateContent);
      throw(ve);
    }
  }
  return returnObject;
};
