var _ = require('lodash'),
fs = require('fs'),
File = require('vinyl'),
matter = require('gray-matter');

// A set and a partial are nearly the same and should be looked at
// to shsre more code.  At this time the following is almost an exact copy of partial
var helper = function(cModule,pPath,hArgs,hOpts,cOpts) {

    var engine = cOpts.handlebars;
    var particle = cOpts.particleLoader.loadParticle('set',cModule,pPath,{parentFile: hOpts.data._file});
    var file = new File({path: particle.path});
    var m = matter(fs.readFileSync(particle.fsPath,{encoding:'utf8'}));

    var fn = engine.compile(m.content,{noEscape:true});
    var data = cOpts.handlebars.createFrame(hOpts.data || {});
    var extended = data._setExtended || false;
    data._file = file;
    data._setExtended = true;

    var templateContent = '';
    if (extended === true) {
      // If extending another set merge options in reverse
      templateContent = new engine.SafeString(fn(_.merge(hOpts.hash,_.merge(_.merge(m.data,hOpts.data.root),this)),{data:data}));
    }
    else {
      templateContent = new engine.SafeString(fn(_.merge(_.merge(_.merge(m.data,hOpts.data.root),this),hOpts.hash),{data:data}));
    }
    return templateContent;
};

module.exports.name = 'set';
module.exports.helper = helper;
