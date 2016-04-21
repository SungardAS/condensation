var shared = require('./project-shared');


describe('projectA', function(){

  var projectName = 'projectA';

  var distributionFiles = [
    '0/particles/cftemplates/vpc.template.json',
    '0/particles/cftemplates/subnet.template.json',
    '0/particles/cftemplates/infra.template.json'
  ];

  var config = shared.generateConfig(
      projectName,
      {distributionFiles:distributionFiles}
  );

  shared.shouldBehaveLikeAProject(config);

});
