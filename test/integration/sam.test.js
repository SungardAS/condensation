var _ = require('lodash');
var assert = require('assert');
var path = require('path');
var shared = require('./project-shared');

describe('sam', function(){
  var projectName = 'sam';

  var config = shared.generateConfig(
      projectName,
      {distributionFiles:distributionFiles}
  );

  var distributionFiles = [
    'particles/cftemplates/sam.template.json'
  ];

  shared.shouldBehaveLikeAProject(config);

  it("set the transform on the template", function(done){
    var template = require(path.join('../../',config.projectConfig.dist,'0','particles','cftemplates','sam.template.json'))
    assert(template.Transform,"AWS::Serverless-2016-10-31")
    done();
  });

});
