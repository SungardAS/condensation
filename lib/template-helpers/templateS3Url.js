var url = require('url'),
path = require('path');

var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {

    var particle = cOpts.particleLoader.loadParticle('template',cModule,pPath,{parentFile: hOpts.data._file});

    return url.resolve(url.format(this.s3.condensationUrl),particle.urlPath);
};

module.exports.NAME = 'templateS3Url';
module.exports.helper = helper;
