var assert = require("assert");
var helper = require('../../lib/template-helpers/templateS3Url');
var async = require('async');




describe('templateS3Url', function(){

    async.each([
        {
            description: 'should resolve http path on windows',
            particlePath: 'particles\\cftemplates\\example.template',
            expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/cftemplates/example.template'
        },
        {
            description: 'should resolve http path on linux',
            particlePath: 'particles/cftemplates/example.template',
            expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/cftemplates/example.template'
        },
        {
            description: 'should resolve http path on windows with a leading slash',
            particlePath: '\\particles\\cftemplates\\example.template',
            expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/cftemplates/example.template'
        },
        {
            description: 'should resolve http path on linux with a leading slash',
            particlePath: '/particles/cftemplates/example.template',
            expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/cftemplates/example.template'
        }
    ], function(config){

        it(config.description, function(done){
            var root = {s3: {awsPath: 'https://s3-eu-west-1.amazonaws.com/bucket/', awsPathInS3Format: 's3://bucket/'}};

            //Arrange
            var hOpts = {
                data: {_file: null, root: root},
                hash: {}
            };
            var cOpts = {
                particleLoader: {
                    loadParticle: function(){
                        return {relative: config.particlePath};
                    }
                }
            };

            //Act
            var result = helper.helper.apply(root, [null, null, null, hOpts, cOpts]);

            //Assert
            assert.equal(result, config.expected);
            done();
        });

    });




});