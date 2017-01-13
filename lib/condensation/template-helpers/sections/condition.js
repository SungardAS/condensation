var buildHelper = require('./_buildHelper');

module.exports.NAME = 'condition';
module.exports.PARTICLE_NAME = 'condition';
module.exports.PARTICLE_DIR = 'conditions';
module.exports.SECTION_NAME = 'Conditions';

/**
 * ```
 * - particles
 * |- conditions
 *  |- particle_name
 * ```
 *
 * @example
 * {{condition "particle_name"}}
 * @example
 * {{condition "particle_name" foo="bar"}}
 * @example
 * {{condition "module:<MODULE>" 'particle_name'}}
 * @example
 * {{!-- to load modules with format `particles-NAME` --}}
 * {{condition "m:<NAME>" "particle_name"}}
 * @function condition
 * @memberof ParticleHelpers
 * @param {string} path - Path to the particle (file extensions optional)
 * @param {...kv} [options] - Key/Value pairs to pass to the particle
 * @returns {string}
 */
module.exports.helper = buildHelper('condition');
