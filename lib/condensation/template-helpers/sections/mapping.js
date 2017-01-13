var buildHelper = require('./_buildHelper');

module.exports.NAME = 'mapping';
module.exports.PARTICLE_NAME = 'mapping';
module.exports.PARTICLE_DIR = 'mappings';
module.exports.SECTION_NAME = 'Mappings';

/**
 * ```
 * - particles
 * |- mappings
 *  |- particle_name
 * ```
 *
 * @example
 * {{mapping "particle_name"}}
 * @example
 * {{mapping "particle_name" foo="bar"}}
 * @example
 * {{mapping "module:<MODULE>" 'particle_name'}}
 * @example
 * {{!-- to load modules with format `particles-NAME` --}}
 * {{mapping "m:<NAME>" "particle_name"}}
 * @memberof ParticleHelpers
 * @function mapping
 * @param {string} [module] - module to load with either `module:<MODULE>` or `m:<M>`
 * @param {string} path - Path to the particle (file extensions optional)
 * @param {...kv} [options] - Key/Value pairs to pass to the particle
 * @returns {string}
 */
module.exports.helper = buildHelper('mapping');

