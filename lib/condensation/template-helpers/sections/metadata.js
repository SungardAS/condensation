var buildHelper = require('./_buildHelper');

module.exports.NAME = 'metadata';
module.exports.PARTICLE_NAME = 'metadata';
module.exports.PARTICLE_DIR = 'metadata';
module.exports.SECTION_NAME = 'Metadata';

/**
 * ```
 * - particles
 * |- metadata
 *  |- particle_name
 * ```
 *
 * @example
 * {{metadata "particle_name"}}
 * @example
 * {{metadata "particle_name" foo="bar"}}
 * @example
 * {{metadata "module:<MODULE>" 'particle_name'}}
 * @example
 * {{!-- to load modules with format `particles-NAME` --}}
 * {{metadata "m:<NAME>" "particle_name"}}
 * @memberof ParticleHelpers
 * @function metadata
 * @param {string} path - Path to the particle (file extensions optional)
 * @param {...kv} [options] - Key/Value pairs to pass to the particle
 * @returns {string}
 */
module.exports.helper = buildHelper('metadata');

