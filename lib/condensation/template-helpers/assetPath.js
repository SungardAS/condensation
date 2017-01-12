/**
 * Build the S3 path to an asset particle within the project
 * @module assetPath
 * @memberof TemplateHelpers
 * @type {function}
 * @example
 * {{assetPath "myasset.zip"}}
 * @example
 * {{assetPath "path/to/myasset.sh"}}
 * @param {string} path - the path to the particle relative to the `assets` directory
 * @returns {String} - S3 path to the asset
 *
 */

var url = require('url');
var path = require('path');

var helper = function assetPath(cModule,pPath,hArgs,hOpts,cOpts) {

  var particle = cOpts.particleLoader.loadParticle('asset',cModule,pPath,{parentFile: hOpts.data._file});

  return path.posix.join(hOpts.data.root.s3.prefix,particle.urlPath);

};

module.exports.NAME = 'assetPath';
module.exports.helper = helper;
