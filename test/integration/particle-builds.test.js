var _ = require('lodash');
var assert = require('assert');
var Condensation = require('../../lib/condensation');
var sections = require('../../lib/condensation/template-helpers/sections');
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


describe('particle-builds', function(){
  var condensation = new Condensation(projectConfig);

  var cOpts = {
    particleLoader: condensation.particleLoader,
    handlebars: condensation.handlebars
  };


  it("creates a parameter", function() {
    var hOpts = {
      data: {
        _file: {path: [projectDir,'particles','cftemplates','____test_template'].join(path.sep) }
      },
      hash: {
        logicalId: "Parameter1"
      }
    };

    var result = sections.parameter.helper.apply(condensation, [null, 'generic', null, hOpts, cOpts]);
    assert.deepEqual(JSON.parse('{'+result+'}'),{Parameter1: {Type: ""}});

  });

  it("works with older full object particle definitions", function() {
    var hOpts = {
      data: {
        _file: {path: [projectDir,'particles','cftemplates','____test_template'].join(path.sep) }
      },
      hash: {
        logicalId: "Parameter1"
      }
    };

    var result = sections.parameter.helper.call(condensation, null, 'full_object', null, hOpts, cOpts);
    assert.deepEqual(JSON.parse('{'+result+'}'),{Parameter1: {Type: "String"}});
  });

  it("fails when a parameter has no logicalId", function() {
    var hOpts = {
      data: {
        _file: {path: [projectDir,'particles','cftemplates','____test_template'].join(path.sep) }
      },
      hash: {
      }
    };

    assert.throws(sections.parameter.helper.bind(condensation, null, 'generic', null, hOpts, cOpts));
  });

  it("fails when a parameter has invalid JSON", function() {
    var hOpts = {
      data: {
        _file: {path: [projectDir,'particles','cftemplates','____test_template'].join(path.sep) }
      },
      hash: {
        logicalId: "Parameter1"
      }
    };

    assert.throws(sections.parameter.helper.bind(condensation, null, 'malformed', null, hOpts, cOpts));
  });

  it("fails when a parameter extends malformed", function() {
    var hOpts = {
      data: {
        _file: {path: [projectDir,'particles','cftemplates','____test_template'].join(path.sep) }
      },
      hash: {
        logicalId: "Parameter1"
      }
    };

    assert.throws(sections.parameter.helper.bind(condensation, null, 'extend_malformed', null, hOpts, cOpts));
  });

});



