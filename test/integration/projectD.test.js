var shared = require('./project-shared');

describe('projectD', function(){

  var projectName = 'projectD';

  var distributionFiles = [
    //'0/particles/cftemplates/proj.template.yaml'
  ];

  var config = shared.generateConfig(
      projectName,
      {distributionFiles:distributionFiles}
  );

  shared.shouldBehaveLikeAProject(config);

});
