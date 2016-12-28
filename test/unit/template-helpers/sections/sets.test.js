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


describe('sets', function(){
  var condensation = new Condensation(null, projectConfig);

  var cTests = new CPT({condensation: condensation});

  it("ceates a set", function() {
    cTests.testParticle(
      "set",
      "set1",
      require("../../../fixtures/projects_output/particle-builds/sets_output1"),
      {logicalId: "Parameter1"}
    );
  });

});



