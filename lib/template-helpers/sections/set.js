var buildHelper = require('./_buildHelper');

module.exports.NAME = 'set';
module.exports.PARTICLE_NAME = 'set';
module.exports.PARTICLE_DIR = 'sets';
module.exports.SECTION_NAME = undefined;

module.exports.helper = buildHelper('set',{wrapLogicalId:false});

