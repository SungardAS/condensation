var buildHelper = require('./_buildHelper');

module.exports.NAME = 'partial';
module.exports.PARTICLE_NAME = 'partial';
module.exports.PARTICLE_DIR = 'partials';
module.exports.SECTION_NAME = undefined;
module.exports.ALLOW_STRING = true;

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
 * @memberof ParticleHelpers
 * @function partial
 * @param {string} [module] - module to load with either `module:<MODULE>` or `m:<M>`
 * @param {string} path - Path to the particle (file extensions optional)
 * @param {...kv} [options] - Key/Value pairs to pass to the particle
 * @returns {string}
 */
module.exports.helper = buildHelper('partial',{
  allowString: module.exports.ALLOW_STRING,
  sectionName: module.exports.SECTION_NAME
});

