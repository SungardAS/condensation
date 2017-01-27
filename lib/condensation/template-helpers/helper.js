/**
 * ```
 * - particles
 * |- helpers
 *  |- particle_name
 * ```
 *
 * @example
 * {{helper "particle_name"}}
 * @example
 * {{helper "particle_name" foo="bar"}}
 * @example
 * {{helper "module:<MODULE>" 'particle_name'}}
 * @example
 * {{!-- to load modules with format `particles-NAME` --}}
 * {{helper "m:<NAME>" "particle_name"}}
 * @function helper
 * @memberof ParticleHelpers
 * @param {string} [module] - module to load with either `module:<MODULE>` or `m:<M>`
 * @param {string} path - Path to the helper, excluding the `.js` extension
 * @param {...kv} [options] - Key/Value pairs to pass to the particle helper
 * @returns {*} - The output from the particle helper
 *
 */

var _ = require("lodash");

var helper = function helper(cModule,pPath,hArgs,hOpts,cOpts) {

    var particle = cOpts.particleLoader.loadParticle('helper',cModule,pPath,{parentFile: hOpts.data._file});
    var helperFunc = require(particle.path);

    return helperFunc.apply(
      this,
      _.flatten(
        [
          hArgs,
          _.merge(hOpts,{handlebars: cOpts.handlebars})
        ]
      )
    );
};

module.exports.NAME = 'helper';
module.exports.helper = helper;
