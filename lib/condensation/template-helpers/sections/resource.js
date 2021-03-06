var buildHelper = require('./_buildHelper');

module.exports.NAME = 'resource';
module.exports.PARTICLE_NAME = 'resource';
module.exports.PARTICLE_DIR = 'resources';
module.exports.SECTION_NAME = 'Resources';

/**
 * ```
 * - particles
 * |- resources
 *  |- particle_name
 * ```
 *
 * @example
 * {{resource "particle_name"}}
 * @example
 * {{resource "particle_name" foo="bar"}}
 * @example
 * {{resource "module:<MODULE>" 'particle_name'}}
 * @example
 * {{!-- to load modules with format `particles-NAME` --}}
 * {{resource "m:<NAME>" "particle_name"}}
 * @memberof ParticleHelpers
 * @function resource
 * @param {string} [module] - module to load with either `module:<MODULE>` or `m:<M>`
 * @param {string} path - Path to the particle (file extensions optional)
 * @param {...kv} [options] - Key/Value pairs to pass to the particle
 * @returns {string}
 */
module.exports.helper = buildHelper('resource');

