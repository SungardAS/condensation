var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {

    var particle = cOpts.particleLoader.loadParticle('template',cModule,pPath,{parentFile: hOpts.data._file});

    return [hOpts.data.root.s3.awsPath,particle.relative].join('/');
};

module.exports.NAME = 'templateS3Url';
module.exports.helper = helper;
