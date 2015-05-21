var _ = require('lodash'),
url = require('url');

var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {
  //Assumption: The relative path returned never starts with a leading slash. This appears to be the behavior
  var particle = cOpts.particleLoader.loadParticle('asset',cModule,pPath,{parentFile: hOpts.data._file});

  var protocol = hOpts.hash.protocol;

  switch(protocol){
      case 's3':
          return url.resolve(
            ['s3:/',this.s3.condensationUrl.path].join(''),
            particle.relative
          );

      default:
          return url.resolve(url.format(this.s3.condensationUrl),particle.relative);
  }
};

module.exports.NAME = 'assetS3Url';
module.exports.helper = helper;
