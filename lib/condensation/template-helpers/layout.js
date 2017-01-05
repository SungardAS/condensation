var _ = require('lodash');
var sections = require('./sections');
var VError = require('verror');

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
