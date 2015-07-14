var _ = require('lodash'),
fs = require('fs'),
File = require('vinyl'),
matter = require('gray-matter');


module.exports = function(particleName,options) {
  var opts = _.merge({
    wrapLogicalId: true
  },options);

  var helper = function(cModule,pPath,hArgs,hOpts,cOpts) {

    var engine = cOpts.handlebars;
    var data = cOpts.handlebars.createFrame(hOpts.data || {});

    var wrapLogicalId = _.isUndefined(data.wrapLogicalId) ? opts.wrapLogicalId : data.wrapLogicalId;
    var extended = data.extended || false;

    // Once a section partical has been started any subsequent calls should not wrap a logical id.
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

    var finalContent = templateContent;

    if (wrapLogicalId === true) {
      try {
        var testContent = JSON.parse(templateContent);
        if (_.isObject(testContent)) {
          finalContent = '"'+logicalId+'":'+templateContent;
        }
        else {
          throw Error("Must be an Object");
        }
      }
      catch(e) {
        finalContent = '"'+logicalId+'":{'+templateContent+'}';
      }
      try {
        JSON.parse('{'+finalContent+'}');
      }
      catch(e) {
        throw new Error(e+"\nSection parse error: " + particleName + " in file " + hOpts.data._file.path + "\n" + finalContent);
      }
    }

    if (data._layoutContentPusher && data._layoutContentPusher[particleName] && !extended) {
      data._layoutContentPusher[particleName](finalContent);
    }
    else {
      return finalContent;
    }
  };

  return helper;
};
