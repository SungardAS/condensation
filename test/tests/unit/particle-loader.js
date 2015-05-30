var assert = require("assert");
var ParticleLoader = require('../../../lib/particle-loader');
var async = require('async');

describe('genAssetPaths', function(){

    async.each([
        {
            description: 'should generate urlPath on windows',
            particlePath: 'particles\\cftemplates\\example.template',
            particle: {
              modulePath: '',
            },
            type: 'asset',
            expected:  {
              urlPath: '/particles/cftemplates/example.template'
            }
        },
        {
            description: 'should resolve http path on linux',
            particlePath: 'particles/cftemplates/example.template',
            expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/cftemplates/example.template'
        },
        {
            description: 'should resolve http path on windows with a leading slash',
            particlePath: '\\particles\\cftemplates\\example.template',
            expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/cftemplates/example.template'
        },
        {
            description: 'should resolve http path on linux with a leading slash',
            particlePath: '/particles/cftemplates/example.template',
            expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/cftemplates/example.template'
        }
    ], function(config){

        it(config.description, function(done){

            //Arrange
            var options = {
                //parentFile: {path: config.particlePath }
              parentFile: ""
            };
            var particleLoader = new ParticleLoader({root:"test/fixtures/projectB"});

            //Act
            var result = particleLoader.genParticlePaths(config.particle,config.type,config.particlePath);
            console.log(result);

            //Assert
            assert.equal(result, config.expected);
            done();
        });

    });




});
