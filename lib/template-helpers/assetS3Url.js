var path = require('path');

var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {

  var particle = cOpts.particleLoader.loadParticle('asset',cModule,pPath,{parentFile: hOpts.data._file});

  return path.join(this.s3.awsPath,particle.relative);

};

module.exports.NAME = 'assetS3Url';
module.exports.helper = helper;
