# condensation
[![Build Status](https://travis-ci.org/kmcgrath/condensation.svg?branch=develop)](https://travis-ci.org/kmcgrath/condensation)
[![Code Climate](https://codeclimate.com/github/kmcgrath/condensation/badges/gpa.svg)](https://codeclimate.com/github/kmcgrath/condensation)
[![Coverage Status](https://coveralls.io/repos/kmcgrath/condensation/badge.svg?branch=develop)](https://coveralls.io/r/kmcgrath/condensation?branch=develop)
[![Dependency Status](https://david-dm.org/kmcgrath/condensation.svg?branch=develop)](https://david-dm.org/kmcgrath/condensation?branch=develop)


A CloudFormation Templating System

## Summary

Condensations is a [gulp](http://gulpjs.com) task generator that
will compile and deploy [Handlebars.js](http://http://handlebarsjs.com/)
templates with static assets as a packaged CloudFormation
distribution.

## Why?

CloudFormation templates are great for creating, updating and deleting
AWS resources.  Reusing parts of templates, referencing other
templates with `AWS::CloudFormation::Stack` and deploying cloud-init
scripts can be difficult.

* It is often the case that the same AMIs are used in
[Mappings](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/mappings-section-structure.html)
over and over again.
* It is common to set up a VPC with nearly
identical attributes and structure for different applications and
services.
* To bootstrap instances it is nice to have scripts and configuration
  files deployed in a known location and versioned with the template
they are associated with.

Condensation's goal is to make deploying and reusing CloudFormation
definitions easy.

The first use case replaced `{{s3.awsPath}}` for a `AWS::CloudFormation::Stack`
`TemplateURL` key.  This allowed for self referencing
urls for a deploy.  Many small stacks could be deployed to a bucket
where each stack could reference the other.  That pattern could then be
repeated for multiple development and production buckets.

Example:

    "TemplateURL": "{{s3.awsPath}}/infra_core/vpc.template"
    ...
    "TemplateURL": "{{s3.awsPath}}/infra_core/subnet.template"

Deployed as:

    https://s3-us-west-1.amazonaws.com/MYBUCKETv1/infra_core/vpc.template
    https://s3-us-west-1.amazonaws.com/MYBUCKETv1/infra_core/subnet.template

And then as:
    https://s3-us-west-1.amazonaws.com/MYBUCKETv2/infra_core/vpc.template
    https://s3-us-east-1.amazonaws.com/MYEASTBUCKETv2/infra_core/subnet.template

The URL will always reference other templates deployed within the same
bucket.

Options have now been added to use partials and deploy assets (scripts, configurations)
alongside templates.


## Use

Create a project

    > npm init

Install [gulp](http://gulpjs.com/)

    > npm install -g gulp
    > npm install gulp --save

Install [bower](http://bower.io)

    > npm install -g bower

Install condensation

    > npm install condensation --save

Add condensation to gulpfile.js

    var gulp = require('gulp');

    var config = {
      s3: [
        {
          aws: {
            region: 'us-east-1',
            bucket: 'MY-FAVORITE-BUCKET',
          },
          validate: false,
          create: true
        }
      ],
      src: './',
      dependencySrc: [
        'bower_components'
      ],
      dist: 'dist',
    };

    // Will add necessary gulp tasks to build, compile and validate
    // CloudFormation templates
    require('condensation').buildTasks(gulp,config);



### Tasks

Get a full list of tasks by running `gulp -T`

By default all tasks are prefixed with `condensation:`. This can be
changed with the `taskPrefix` config option.

#### Default

The `default` task is an alias for `build`. It will prepare all files
for deployment to s3. Templates and assets are written to the configured
`dist` directory.

    > gulp condensation:default


#### s3:list
Will list all the configured s3 bukets and their corresponding ID.

    > gulp s3:list
    [10:21:47] Using gulpfile ~/condensation-example/gulpfile.js
    [10:21:47] Starting 's3:list'...
    0: a.bucket.in.us-east-1
    1: a.bucket.in.us-west-2
    [10:21:47] Finished 's3:list' after 153 μs

The IDs can be used to deploy to a single bucket instead of all buckets.

#### deploy
For the `deploy` task to run AWS credentials must be set as environment
variables: `AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID`

    > AWS_SECRET_ACCESS_KEY=XXXX AWS_ACCESS_KEY_ID=XXXX gulp deploy

This will upload templates to all cofigured S3 buckets.

#### deploy:<ID>
Deploy tempates to a specific S3 bucket.


## Config Options

Add any local configuration overrides to `config/local.js`. This file
is ignored by git and is applied after `config/default.js`.  See
`config/default.js` for options.

    var config = {
      // Array of S3 buckets to deploy to
      s3: [
        {
          // AWS specific options
          aws: {
            region: 'us-east-1',
            bucket: 'my.bucket.in.us-east-1',
          },

          // Run CloudFormation validation before deploying this bucket
          validate: false,

          // Create this bucket if it does not already exist
          create: true
        },
      ],
      // The prefix to add to all generated gulp tasks (default:
'condensation')
      taskPrefix: '', 

      // Location of local condensation files
      src: './',

      // Location of dependency packages
      dependencySrc: [
        'bower_components'
      ],
      dist: 'dist',
    };


## TODO
* Add labels to S3 configuration.
  * Allow deploy for labels
* Optons Delete previous S3 objects and/or bucket
* Replace console.log with native gulp info and warnings
* Fix ensure bucket to work with cross account access.
  * add option to ignore errors here?
