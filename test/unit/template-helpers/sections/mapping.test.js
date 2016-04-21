var _ = require('lodash');
var assert = require('assert');
var Condensation = require('../../../../lib/condensation');
var CPT = require('condensation-particle-tests');
var path = require('path');

var projectDir = 'test/fixtures/projects/particle-builds';
var distDir = 'test/dist/particle-builds';

var projectConfig = {
  s3: [
    {
      aws: {
        region: 'us-east-1',
        bucket: '',
      },
      validate: false,
      create: false
    }
  ],
  projectName: 'particle-builds',
  root: projectDir,
  taskPrefix: '',
  dist: distDir,
};


describe('mapping', function(){
  var condensation = new Condensation(null, projectConfig);
  var cTests = new CPT({condensation: condensation});

  it("creates a mapping", function() {
    cTests.testParticle(
      "mapping",
      "ami",
      {Mapping1: {"ap-northeast-1":{"ami":"ami-ab1df7ab"}}},
      {logicalId: "Mapping1"}
    );
  });

  it("works with older full object particle definitions", function() {
    cTests.testParticle(
      "mapping",
      "ami_full_object",
      {Mapping1: {"ap-northeast-1":{"ami":"ami-ab1df7ab"}}},
      {logicalId: "Mapping1"}
    );
  });

});
