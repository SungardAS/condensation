var _ = require('lodash');
var loadTemplateHelper = require('./template-helper-loader');
var sections = require('../template-helpers/sections');

module.exports = function(options) {

  var helpers = {
    arrayify: require('../template-helpers/arrayify'),
    assetPath: loadTemplateHelper(require('../template-helpers/assetPath'),options),
    assetS3Url: loadTemplateHelper(require('../template-helpers/assetS3Url'),options),
    concat: require('../../handlebars-helpers/concat'),
    cValue: require('../template-helpers/cValue'),
    fnAnd: require('../template-helpers/functions/fnAnd'),
    fnEquals: require('../template-helpers/functions/fnEquals'),
    fnIf: require('../template-helpers/functions/fnIf'),
    fnNot: require('../template-helpers/functions/fnNot'),
    fnOr: require('../template-helpers/functions/fnOr'),
    fnBase64: require('../template-helpers/functions/fnBase64'),
    fnFindInMap: require('../template-helpers/functions/fnFindInMap'),
    fnGetAZs: require('../template-helpers/functions/fnGetAZs'),
    fnGetAtt: require('../template-helpers/functions/fnGetAtt'),
    fnGetArtifactAtt: require('../template-helpers/functions/fnGetArtifactAtt'),
    fnGetParam: require('../template-helpers/functions/fnGetParam'),
    fnImportValue: require('../template-helpers/functions/fnImportValue'),
    fnJoin: require('../template-helpers/functions/fnJoin'),
    fnSelect: require('../template-helpers/functions/fnSelect'),
    fnSplit: require('../template-helpers/functions/fnSplit'),
    fnSub: require('../template-helpers/functions/fnSub'),
    helper: loadTemplateHelper(require('../template-helpers/helper'),options),
    layout: loadTemplateHelper(require('../template-helpers/layout'),options),
    objectify: require('../template-helpers/objectify'),
    // partial: loadTemplateHelper(require('../template-helpers/partial'),options),
    ref: require('../template-helpers/functions/ref'),
    requireAssets: loadTemplateHelper(require('../template-helpers/requireAssets'),options),
    scopeId: require('../template-helpers/scopeId'),
    set: loadTemplateHelper(require('../template-helpers/set'),options),
    stringify: require('../../handlebars-helpers/stringify'),
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

