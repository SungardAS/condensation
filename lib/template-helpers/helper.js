
var helper = function (cModule,pPath,hArgs,hOpts,cOpts) {

    var particle = cOpts.particleLoader.loadParticle('helper',cModule,pPath,{parentFile: hOpts.data._file});
    var helperFunc = require(particle.path);

    return helperFunc.apply(this,hArgs);
};

module.exports.NAME = 'helper';
module.exports.helper = helper;
