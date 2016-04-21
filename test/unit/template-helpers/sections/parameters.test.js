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


describe('parameters', function(){
  var condensation = new Condensation(null, projectConfig);

  var cTests = new CPT({condensation: condensation});

  it("creates a parameter", function() {
    cTests.testParticle(
      "parameter",
      "generic",
      {Parameter1: {Type: ""}},
      {logicalId: "Parameter1"}
    );
  });

  it("works with older full object particle definitions", function() {
    cTests.testParticle(
      "parameter",
      "full_object",
      {Parameter1: {Type: "String"}},
      {logicalId: "Parameter1"}
    );
  });

  it("fails when a parameter has no logicalId", function() {
    cTests.testParticle(
      "parameter",
      "generic",
      null,
      {expectError: true}
    );
  });

  it("fails when a parameter has invalid JSON", function() {
    cTests.testParticle(
      "parameter",
      "malformed",
      null,
      {logicalId: "Parameter1", expectError: true}
    );
  });

  it("fails when a parameter extends malformed", function() {
    cTests.testParticle(
      "parameter",
      "extend_malformed",
      null,
      {logicalId: "Parameter1", expectError: true}
    );
  });

});



