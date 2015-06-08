var _ = require('lodash'),
fs = require('fs'),
File = require('vinyl'),
matter = require('gray-matter');

var helper = function(cModule,pPath,hArgs,hOpts,cOpts) {

    var engine = cOpts.handlebars;
    var particle = cOpts.particleLoader.loadParticle('partial',cModule,pPath,{parentFile: hOpts.data._file});
    var file = new File({path: particle.path});
    var m = matter(fs.readFileSync(particle.fsPath,{encoding:'utf8'}));

    if (!engine.partials[particle.path]) {
      engine.registerPartial(particle.path,m.content);
    }

    var fn = engine.compile(m.content,{noEscape:true});
    var data = cOpts.handlebars.createFrame(hOpts.data || {});
    var extended = data._partialExtended || false;
    data._file = file;
    data._partialExtended = true;

    var templateContent = '';
    if (extended === true) {
      // If extending another partial merge options in reverse
      templateContent = new engine.SafeString(fn(_.merge(hOpts.hash,_.merge(_.merge(m.data,hOpts.data.root),this)),{data:data}));
    }
    else {
      templateContent = new engine.SafeString(fn(_.merge(_.merge(_.merge(m.data,hOpts.data.root),this),hOpts.hash),{data:data}));
    }
    return templateContent;
};

module.exports.name = 'partial';
module.exports.helper = helper;
