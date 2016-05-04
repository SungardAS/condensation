var _ = require('lodash');
var loadTemplateHelper = require('./template-helper-loader');
var sections = require('../template-helpers/sections');

module.exports = function(options) {

  var helpers = {
    assetPath: loadTemplateHelper(require('../template-helpers/assetPath'),options),
    assetS3Url: loadTemplateHelper(require('../template-helpers/assetS3Url'),options),
    concat: require('../../handlebars-helpers/concat'),
    helper: loadTemplateHelper(require('../template-helpers/helper'),options),
    layout: loadTemplateHelper(require('../template-helpers/layout'),options),
    partial: loadTemplateHelper(require('../template-helpers/partial'),options),
    ref: require('../template-helpers/ref'),
    requireAssets: loadTemplateHelper(require('../template-helpers/requireAssets'),options),
    scopeId: require('../template-helpers/scopeId'),
    set: loadTemplateHelper(require('../template-helpers/set'),options),
    templateS3Url: loadTemplateHelper(require('../template-helpers/templateS3Url'),options)
  };

  _.each(_.values(sections), function(v) {
    helpers[v.NAME] = loadTemplateHelper(v,options);
  });


  var engine = options.handlebars;
  _.each(_.toPairs(helpers), function(kv) {
    if (!engine.helpers[kv[0]]) {
      engine.registerHelper(kv[0],kv[1]);
    }
  });

  return helpers;
};

