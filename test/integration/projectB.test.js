var exec = require('child_process').exec;
var shared = require('./project-shared');


describe('projectB', function(){

  var projectName = 'projectB';

  var distributionFiles = [
    '0/particles/cftemplates/instance.template.json',
    '0/particles/assets/bootstrap.sh',
    '0/particles/assets/download.sh',
    '0/node_modules/projectA/particles/cftemplates/vpc.template.json'
  ];

  var config = shared.generateConfig(
    projectName,
    {
      tasks: ['build:east', 'deploy:east'],
      distributionFiles:distributionFiles,
      projectConfig: {
        s3: [
          {
            aws: {
              region: 'us-east-1',
              bucket: '',
            },
            labels: ['east'],
            validate: false,
            create: false
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

});
