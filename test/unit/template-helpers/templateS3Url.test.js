var ParticleLoader = require('../../../lib/condensation/loaders/particle-loader'),
assert = require("assert"),
async = require('async'),
helper = require('../../../lib/condensation/template-helpers/templateS3Url'),
path = require('path');

describe('templateS3Url', function(){

  /*
   *  particlePath - As would be written in the template
   *  filePath - Relative filesystem path to the file
   *  protocol - https | s3
   */

  async.each([
    {
      description: 'should resolve http path',
      particlePath: 'instance.template.json',
      filePath: path.join('test','fixtures','projects','projectB','particles','cftemplates','fake.template'),
      expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/cftemplates/instance.template.json'
    }
  ], function(config){

    it(config.description, function(done){

      //Arrange
      var hOpts = {
        data: {
          _file: {
            path: config.filePath,
          },
          root: {
            s3: {
              condensationUrl: {
                protocol: 'https:',
                slashes: true,
                auth: null,
                host: 's3-eu-west-1.amazonaws.com',
                port: null,
                hostname: 's3-eu-west-1.amazonaws.com',
                hash: null,
                search: null,
                query: null,
                pathname: '/bucket',
                path: '/bucket/',
                href: 'https://s3-eu-west-1.amazonaws.com/bucket'
              }
            }
          }
        },
        hash: {protocol: config.protocol}
      };
      var cOpts = {
        particleLoader: new ParticleLoader({root:path.join('test','fixtures','projects','projectB')})
      };

      //Act
      var result = helper.helper.apply(root, [null, config.particlePath, null, hOpts, cOpts]);

      //Assert
      assert.equal(result, config.expected);
      done();
    });

  });




});
