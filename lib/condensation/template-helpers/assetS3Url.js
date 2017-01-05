var url = require('url');
var path = require('path');

/**
 * Build full S3 URL an asset particle within the project
 * @module assetS3Url
 * @type {function}
 * @example
 * {{assetS3Url "myasset.zip"}}
 * @example
 * {{assetS3Url "myasset.zip" protocol="s3"}}
 * @example
 * {{assetS3Url "path/to/myasset.sh"}}
 * @param {string} path - the path to the particle relative to the `assets` directory
 * @param {Object} options - options used to generate the URL
 * @param {Object} options.protocol - [s3|https] s3:// or https://
 * @returns {String} - Full S3 URL to the asset
 *
 */
var helper = function assetS3Url(cModule,pPath,hArgs,hOpts,cOpts) {
  //Assumption: The relative path returned never starts with a leading slash. This appears to be the behavior
  var particle = cOpts.particleLoader.loadParticle('asset',cModule,pPath,{parentFile: hOpts.data._file});

  var protocol = hOpts.hash.protocol;

  switch(protocol){
    case 's3':
      return ['s3:/',path.posix.join(hOpts.data.root.s3.condensationUrl.path,particle.urlPath)].join('');

    default:
      return [url.format(hOpts.data.root.s3.condensationUrl),particle.urlPath].join('/');
  }
};

module.exports.NAME = 'assetS3Url';
module.exports.helper = helper;
