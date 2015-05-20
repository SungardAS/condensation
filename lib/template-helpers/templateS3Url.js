var url = require('url');

var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {

    var particle = cOpts.particleLoader.loadParticle('template',cModule,pPath,{parentFile: hOpts.data._file});
    var relative = particle.relative;
    if(relative.indexOf('/') == 0 || relative.indexOf('\\') == 0){
        relative = relative.substr(1);
    }

    return url.resolve(hOpts.data.root.s3.awsPath,relative);
};

module.exports.NAME = 'templateS3Url';
module.exports.helper = helper;
