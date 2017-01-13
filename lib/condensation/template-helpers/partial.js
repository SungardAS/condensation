/**
 * ```
 * - particles
 * |- partials
 *  |- particle_name
 * ```
 *
 * @example
 * {{partial "particle_name"}}
 * @example
 * {{partial "particle_name" foo="bar"}}
 * @example
 * {{partial "module:<MODULE>" 'particle_name'}}
 * @example
 * {{!-- to load modules with format `particles-NAME` --}}
 * {{partial "m:<NAME>" "particle_name"}}
 * @function partial
 * @memberof ParticleHelpers
 * @param {string} [module] - module to load with either `module:<MODULE>` or `m:<M>`
 * @param {string} path - Path to the partial (file extensions optional)
 * @param {...kv} [options] - Key/Value pairs to pass to the particle partial
 * @returns {string}
 *
 */

var File = require('vinyl');
var _ = require('lodash');
var fs = require('fs');
var matter = require('gray-matter');

var helper = function partial(cModule,pPath,hArgs,hOpts,cOpts) {

  var engine = cOpts.handlebars;
  var particle = cOpts.particleLoader.loadParticle('partial',cModule,pPath,{parentFile: hOpts.data._file});
  var file = new File({path: particle.path});
  var m = matter(fs.readFileSync(particle.fsPath,{encoding:'utf8'}));
  m.content = m.content.replace(/\n$/,'');

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
    templateContent = new engine.SafeString(fn(_.merge(m.data,hOpts.hash,this),{data:data}));
  }
  else {
    templateContent = new engine.SafeString(fn(_.merge(m.data,this,hOpts.hash),{data:data}));
  }
  return templateContent;
};

module.exports.name = 'partial';
module.exports.helper = helper;
