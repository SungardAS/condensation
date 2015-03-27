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
    parentFile: null,
    module: ''
  },_.omit(options,_.isUndefined));

  var particle = {};
  if (module) {
    var nodeModulesIndex = opts.parentFile.path.lastIndexOf('node_modules');
    var modulePath = nodeModulesIndex >=0 ? opts.parentFile.path.slice(0,nodeModulesIndex) : path.resolve(process.cwd(),this.root);
    particle.modulePath = path.join(modulePath,'node_modules',module);
  }
  else {
    particle.modulePath = opts.parentFile.path.slice(0,opts.parentFile.path.lastIndexOf('particles'));
  }
  particle.path = path.join(particle.modulePath,'particles',this.typeMap[type],particlePath);
  particle.relative = path.relative(path.resolve(process.cwd(),this.root),particle.path);

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

