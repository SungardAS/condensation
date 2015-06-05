var url = require('url'),
path = require('path');

var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {
  //Assumption: The relative path returned never starts with a leading slash. This appears to be the behavior
  var particle = cOpts.particleLoader.loadParticle('asset',cModule,pPath,{parentFile: hOpts.data._file});

  var protocol = hOpts.hash.protocol;

  switch(protocol){
    case 's3':
      return ['s3:/',path.posix.join(this.s3.condensationUrl.path,particle.urlPath)].join('');

    default:
      return [url.format(this.s3.condensationUrl),particle.urlPath].join('');
  }
};

module.exports.NAME = 'assetS3Url';
module.exports.helper = helper;
