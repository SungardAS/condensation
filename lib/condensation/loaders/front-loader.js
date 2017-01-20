/**
 * ```
 * - particles
 * |- front_loaders
 *  |- particle_name
 * ```
 *
 * @example
 * ---
 * front_loaders:
 *   availability_zones: particles-vpc availabilityZones
 * ---
 * @function front_loader
 * @memberof SpecialParticles
 * @param {string} [module] - module to load with either `module:<MODULE>` or `m:<M>`
 * @param {string} path - Path to the helper, excluding the `.js` extension
 * @param {...kv} [options] - Key/Value pairs to pass to the particle helper
 * @returns {*} - The output from the front loader
 *
 */

var _ = require("lodash");

module.exports = function frontLoader(loaderConfig,templateData,cb) {

  var config = _.merge({},loaderConfig);

  var particle = this.particleLoader.loadParticle('frontLoader',config.module,config.loader,{parentFile: config._file});
  var loaderFunc = require(particle.path);

  return loaderFunc.apply(
    this,
    _.flatten(
      [
        config.args,
        config.opts,
        cb
      ]
    )
  );
};
