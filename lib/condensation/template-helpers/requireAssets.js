
var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {

    cOpts.particleLoader.loadParticle('asset',cModule,pPath,{parentFile: hOpts.data._file});

    return '';
};

module.exports.NAME = 'requireAssets';
module.exports.helper = helper;
