var _ = require('lodash'),
fs = require('fs'),
File = require('vinyl'),
matter = require('gray-matter');


module.exports = function(particleName,options) {
  var opts = _.merge({
    wrapLogicalId: true
  },options);

  var helper = function(cModule,pPath,hArgs,hOpts,cOpts) {

    // If this particle is extended by another and both have content blocks, merge them
    // This variable holds the extended output to be merged.
    var deepMerge = {};

    var engine = cOpts.handlebars;
    var data = cOpts.handlebars.createFrame(hOpts.data || {});

    var wrapLogicalId = _.isUndefined(data.wrapLogicalId) ? opts.wrapLogicalId : data.wrapLogicalId;
    var extended = data.extended || false;

    // Once a section has been started any subsequent calls should not wrap a logical id.
    // Allows a particle to 'extend' another particle
    data.extended = true;
    data.wrapLogicalId = false;

    var fn,
    m = {},
    file = data._file;

    if (pPath) {
      var particle = cOpts.particleLoader.loadParticle(particleName,cModule,pPath,{parentFile: hOpts.data._file});
      file = new File({path: particle.path});
      m = matter(fs.readFileSync(particle.fsPath,{encoding:'utf8'}));
      fn = engine.compile(m.content,{noEscape:true});
    }
    else {
      fn = hOpts.fn;
      m.data = {};
    }

    data._file = file;

    var templateContent = '';
    if (extended) {
      // If extending another particle of the same type merge options in reverse
      templateContent = new engine.SafeString(fn(_.merge(hOpts.hash,_.merge(m.data,this)),{data:data}));
    }
    else {
      templateContent = new engine.SafeString(fn(_.merge(_.merge(m.data,this),hOpts.hash),{data:data}));
    }

    var logicalId = [hOpts.hash.logicalIdPrefix,hOpts.hash.logicalId,hOpts.hash.logicalIdSuffix].join('');

      /* For backwards compatiblity with older partials check to see if the
       * content is a valid JSON object.  If it is, don't wrap the content in braces
       *
       */
      try {
        var testContent = JSON.parse(templateContent);
        if (!_.isObject(testContent)) {
          throw new Error("Must be an Object");
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
        throw new Error(e+"\nSection parse error: " + particleName + " in file " + hOpts.data._file.path + "\n" + templateContent);
      }

      var finalContent = templateContent;
      if (wrapLogicalId === true) {
        // TODO Throw if no logicalId
          finalContent = '"'+logicalId+'":'+finalContent;
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
