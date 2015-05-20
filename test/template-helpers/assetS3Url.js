var assert = require("assert");
var helper = require('../../lib/template-helpers/assetS3Url');
var async = require('async');




describe('assetS3Url', function(){

    async.each([
        {
            description: 'should resolve http path on windows',
            particlePath: 'particles\\assets\\example.rb',
            protocol: 'http',
            expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/assets/example.rb'
        },
        {
            description: 'should resolve http path on linux',
            particlePath: 'particles/assets/example.rb',
            protocol: 'http',
            expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/assets/example.rb'
        },
        {
            description: 'should resolve http path on windows with leading slash',
            particlePath: '\\particles\\assets\\example.rb',
            protocol: 'http',
            expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/assets/example.rb'
        },
        {
            description: 'should resolve http path on linux with leading slash',
            particlePath: '/particles/assets/example.rb',
            protocol: 'http',
            expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/assets/example.rb'
        },
        {
            description: 'should resolve s3 path on windows',
            particlePath: 'particles\\assets\\example.rb',
            protocol: 's3',
            expected:  's3://bucket/particles/assets/example.rb'
        },
        {
            description: 'should resolve s3 path on linux',
            particlePath: 'particles/assets/example.rb',
            protocol: 's3',
            expected:  's3://bucket/particles/assets/example.rb'
        },
        {
            description: 'should default to http if no protocol specified',
            particlePath: 'particles\\assets\\example.rb',
            protocol: null,
            expected:  'https://s3-eu-west-1.amazonaws.com/bucket/particles/assets/example.rb'
        }
    ], function(config){

        it(config.description, function(done){
            //Arrange
            var hOpts = {
                data: {_file: null},
                hash: {protocol: config.protocol}
            };
            var cOpts = {
                particleLoader: {
                    loadParticle: function(){
                        return {relative: config.particlePath};
                    }
                }
            };
            var root = {s3: {awsPath: 'https://s3-eu-west-1.amazonaws.com/bucket/', awsPathInS3Format: 's3://bucket/'}};

            //Act
            var result = helper.helper.apply(root, [null, null, null, hOpts, cOpts]);

            //Assert
            assert.equal(result, config.expected);
            done();
        });

    });




});