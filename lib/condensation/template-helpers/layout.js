var _ = require('lodash'),
sections = require('./sections');

var helper = function(cModule,pPath,hArgs,hOpts,cOpts) {

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

  _.each(_.toPairs(sectionMap), function(kv) {
    if (kv[1].items.length) {
      try {
        template[kv[0]] = JSON.parse('{'+kv[1].items.join(',')+'}');
      }
      catch(e) {
        throw new Error(e+"\nSection parse error: " + kv[0] + " in file " + hOpts.data._file.path + "\n" + kv[1].items.join(','));
      }
    }
  });

  return JSON.stringify(template);
};

module.exports.NAME = 'layout';
module.exports.helper = helper;
