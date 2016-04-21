var _ = require('lodash');
var exec = require('child_process').exec;
var shared = require('./project-shared');

describe('particles-vpc', function(){
  var gulp;

  var projectName = 'particles-vpc';

  var distributionFiles = [
    '0/particles/cftemplates/subnet.template.json',
    '0/particles/cftemplates/vpc.template.json'
  ];

  var config = shared.generateConfig(
      projectName,
      {distributionFiles:distributionFiles}
  );

  before(function(done) {
    var p = exec("npm link ../particles-common-core",{cwd: config.projectConfig.root},done);
  });

  after(function(done) {
    var p = exec("npm unlink ../particles-common-core",{cwd: config.projectConfig.root},done);
  });

  shared.shouldBehaveLikeAProject(config);

});
