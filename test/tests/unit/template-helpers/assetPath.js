var ParticleLoader = require('../../../../lib/condensation/loaders/particle-loader'),
assert = require("assert"),
async = require('async'),
helper = require('../../../../lib/condensation/template-helpers/assetPath'),
path = require('path');



describe('assetPath', function(){

  /*
   *  particlePath - As would be written in the template
   *  filePath - Relative filesystem path to the file
   *  prefix - prefix for the key path as given in condensation config
   */

  async.each([
    {
      description: 'should resolve path with no prefix',
      particlePath: 'bootstrap.sh',
      filePath: path.join('test','fixtures','projects','projectB','particles','cftemplates','fake.template'),
      prefix: '',
      expected:  'particles/assets/bootstrap.sh'
    },
    {
      description: 'should resolve path with prefix',
      particlePath: 'bootstrap.sh',
      filePath: path.join('test','fixtures','projects','projectB','particles','cftemplates','fake.template'),
      prefix: 'aNewPrefix',
      expected:  'aNewPrefix/particles/assets/bootstrap.sh'
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
              prefix: config.prefix
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
