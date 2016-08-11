var url = require('url'),
path = require('path');

var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {

  var particle = cOpts.particleLoader.loadParticle('asset',cModule,pPath,{parentFile: hOpts.data._file});

  return path.posix.join(hOpts.data.root.s3.prefix,particle.urlPath);

};

module.exports.NAME = 'assetPath';
module.exports.helper = helper;
