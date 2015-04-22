var Handlebars = require('handlebars'),
_ = require('lodash'),
fs = require('fs'),
File = require('vinyl'),
matter = require('gray-matter');

var createPartialHelper = function(options) {
  var opts = _.merge({
    handlebars: Handlebars,
    projectDir: process.cwd(),
    particleLoader: null
  },_.omit(options,_.isUndefined));
  var engine = opts.handlebars;

  var helper = function () {
    var module, pPath, context;

    var moduleCheck = arguments[0].split(':');
    if (moduleCheck[0] === 'module') {
      module = moduleCheck[1];
      pPath = arguments[1];
      context = arguments[2];
    }
    else {
      module = '';
      pPath = arguments[0];
      context = arguments[1];
    }

    var data = Handlebars.createFrame(context.data.root);
    var particle = opts.particleLoader.loadParticle('partial',module,pPath,{parentFile: data._file});
    var file = new File({path: particle.path});
    var m = matter(fs.readFileSync(particle.path,{encoding:'utf8'}));
    var partialContents = m.content;

    if (!engine.partials[particle.path]) {
      engine.registerPartial(particle.path,fs.readFileSync(particle.path,{encoding:'utf8'}));
    }

    var fn = engine.compile(partialContents);
    return new engine.SafeString(fn(_.merge(_.merge(m.data,data),{_file: file},context.hash)));
  };

  if (!engine.helpers.partial) {
    engine.registerHelper('partial',helper);
  }
  return helper;
};

module.exports = createPartialHelper;
