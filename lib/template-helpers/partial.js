var Handlebars = require('handlebars'),
_ = require('lodash'),
path = require('path'),
fs = require('fs');

var createPartialHelper = function(options) {
  var opts = _.merge({
    handlebars: null,
    projectDir: process.cwd(),
    particleLoader: null
  },_.omit(options,_.isUndefined));
  var engine = opts.handlebars;

  var helper = function (module, pPath, context) {
    var data = Handlebars.createFrame(context.data.root);
    var particle = opts.particleLoader.loadParticle('partial',module,pPath,{currModulePath: data._condensationCurrModulePath});
    var partialContents = fs.readFileSync(particle.path,{encoding:'utf8'});

    if (!engine.partials[particle.path]) {
      engine.registerPartial(particle.path,fs.readFileSync(particle.path,{encoding:'utf8'}));
    }

    var partial = engine.partials[particle.path];

    var fn = engine.compile(partialContents);
    return new engine.SafeString(fn(_.merge(data,{_condensationCurrModulePath: particle.modulePath})));
  };

  if (!engine.helpers['partial']) {
    engine.registerHelper('partial',helper);
  }
  return helper;
};

module.exports = createPartialHelper;
