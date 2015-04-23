var EventEmitter = require('events').EventEmitter,
_ = require('lodash'),
fs = require('fs'),
path = require('path'),
glob = require('glob'),
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

  particle.modulePath = opts.parentFile.path.slice(0,opts.parentFile.path.lastIndexOf(path.join(path.sep,'particles',path.sep)));
  if (module) {
    particle.modulePath = path.join(particle.modulePath,'node_modules',module);
  }

  // This is UGLY
  // Walks the tree to find particles in parent node_modules directories
  // TODO Got to be a better way to do this.
  var done = false;
  while (done === false) {
    particle.path = path.join(particle.modulePath,'particles',this.typeMap[type],particlePath);
    particle.relative = path.relative(path.resolve(process.cwd(),this.root),particle.path);

    // Match the exact path given to the loader or a path that is followed by one or more extensions
    // TODO more efficient discovery?
    var files = _.flatten([glob.sync(particle.path),glob.sync(particle.path+'.*')]);
    if (files[0]) {
      particle.fsPath = files[0];
      done = true;
    }
    else {
      var lastNodeModules = particle.modulePath.lastIndexOf(path.join(path.sep,'node_modules'));
      if (lastNodeModules < 0) {
        done = true;
      }
      else {
        particle.modulePath = particle.modulePath.slice(0,lastNodeModules)
        var newNodeModules = particle.modulePath.lastIndexOf(path.join(path.sep,'node_modules'));
        if (newNodeModules < 0) {
          done = true;
        }
        else {
          particle.modulePath = particle.modulePath.slice(0,newNodeModules+13)
          particle.modulePath = path.join(particle.modulePath,module);
        }
      }
    }
  }
  if (!particle.fsPath) {
    throw new Error("Particle "+particlePath+" refrenced in "+ opts.parentFile.path + " could not be found.")
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

