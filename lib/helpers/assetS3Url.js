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

  var helper = function () {
    var module, pPath, context;

    if (arguments.length == 3) {
      module = arguments[0];
      pPath = arguments[1];
      context = arguments[2];
    }
    else if (arguments.length == 2) {
      module = null;
      pPath = arguments[0];
      context = arguments[1];
    }
    else {
      //TODO
    }

    var data = Handlebars.createFrame(context.data.root);
    var particle = options.particleLoader.loadParticle('asset',module,pPath,{currModulePath: data._condensationCurrModulePath});

    return data.s3.awsPath + '/' + particle.path;
  };

  if (!engine.helpers['assetS3Url']) {
    engine.registerHelper('assetS3Url',helper);
  }
  return helper;
};

module.exports = createHelper;
