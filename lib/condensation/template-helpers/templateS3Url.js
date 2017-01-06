/**
 * Generate an S3 URL for another template in the project
 * @example
 * {{templateUrl "another.template.json"}}
 * @example
 * {{templateUrl "module:<MODULE>" 'another.template.json'}}
 * @example
 * {{!-- to load modules with format `particles-NAME` --}}
 * {{set "m:<NAME>" "another.template.json"}}
 * @module templateUrl
 * @type {function}
 * @param {string} path - Path to the template (file extensions optional)
 * @returns {string}
 *
 */

var url = require('url');

var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {

  var particle = cOpts.particleLoader.loadParticle('template',cModule,pPath,{parentFile: hOpts.data._file});

  return [url.format(hOpts.data.root.s3.condensationUrl),particle.urlPath].join('/');
};

module.exports.NAME = 'templateS3Url';
module.exports.helper = helper;
