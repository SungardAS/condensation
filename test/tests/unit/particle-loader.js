var ParticleLoader = require('../../../lib/condensation/loaders/particle-loader'),
assert = require("assert"),
async = require('async'),
path = require('path');

describe('genParticlePaths', function(){

  var processCwd = process.cwd();

  async.each([
    {
      description: 'should generate paths for an asset',
      particle: {
        modulePath: path.join(processCwd,'test','fixtures','projectC')
      },
      type: 'asset',
      particlePath: 'my_asset.thing',
      expected:  {
        path: path.join(processCwd,'test','fixtures','projectC','particles','assets','my_asset.thing'),
        urlPath: 'particles/assets/my_asset.thing'
      }
    },
    {
      description: 'should generate paths for a template',
      particle: {
        modulePath: path.join(processCwd,'test','fixtures','projectC')
      },
      type: 'template',
      particlePath: 'my.template.json',
      expected:  {
        path: path.join(processCwd,'test','fixtures','projectC','particles','cftemplates','my.template.json'),
        urlPath: 'particles/cftemplates/my.template.json'
      }
    }
  ], function(config){

    it(config.description, function(done){

      //Arrange
      var options = {
        parentFile: ""
      };
      var particleLoader = new ParticleLoader({root:path.join('test','fixtures','projectC')});

      //Act
      var result = particleLoader.genParticlePaths(config.particle,config.type,config.particlePath);

      //Assert
      assert.equal(result.path, config.expected.path);
      assert.equal(result.urlPath, config.expected.urlPath);
      done();
    });

  });




});
