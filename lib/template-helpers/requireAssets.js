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
    var module, pPath, context;

    if (arguments.length === 3) {
      module = arguments[0];
      pPath = arguments[1];
      context = arguments[2];
    }
    else if (arguments.length === 2) {
      module = null;
      pPath = arguments[0];
      context = arguments[1];
    }
    else {
      //TODO
    }

    var data = Handlebars.createFrame(context.data.root);
    options.particleLoader.loadParticle('asset',module,pPath,{currModulePath: data._condensationCurrModulePath});

    return '';
  };

  if (!engine.helpers.requireAssets) {
    engine.registerHelper('requireAssets',helper);
  }
  return helper;
};

module.exports = createHelper;
