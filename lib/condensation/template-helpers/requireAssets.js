/**
 * Include a glob of assets
 *
 * Only needed for assets that are not directly referenced by another particle
 * @example
 * {{requireAssets "all_of_these/**"}}
 * @example
 * {{requireAssets "module:<MODULE>" 'all_from_module/**'}}
 * @example
 * {{!-- to load modules with format `particles-NAME` --}}
 * {{requireAssets "m:<NAME>" "all_from_module/**"}}
 * @function requireAssets
 * @memberof TemplateHelpers
 * @param {string} globPath - Glob patter of assets to package with the project
 * @returns {string}
 *
 */
var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {

  cOpts.particleLoader.loadParticle('asset',cModule,pPath,{parentFile: hOpts.data._file});

  return '';
};

module.exports.NAME = 'requireAssets';
module.exports.helper = helper;
