var EventEmitter = require('events').EventEmitter,
_ = require('lodash'),
path = require('path'),
util = require('util');

var ParticleLoader = function(options) {
  this.root = options.root,
  this.registry = {};
  this.typeMap = {
    'asset': 'assets',
    'helper': 'helpers',
    'partial': 'partials',
    'template': 'cftemplates'
  };
};
util.inherits(ParticleLoader,EventEmitter);

ParticleLoader.prototype.loadParticle = function(type,module,particlePath,options) {
  var opts = _.merge({
    currModulePath: this.root,
    module: ''
  },_.omit(options,_.isUndefined));

  var particle = {};
  if (module) {
    particle.modulePath = path.join(opts.currModulePath,'node_modules',module);
  }
  else {
    particle.modulePath = opts.currModulePath;
  }
  if (type === 'asset' || type === 'assetGlob' || type === 'partial' || type === 'template' ) {
    particle.path = path.join(particle.modulePath,'particles',this.typeMap[type],particlePath);
  }
  else if (type === 'helper') {
    particle.path = path.join(process.cwd(),particle.modulePath,'particles','helpers',particlePath);
  }
  this.registry[type] = this.registry[type] || {};
  this.registry[type][particle.path] = particle;
  this.emit('particle',particle);
  return particle;
};

ParticleLoader.prototype.processablePaths = function() {
  var templatePaths = _.values(this.registry.template);
  var assetPaths = _.values(this.registry.asset);

  return _.pluck(_.flatten([templatePaths,assetPaths]),'path');
};

module.exports = ParticleLoader;

