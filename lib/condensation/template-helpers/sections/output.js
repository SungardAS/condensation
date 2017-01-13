var buildHelper = require('./_buildHelper');

module.exports.NAME = 'output';
module.exports.PARTICLE_NAME = 'output';
module.exports.PARTICLE_DIR = 'outputs';
module.exports.SECTION_NAME = 'Outputs';

/**
 * ```
 * - particles
 * |- outputs
 *  |- particle_name
 * ```
 *
 * @example
 * {{output "particle_name"}}
 * @example
 * {{output "particle_name" foo="bar"}}
 * @example
 * {{output "module:<MODULE>" 'particle_name'}}
 * @example
 * {{!-- to load modules with format `particles-NAME` --}}
 * {{output "m:<NAME>" "particle_name"}}
 * @memberof ParticleHelpers
 * @function output
 * @param {string} path - Path to the particle (file extensions optional)
 * @param {...kv} [options] - Key/Value pairs to pass to the particle
 * @returns {string}
 */
module.exports.helper = buildHelper('output');

