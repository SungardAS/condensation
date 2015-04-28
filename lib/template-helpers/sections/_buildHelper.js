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
    // This will allow for a particle to 'extend' another particle
    data.extended = true;
    data.wrapLogicalId = false;

    var fn,
        m = {},
        file = data._file;

    if (pPath) {
      var particle = cOpts.particleLoader.loadParticle(particleName,cModule,pPath,{parentFile: hOpts.data._file});
      file = new File({path: particle.path});
      m = matter(fs.readFileSync(particle.fsPath,{encoding:'utf8'}));
      fn = engine.compile(m.content);
    }
    else {
      fn = hOpts.fn;
      m.data = {};
    }

    data._file = file;

    var tempalteContent;
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
      finalContent = '"'+logicalId+'":{'+templateContent+'}';
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
