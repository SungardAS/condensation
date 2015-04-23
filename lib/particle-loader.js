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

  this.typeGlobs = {
    'asset': ['','?(.hbs)]'],
    'helper': ['.js'],
    'partial': ['','.*'],
    'template': ['?(.hbs)']
  };
};
util.inherits(ParticleLoader,EventEmitter);

ParticleLoader.prototype.loadParticle = function(type,module,particlePath,options) {
  var opts = _.merge({
    parentFile: null,
    module: ''
  },_.omit(options,_.isUndefined));

  // Used to reduce the number of times this particle is searched for.
  // TODO Possible to group by package instead of file?
  var particleId = [opts.parentFile.path,module,particlePath].join(':');

  this.registry[type] = this.registry[type] || {};

  if (this.registry[type][particleId]) {
    return this.registry[type][particleId];
  }

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

    // TODO more efficient discovery?
    var globFiles = _.map(this.typeGlobs[type], function(pattern) {
      return glob.sync(particle.path+pattern)
    });
    var files = _.flatten(globFiles);
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
    throw new Error("particle load error: "+type+" "+particlePath+" refrenced in "+ opts.parentFile.path + " could not be found.")
  }

  this.registry[type][particleId] = particle;
  this.emit('particle',particle);
  return particle;
};

ParticleLoader.prototype.processablePaths = function() {
  var templatePaths = _.values(this.registry.template);
  var assetPaths = _.values(this.registry.asset);

  return _.pluck(_.flatten([templatePaths,assetPaths]),'path');
};

module.exports = ParticleLoader;

