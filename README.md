# condensation

Package, reuse and share particles for CloudFormation projects

[![NPM](https://nodei.co/npm/condensation.png)](https://nodei.co/npm/condensation/)

[![Build Status](https://travis-ci.org/SungardAS/condensation.svg?branch=master)](https://travis-ci.org/SungardAS/condensation?branch=master)
[![Code Climate](https://codeclimate.com/github/SungardAS/condensation/badges/gpa.svg?branch=master)](https://codeclimate.com/github/SungardAS/condensation?branch=master)
[![Coverage Status](https://coveralls.io/repos/SungardAS/condensation/badge.svg?branch=master)](https://coveralls.io/r/SungardAS/condensation?branch=master)
[![Dependency Status](https://david-dm.org/SungardAS/condensation.svg?branch=master)](https://david-dm.org/SungardAS/condensation?branch=master)


## Summary

Condensation is a [gulp](http://gulpjs.com) task generator that helps
compile, package and upload [AWS CloudFormation](http://aws.amazon.com/cloudformation/)
templates and supporting assets.

Any file with the extension `.hbs` will be compiled with
[Handlebars.js](http://http://handlebarsjs.com/) to support
partials, helpers and variable replacement.

## Features

* Write reusable CloudFormation snippits (particles) that can be included as
  in other condensation projets
* Package templates and assets that can be uploaded to multiple buckets across
  regions with one command.
* Reference another template within the distribution with
  [AWS::CloudFormation::Stack](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-stack.html)
and the `templateS3Url` helper
* Upload scripts, configuration files and other assets alongside
  CloudFormation templates.

## Why?

CloudFormation templates are great for creating, updating and deleting
AWS resources.  Reusing parts of templates, referencing other
templates with `AWS::CloudFormation::Stack` and deploying cloud-init
scripts can be difficult to manage.

* Often sections such as AMI [mappings](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/mappings-section-structure.html)
  are re-used by many templates.  Particles provide a way to
  write the mapping once and reuse it in other templates by reference.
* It is common to set up resources, such as a VPC, with nearly
  identical attributes and structure for different applications and
  services.  Condensation allows that definition to become a independent
  stack that can be referenced by other templates that are part of the
  same distribution package.
* To bootstrap instances it is beneficial to have scripts and configuration
  files deployed alongside and verisoned with the template
  they are associated with.
* When using `AWS::CloudFormation::Authentication` to download assets from
  S3 buckets all resources must be in the same region.  Condensation
  makes it easy to deploy the same templates and assets to multiple
  regions and ensure the referencing URLs are correct.

All templates in a distribution can reference one another based on the
bucket they are deployed to.

Example:

    "TemplateURL": "{{{templateS3Url 'vpc.template' }}}"
    ...
    "TemplateURL": "{{{templateS3Url 'subnet.template' }}}"

Output:

    "TemplateURL": "https://s3-us-west-1.amazonaws.com/<BUCKET>/cftemplates/vpc.template"
    ...
    "TemplateURL": "https://s3-us-west-1.amazonaws.com/<BUCKET>/cftemplates/subnet.template"

The  Handlebars helper will ensure that the URL will always reference a template deployed within the same
bucket.


## Use

Quick Start Examples: [condensation-examples](https://github.com/SungardAS/condensation-examples)

### Create a project

    > npm init

### Recommended .gitignore

    condensation_errors
    config/local.js
    dist
    node_modules

#### Install [gulp](http://gulpjs.com/)

    > npm install -g gulp

#### Install condensation

    > npm install condensation --save

#### Add condensation to gulpfile.js

    var gulp = require('gulp');

    var config = {
      s3: [
        {
          aws: {
            region: 'us-east-1',
            bucket: 'MY-FAVORITE-BUCKET',
          },
          validate: true,
          create: true
        }
      ],
      dist: 'dist'
    };

    // Add necessary gulp tasks to build, compile and validate
    // CloudFormation templates
    require('condensation').buildTasks(gulp,config);

### Project Structure

    my-project
    |
    -- guplfile.js
    |
    -- README.md
    |
    --particles
      |
      -- assets
      |
      -- conditions
      |
      -- cftemplates
      |
      -- helpers
      |
      -- mappings
      |
      -- metadata
      |
      -- outputs
      |
      -- parameters
      |
      -- resources
      |
      -- sets
      |
      -- partials

Condensation loads particles through core helper methods that
are able to load particles from the local project
as well as any condensation compatible project added as a npm
dependency.

All helpers follow the same pattern:

    {{{<CONDENSATION-HELPER> [module:<MODULE>] '<PATH_TO_PARTICLE>' [OPTIONS...]}}}

When including the particles from another project *MODULE* is the name
of the npm dependency.


#### Lazy Loading

Particles will only be included in the final distribution if they are
referenced from a `hbs` file.

### layout support

**New in 0.3.0**

Instead of including particles within a traditional CloudFormation
tempalte the introduction of a layout supports capturing helper output
and adding it to the correct section.  Helpers within a layout do not
have to to be in any specific order.

    ---
    things:
    -
      name: subnet1
      cidr: "10.0.0.0/24"
    -
      name subnet2
      cidr: "10.0.1.0/24"
    ---

    {{#layout templateDescription="condensation rocks!"}}
      {{{parameter 'my_parameter' logicalId="MyParameter"}}}
      {{{condition 'my_condition' logicalId="MyCondition"}}}

      [[! helpers can occur in any order, allowing you to group related
section parts together }}

      {{#each things}}
        {{{parameter 'repeate_me' logicalId="RepeateMe" logicalIdSuffix=@index}}}
        {{{condition 'repeate_me' logicalId="RepeateMeCond" logicalIdSuffix=@index}}}
        {{{resource 'repeate_me' logicalId="RepeateMeResource" logicalIdSuffix=@index}}}
        {{{output 'repeate_me' logicalId="RepeateMeOutput" logicalIdSuffix=@index}}}
      {{/each}}
    {{/layout}}


#### assets

Files to be uploaded to S3 that are used to supplement CloudFormation
templates.  Files can include boostrap scripts, packaged install files
or configuration files.

Any file with a `.hbs` extension will be
compiled with handlebars and saved to S3.  The `.hbs` extension will be
removed from the filename.

Asset URLs can be built with the `assetS3Url` helper:

    {{{assetS3Url 'my-asset' [protocol=https|s3]}}}

    {{{assetS3Url 'module:<MODULE>' 'module-asset' [protocol=https|s3]}}}

The particle path will match the name of the asset without the `.hbs` extension, if it exists.

Parameters:

**protocol** *optional* https|s3 - Forces the protocol of the url to https:// or s3://

Example Output:

    "https://s3-us-west-1.amazonaws.com/BUCKET/assets/my-asset"

    "https://s3-us-west-1.amazonaws.com/BUCKET/node_modules/MODULE/particles/assets/module-asset"

To include assets that are not directly referenced from a template
use the `requireAssets` helper.  It will ensure a glob of assets are
included in the distribution.

    {{{requireAssets '/**'}}

    {{{requireAssets 'module:<MODULE>' '/**'}}}

`requireAssets` will not produce output, only ensure that the glob is
uploaded to S3.

#### conditions

Contents of files will be loaded as conditions that can be used in
in a trandtional template or a `layout` (**recommended**))

Directory: `conditions`
Helper: `condition`

    {{{condition 'my-condition' logicalId="MyCond"}}}

    {{{condition 'module:<MODULE>' 'condition-name' logicalId="TheirCond"}}}

The particle path can match the base name of the file or the base name
plus any extensions.


#### cftemplates

CloudFormation templates that will be uploaded to S3.

Any file with a `.hbs` extension will be compiled with
handlebars and saved to S3 without the `.hbs` extension.

Template URLs can be built with the `assetS3Url` helper:

    {{{templateS3Url 'my.template'}}}

    {{{templateS3Url 'module:<MODULE>' 'module.template'}}}

The particle path should match the name of the template without the `.hbs` extension, if it exists.

Example Output:

    "https://s3-us-west-1.amazonaws.com/BUCKET/cftemplates/my.template"

    "https://s3-us-west-1.amazonaws.com/BUCKET/node_modules/MODULE/particles/cftemplates/module.template"

#### helpers

Node modules that export a function that is built as a
Handlebars [block helper](http://handlebarsjs.com/block_helpers.html).

Helpers are called with the `helper` helper:

    {{{helper 'my-helper'}}}

    {{{helper 'module:<MODULE>' 'module-helper'}}}

The particle path should match the name of the helper without the `.js` extension.

#### mappings

Contents of files will be loaded as mappings that can be used in
in a trandtional template or a `layout` (**recommended**))

Directory: `mappings`
Helper: `mapping`

    {{{mapping 'my-mapping' logicalId="MyMapping"}}}

    {{{mapping 'module:<MODULE>' 'mapping-name' logicalId="TheirMapping"}}}

The particle path can match the base name of the file or the base name
plus any extensions.

#### metadata

Contents of files will be loaded as metadatas that can be used in
in a trandtional template or a `layout` (**recommended**))

Directory: `metadatas`
Helper: `metadata`

    {{{metadata 'my-metadata' logicalId="MyMetadata"}}}

    {{{metadata 'module:<MODULE>' 'metadata-name' logicalId="TheirMetadata"}}}

The particle path can match the base name of the file or the base name
plus any extensions.

#### outputs

Contents of files will be loaded as outputs that can be used in
in a trandtional template or a `layout` (**recommended**))

Directory: `outputs`
Helper: `output`

    {{{output 'my-osutput' logicalId="MyOutput"}}}

    {{{output 'module:<MODULE>' 'output-name' logicalId="TheirOutput"}}}

The particle path can match the base name of the file or the base name
plus any extensions.

#### parameters

Contents of files will be loaded as parameters that can be used in
in a trandtional template or a `layout` (**recommended**))

Directory: `parameters`
Helper: `parameter`

    {{{parameter 'my-osutput' logicalId="MyParameter"}}}

    {{{parameter 'module:<MODULE>' 'parameter-name' logicalId="TheirParameter"}}}

The particle path can match the base name of the file or the base name
plus any extensions.

#### partials

Contents of files here will be loaded as partials that can be used in
`assets` and `cftemplates`.

These files will not be packaged or uploaded to S3.

Partials can be loaded with the `partial` helper:

    {{{partial 'my-partial'}}}

    {{{partial 'module:<MODULE>' 'module-partial'}}}

The particle path only needs to match the base name of the partial.

A path of `some_partial` would match `some_partial.json` or `some_partial.json.hbs`.

If the desired partial is not being loaded ensure precedence is given to an exact match.

#### resources

Contents of files will be loaded as resources that can be used in
in a trandtional template or a `layout` (**recommended**))

Directory: `resources`
Helper: `resource`

    {{{resource 'my-osutput' logicalId="MyResource"}}}

    {{{resource 'module:<MODULE>' 'resource-name' logicalId="TheirResource"}}}

The particle path can match the base name of the file or the base name
plus any extensions.

#### sets

Intended for use with `layout`

A grouping of section definitions that will always be generated
together.  Most commonly used to generate parameters with corresponding
conditions.

Directory: `sets`
Helper: `set`

    {{{set 'my-set' logicalId="MySet"}}}

    {{{set 'module:<MODULE>' 'set-name' logicalId="TheirSet"}}}

The particle path can match the base name of the file or the base name
plus any extensions.

### Tasks

Get a full list of tasks by running `gulp -T`

By default all tasks are prefixed with `condensation:`. This can be
changed with the `taskPrefix` config option.

#### Default

The `default` task is an alias for `build`. It will prepare all files
for deployment to s3. Templates and assets are written to the configured
`dist` directory.

    > gulp condensation:default


#### condensation:s3:list
Will list all the configured s3 bukets and module corresponding ID.

    > gulp condensation:s3:list
    [10:21:47] Using gulpfile ~/condensation-example/gulpfile.js
    [10:21:47] Starting 'condensation:s3:list'...
    0: a.bucket.in.us-east-1
    1: a.bucket.in.us-west-2
    [10:21:47] Finished 'condensation:s3:list' after 153 μs

The IDs can be used to deploy to a single bucket instead of all buckets.

#### condensation:deploy
For the `deploy` task to run AWS credentials must be set as environment
variables: `AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID`

    > AWS_SECRET_ACCESS_KEY=XXXX AWS_ACCESS_KEY_ID=XXXX gulp deploy

This will upload templates to all cofigured S3 buckets.

#### condensation:deploy:ID
Deploy tempates to a specific S3 bucket.

#### condensation:deploy:LABEL
Deploy tempates to all S3 buckets that contain the label, LABEL.

## Config Options

    var config = {
      // Array of S3 buckets to deploy to
      s3: [
        {
          // AWS specific options
          aws: {
            region: 'us-east-1',
            bucket: 'my.bucket.in.us-east-1',
          },

          // Run CloudFormation validation during the build task for this bucket
          validate: true,

          // Create this bucket if it does not already exist
          create: true

          // Prefix all objects (allows for multiple deploymets to the same bucket
          prefix: '',

          labels: ['east']
        },
      ],
      // The prefix to add to all generated gulp tasks (default: 'condensation')
      // An empty string will remove the prefix
      //     - condensation:deploy will become deploy
      taskPrefix: '',

      // Directory that contains the `particles` directory.
      // Used for test scripts, should not be changed if sharing templates
      root: './',

      // Where the build task will put the distribution
      dist: 'dist'
    };

## Front Matter

All `cftemplates` and `partials` are first processed with
[gray-matter](https://github.com/jonschlinkert/gray-matter) to load any
default data definitions.

## Errors

Errors due to badly formed JSON or failed CF validations will stop the
process and the offendng files will be dumped to `condensation_errors`


