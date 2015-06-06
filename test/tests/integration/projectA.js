var _ = require('lodash'),
async = require('async'),
clone = require('clone'),
assert = require('assert'),
path = require('path'),
shared = require('./project-shared'),
fs = require('fs');

var projectDir = 'test/fixtures/projects/projectA';
var distDir = 'test/dist/pA';

var tasks = [
  'build',
  'build:0',
  'clean',
  'default',
  'deploy',
  'deploy:0',
  's3:bucket:ensure:0',
  's3:list',
  's3:objects:write:0'
];

var distributionFiles = [
  'particles/cftemplates/vpc.template',
  'particles/cftemplates/subnet.template',
  'particles/cftemplates/infra.template'
];


describe('projectA', function(){
  var gulp;

  shared.shouldBehaveLikeAProject({
    gulp: gulp,
    tasks: tasks,
    distributionFiles: distributionFiles,
    projectConfig: {
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
        projectName: 'projectA',
        root: projectDir,
        taskPrefix: '',
        dist: distDir,
      }
  });

});
