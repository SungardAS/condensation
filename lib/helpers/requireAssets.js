var Handlebars = require('handlebars'),
_ = require('lodash'),
path = require('path'),
fs = require('fs');

var createHelper = function(options) {
  options = _.merge({
    handlebars: Handlebars,
    projectDir: process.cwd(),
    particleLoader: null
  },options);
  var engine = options.handlebars;

  var helper = function (module, glob, context) {
    var data = Handlebars.createFrame(context.data.root);
    var particle = options.particleLoader.loadParticle('asset',module,glob,{currModulePath: data._condensationCurrModulePath});

    return '';
  };

  if (!engine.helpers['requireAssets']) {
    engine.registerHelper('requireAssets',helper);
  }
  return helper;
};

module.exports = createHelper;
