var assert = require("assert");
var ParticleLoader = require('../../../lib/particle-loader');
var path = require('path');
var async = require('async');

describe('genAssetPaths', function(){

  var processCwd = process.cwd();

  async.each([
    {
      description: 'should generate paths',
      particle: {
        modulePath: path.join(processCwd,'/test/fixtures/projectC/node_modules/projectB/node_modules/projectA')
      },
      type: 'partial',
      particlePath: 'parameter-name-tag',
      expected:  {
        path: '/test/fixtures/projectC/node_modules/projectB/node_modules/projectA/particles/partials/parameter-name-tag',
        relativePath: 'node_modules/projectB/node_modules/projectA/particles/partials/parameter-name-tag',
        urlPath: 'node_modules/projectB/node_modules/projectA/particles/partials/parameter-name-tag'
      }
    }
  ], function(config){

    it(config.description, function(done){

      //Arrange
      var options = {
        //parentFile: {path: config.particlePath }
        parentFile: ""
      };
      var particleLoader = new ParticleLoader({root:"test/fixtures/projectC"});

      //Act
      var result = particleLoader.genParticlePaths(config.particle,config.type,config.particlePath);
      console.log(result);

      //Assert
      assert.equal(result, config.expected);
      done();
    });

  });




});
