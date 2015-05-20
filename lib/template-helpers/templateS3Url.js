var url = require('url');

var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {

    var particle = cOpts.particleLoader.loadParticle('template',cModule,pPath,{parentFile: hOpts.data._file});

    return url.resolve(hOpts.data.root.s3.awsPath,particle.relative);
};

module.exports.NAME = 'templateS3Url';
module.exports.helper = helper;
