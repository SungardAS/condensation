var url = require('url');

var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {
  //Assumption: The relative path returned never starts with a leading slash. This appears to be the behavior
  var particle = cOpts.particleLoader.loadParticle('asset',cModule,pPath,{parentFile: hOpts.data._file});

  var relative = particle.relative;
  if(relative.indexOf('/') == 0 || relative.indexOf('\\') == 0){
      relative = relative.substr(1);
  }

  var protocol = hOpts.hash.protocol;
  switch(protocol){
      case 's3':
          return url.resolve(this.s3.awsPathInS3Format, relative);

      default:
          return url.resolve(this.s3.awsPath, relative);
  }
};

module.exports.NAME = 'assetS3Url';
module.exports.helper = helper;
