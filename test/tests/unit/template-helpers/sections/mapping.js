var ParticleLoader = require('../../../../../lib/condensation/loaders/particle-loader'),
Handlebars = require('handlebars'),
assert = require("assert"),
async = require('async'),
path = require('path');



describe('mapping', function(){

  async.each([
    {
      description: 'should work as a wrapper',
      content: '{{#mapping logicalId="AmiMap"}}{"ap-northeast-1":{"ami":"ami-ab1df7ab"}}{{/mapping}}',
      expected:  '"AmiMap":{"ap-northeast-1":{"ami":"ami-ab1df7ab"}}'
    },
    {
      description: 'should work as a wrapper without root object braces',
      content: '{{#mapping logicalId="AmiMap"}}"ap-northeast-1":{"ami":"ami-ab1df7ab"}{{/mapping}}',
      expected:  '"AmiMap":{"ap-northeast-1":{"ami":"ami-ab1df7ab"}}'
    },
    {
      description: 'should work in a layout',
      content: '{{#layout}}{{#mapping logicalId="AmiMap"}}"ap-northeast-1":{"ami":"ami-ab1df7ab"}{{/mapping}}{{/layout}}',
      expected:  '{"AWSTemplateFormatVersion":"2010-09-09","Mappings":{"AmiMap":{"ap-northeast-1":{"ami":"ami-ab1df7ab"}}}}'
    }
  ], function(config){

    it(config.description, function(done){

      var testHandlebars = Handlebars.create();

      //Arrange
      var helpers = require('../../../../../lib/condensation/loaders/all-helpers')({
          particleLoader: ParticleLoader,
          handlebars: testHandlebars
      });

      //Act
      var fn = testHandlebars.compile(config.content);
      var string = fn();


      //Assert
      assert.equal(string, config.expected);
      done();
    });

  });

});
