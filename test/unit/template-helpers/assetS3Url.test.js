var ParticleLoader = require('../../../lib/condensation/loaders/particle-loader'),
assert = require("assert"),
async = require('async'),
helper = require('../../../lib/condensation/template-helpers/assetS3Url'),
path = require('path');



describe('assetS3Url', function(){

  /*
   *  particlePath - As would be written in the template
   *  filePath - Relative filesystem path to the file
   *  protocol - https | s3
   */

  async.each([
    {
      description: 'should resolve https path',
      particlePath: 'bootstrap.sh',
      filePath: path.join('test','fixtures','projects','projectB','particles','cftemplates','fake.template'),
      protocol: 'https',
      expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/assets/bootstrap.sh'
    },
    {
      description: 'should resolve s3 path',
      particlePath: 'bootstrap.sh',
      filePath: path.join('test','fixtures','projects','projectB','particles','cftemplates','fake.template'),
      protocol: 's3',
      expected:  's3://bucket/particles/assets/bootstrap.sh'
    },
    {
      description: 'should default to https if no protocol specified',
      particlePath: 'bootstrap.sh',
      filePath: path.join('test','fixtures','projects','projectB','particles','cftemplate','fake.template'),
      protocol: null,
      expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/assets/bootstrap.sh'
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
