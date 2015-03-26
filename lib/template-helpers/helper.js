var Handlebars = require('handlebars'),
_ = require('lodash');

var createHelper = function(options) {
  options = _.merge({
    handlebars: Handlebars,
    projectDir: process.cwd(),
    particleLoader: null
  },options);
  var engine = options.handlebars;

  var helper = function () {
    var args = arguments;
    var module = args[0];
    var moduleHelper = args[1];
    var context = _.last(args);

    var data = Handlebars.createFrame(context.data.root);
    var particle = options.particleLoader.loadParticle('helper',module,moduleHelper,{currModulePath: data._condensationCurrModulePath});

    var helperFunc = require(particle.path);

    var moduleHelperArgs = [];
    if (args.length > 3) {
      moduleHelperArgs = _.slice(args,0,args.length-3);
    }
    return helperFunc.apply(moduleHelperArgs);
  };

  if(!engine.helpers.helper) {
    engine.registerHelper('helper',helper);
  }

  return helper;
};

module.exports = createHelper;
