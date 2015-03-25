var EventEmitter = require('events').EventEmitter,
_ = require('lodash'),
path = require('path'),
util = require('util'),
fs = require('fs');

var ParticleFinder = function(options) {
  this.root = options.root || process.cwd();
  this.registry = {};
  this.typeMap = {
    'asset': 'assets',
    'helper': 'helpers',
    'partial': 'partials',
    'template': 'cftemplates'
  };
};
util.inherits(ParticleFinder,EventEmitter);

ParticleFinder.prototype.loadParticle = function(type,module,particlePath,options) {
  var opts = _.merge({
    currModulePath: this.root
  },options);

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
    particle.path = path.join('..','..',particle.modulePath,'particles','helpers',particlePath);
  }
  this.registry[type] = this.registry[type] || {};
  this.registry[type][particle.path] = particle;
  this.emit('particle',particle);
  return particle;
};

ParticleFinder.prototype.setProcessed = function(path) {
  if (this.registry.asset[path]) {
    this.registry.asset[path]._processed = true;
  }
  if (this.typeMap.template[path]) {
    this.typeMap.template[path]._processed = true;
  }

};

ParticleFinder.prototype.getUnprocessed = function() {
  var templatePaths = _.values(this.registry.template);
  var assetPaths = _.values(this.registry.asset);

  var unProcessed = _.filter(_.flatten([templatePaths,assetPaths]),function(particle) {
    return !particle._processed;
  });
  return _.pluck(unProcessed,'path');
}

module.exports = ParticleFinder;

module.exports.globalLoader = function(options) {
  return new ParticleFinder(options);
};
