var url = require('url'),
path = require('path');

var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {

  //Assumption: The relative path returned never starts with a leading slash. This appears to be the behavior
  var particle = cOpts.particleLoader.loadParticle('asset',cModule,pPath,{parentFile: hOpts.data._file});

  return path.posix.join(hOpts.data.root.s3.prefix,particle.urlPath);

};

module.exports.NAME = 'assetPath';
module.exports.helper = helper;
