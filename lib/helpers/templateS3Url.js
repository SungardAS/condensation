var Handlebars = require('handlebars'),
_ = require('lodash'),
path = require('path'),
fs = require('fs');

var createHelper = function(options) {
  var opts = _.merge({
    handlebars: Handlebars,
    projectDir: process.cwd(),
    particleLoader: null
  },options);
  var engine = opts.handlebars;

  var helper = function (module, pPath, context) {
    var data = Handlebars.createFrame(context.data.root);
    var particle = opts.particleLoader.loadParticle('template',module,pPath,{currModulePath: data._condensationCurrModulePath});

    return data.s3.awsPath+particle.path;
  };

  if (!engine.helpers['templateS3Url']) {
    engine.registerHelper('templateS3Url',helper);
  }
  return helper;
};

module.exports = createHelper;
