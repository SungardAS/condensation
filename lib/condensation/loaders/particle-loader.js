var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var glob = require('glob');
var path = require('path');
var slash = require('slash');
var util = require('util');

var ParticleLoader = function(options) {
  this.root = options.root;
  this.registry = {};
  this.typeMap = {
    'asset': 'assets',
    'condition': 'conditions',
    'helper': 'helpers',
    'mapping': 'mappings',
    'metadata': 'metadata',
    'output': 'outputs',
    'parameter': 'parameters',
    'partial': 'partials',
    'resource': 'resources',
    'set': 'sets',
    'template': 'cftemplates'
  };

  this.typeGlobs = {
    'asset': ['','?(.hbs)]'],
    'condition': ['','.*'],
    'helper': ['.js'],
    'mapping': ['','.*'],
    'metadata': ['','.*'],
    'output': ['','.*'],
    'parameter': ['','.*'],
    'partial': ['','.*'],
    'resource': ['','.*'],
    'set': ['','.*'],
    'template': ['?(.hbs)']
  };
};
util.inherits(ParticleLoader,EventEmitter);

ParticleLoader.prototype.loadParticle = function(type,cModule,pPath,options) {

  var opts = _.merge({
    parentFile: null,
    cModule: ''
  },_.omit(options,_.isUndefined));

  if (!_.isString(pPath)) {
    throw new Error("particle load error: particlePath must be a string ("+opts.parentFile.path+")");
  }

  // Make Windows Happy
  var particlePath = pPath.replace(/\//g,path.sep);

  // Used to reduce the number of times this particle is searched for.
  // TODO Possible to group by package instead of file?
  var particleId = [opts.parentFile.path,cModule,particlePath].join(':');

  this.registry[type] = this.registry[type] || {};

  if (this.registry[type][particleId]) {
    return this.registry[type][particleId];
  }

  // Start building the particle object
  var particle = { modulePath: '' };

  // Look for the closest particles directory in relation to the parent file making the request
  var particlesIndex = opts.parentFile.path.lastIndexOf(path.join(path.sep,'particles',path.sep));
  if (particlesIndex > 0) {
    particle.modulePath = opts.parentFile.path.slice(0,particlesIndex);
  }

  // Look in node_modules is a condensation module is defined
  if (cModule) {
    particle.modulePath = path.join(particle.modulePath,'node_modules',cModule);
  }

  // This feels UGLY
  // Walks the tree to find particles in parent node_modules directories
  // TODO Got to be a better way to do this.
  var done = false;
  while (done === false) {
    particle = _.merge(particle,this.genParticlePaths(particle,type,particlePath));

    // TODO more efficient discovery?
    var globFiles = _.map(this.typeGlobs[type], function(pattern) {
      return glob.sync(particle.path+pattern,{nodir: true});
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
        particle.modulePath = particle.modulePath.slice(0,lastNodeModules);
        var newNodeModules = particle.modulePath.lastIndexOf(path.join(path.sep,'node_modules'));
        if (newNodeModules < 0) {
          done = true;
        }
        else {
          particle.modulePath = particle.modulePath.slice(0,newNodeModules+13);
          particle.modulePath = path.join(particle.modulePath,cModule);
        }
      }
    }
  }
  if (!particle.fsPath) {
    throw new Error("particle load error: "+type+" "+particlePath+" refrenced in "+ opts.parentFile.path + " could not be found.");
  }

  this.registry[type][particleId] = particle;
  this.emit('particle',particle);
  return particle;
};

ParticleLoader.prototype.genParticlePaths = function(particle,type,particlePath) {

    var pathObj = path.parse(path.join(particle.modulePath,'particles',this.typeMap[type],particlePath));
    var realPath = path.format(pathObj);

    var relativePathObj = path.parse(path.relative(path.resolve(process.cwd(),this.root),realPath));
    var relativePath = path.format(relativePathObj);

    var urlPath = slash(relativePath);

    return {
      pathObj: pathObj,
      path: realPath,
      relativePathObj: relativePathObj,
      relativePath: relativePath,
      urlPath: urlPath
    };
};

ParticleLoader.prototype.processablePaths = function() {
  var templatePaths = _.values(this.registry.template);
  var assetPaths = _.values(this.registry.asset);

  return _.map(_.flatten([templatePaths,assetPaths]),'path');
};

module.exports = ParticleLoader;

