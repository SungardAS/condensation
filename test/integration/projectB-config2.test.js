var assert = require('assert');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var shared = require('./project-shared');

var projectName = 'projectB-config2';


describe('projectB-config2', function(){

  var config = shared.generateConfig(
    projectName,
    {
      distributionFiles: [
        '0/testing-path/particles/cftemplates/instance.template.json'
      ],
      projectConfig: {
        root: path.join('test','fixtures','projects','projectB'),
        s3: [
          {
            aws: {
              region: 'us-east-1',
              bucket: '',
            },
            validate: false,
            create: false,
            prefix: 'testing-path'
          }
        ]
      }
    }
  );

  before(function(done) {
    var pA = exec("npm link ../projectA",{cwd: config.projectConfig.root},done);
  });

  after(function(done) {
    var pA = exec("npm unlink ../projectA",{cwd: config.projectConfig.root},done);
  });

  shared.shouldBehaveLikeAProject(config);

  it("should prefix all file paths with 'testing-path' for the distribution", function(done){
    fs.lstat(path.join('./',config.projectConfig.dist,'0','testing-path'), function(err, stats) {
      assert((!err && stats.isDirectory()),err);
      done();
    });
  });

});
