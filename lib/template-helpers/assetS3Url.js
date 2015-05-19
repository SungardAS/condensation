var url = require('url');


var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {
  var particle = cOpts.particleLoader.loadParticle('asset',cModule,pPath,{parentFile: hOpts.data._file});

  return url.resolve(this.s3.awsPath,particle.relative);
};

module.exports.NAME = 'assetS3Url';
module.exports.helper = helper;
