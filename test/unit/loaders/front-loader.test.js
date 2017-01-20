var ParticleLoader = require("../../../lib/condensation/loaders/particle-loader");
var frontLoader = require("../../../lib/condensation/loaders/front-loader");
var assert = require("assert");
var path = require("path");

describe('frontLoader', function(){

  it("should run a loader", function(done) {
    var particleLoader = new ParticleLoader({root:path.join('test','fixtures','projectC')});
    var processCwd = process.cwd();

    var templateData = {
    };
    var loaderConfig = {
      loader: "testLoader",
      _file: {
        path: path.join(processCwd,"test","fixtures","projects","projectC","particles","cftemplates","fake.template")
      }
    };

    frontLoader.call({particleLoader: particleLoader}, loaderConfig, templateData, done);

  })

});
