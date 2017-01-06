/**
 * Start a layout
 * @example
 * ---
 * things:
 * -
 *   name: subnet1
 *   cidr: "10.0.0.0/24"
 * -
 *   name subnet2
 *   cidr: "10.0.1.0/24"
 * ---
 *
 * {{#layout templateDescription="condensation rocks!"}}
 *   {{parameter 'my_parameter' logicalId="MyParameter"}}
 *   {{condition 'my_condition' logicalId="MyCondition"}}
 *
 *   {{! helpers can occur in any order, allowing you to group related section parts together }}
 *
 *   {{#each things}}
 *     {{parameter 'repeate_me' logicalId="RepeateMe" logicalIdSuffix=@index}}
 *     {{condition 'repeate_me' logicalId="RepeateMeCond" logicalIdSuffix=@index}}
 *     {{resource 'repeate_me' logicalId="RepeateMeResource" logicalIdSuffix=@index}}
 *     {{output 'repeate_me' logicalId="RepeateMeOutput" logicalIdSuffix=@index}}
 *   {{/each}}
 * {{/layout}} 
 * @module layout
 * @type {function}
 * @param {Object} [options] - options object from Handlebars
 * @param {string} [options.AWSTemplateFormatVersion=2010-09-09] - AWS Format Version
 * @param {string} [options.TemplateDescription] - Description for the template
 * @param {string} [options.Transform] - AWS Transform type for the template
 * @returns {string} - CloudFormation Template
 *
 */

var _ = require('lodash');
var sections = require('./sections');
var VError = require('verror');

var helper = function layout(cModule,pPath,hArgs,hOpts,cOpts) {

  var engine = cOpts.handlebars;
  var data = engine.createFrame(hOpts.data || {});
  data._layoutContentPusher = {};

  var sectionMap = {};
  _.each(_.values(sections), function(v) {
    if (v.SECTION_NAME) {
      var s = sectionMap[v.SECTION_NAME] = {};
      s.items = [];
      data._layoutContentPusher[v.PARTICLE_NAME] = s.items.push.bind(s.items);
    }
  });

  var compileOpts = _.merge(hOpts.data.root,this,hOpts.hash);
  hOpts.fn(compileOpts,{data:data});

  var template = {};
  template.AWSTemplateFormatVersion = hOpts.hash.AWSTemplateFormatVersion || "2010-09-09";

  if (compileOpts.TemplateDescription) {
    template.Description = compileOpts.TemplateDescription + "";
  }

  if (compileOpts.Transform) {
    template.Transform = compileOpts.Transform + "";
  }

  _.each(_.toPairs(sectionMap), function(kv) {
    if (kv[1].items.length) {
      try {
        template[kv[0]] = JSON.parse('{'+kv[1].items.join(',')+'}');
      }
      catch(e) {
        var ve = new VError(e,"Section Parse Error: %s in file %s\n%s",kv[0],hOpts.data._file.path,kv[1].items.join(','));
        throw(ve.message);
      }
    }
  });

  return JSON.stringify(template);
};

module.exports.NAME = 'layout';
module.exports.helper = helper;
