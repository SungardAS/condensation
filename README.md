# condensation

Package, reuse and share particles for CloudFormation projects

![condensation][condensation-image]

[![NPM][npm-image]][npm-url]
[![Gitter][gitter-image]][gitter-url]
[![Build Status][travis-image]][travis-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependency Status][daviddm-image]][daviddm-url]


## Summary

Condensation is a [gulp](http://gulpjs.com) task generator that
compiles, packages and uploads [AWS CloudFormation](http://aws.amazon.com/cloudformation/)
templates and supporting assets as distributions.

Any file with the extension `.hbs` will be compiled with
[Handlebars.js](http://handlebarsjs.com/) to support
partials, helpers and variable replacement.

## Features

* Write reusable CloudFormation snippets, called `particles` that can be used
  accross condensation projets
* Package templates and assets then upload full distributions to multiple buckets across
  regions with one command.
* Reference another template within the distribution with
  [AWS::CloudFormation::Stack](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-stack.html)
and the `templateS3Url` helper
* Upload scripts, configuration files and other assets alongside
  CloudFormation templates and reference them with asset helpers.

## Why?

CloudFormation templates are great for creating, updating and deleting
AWS resources.  Reusing parts of templates, referencing other
templates with `AWS::CloudFormation::Stack` and deploying cloud-init
scripts can be difficult to manage.

* Sections such as AMI [mappings](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/mappings-section-structure.html)
  are often re-used by many templates.  Particles provide a way to
  write the mapping once and reuse it in other templates by reference.
* It is common to set up resources, such as a VPC, with nearly
  identical attributes and structure for different applications and
  services.  Condensation allows that definition to become a independent
  stack that can be referenced by other templates that are part of the
  same distribution.
* When bootstrapping ec2 instances it is beneficial to have versioned scripts and configuration
  files deployed in the same bucket and path as the CloudFormation template
  they are associated with.
* When using `AWS::CloudFormation::Authentication` to download assets from
  S3 buckets all resources must be in the same region.  Condensation
  makes it easy to deploy the same templates and assets to multiple
  regions and ensure the referencing URLs are always pointing to the
  right place.

For example, templates in a distribution can reference one another based on the
bucket they are deployed to.

Example:

    "TemplateURL": "{{templateS3Url 'vpc.template' }}"
    ...
    "TemplateURL": "{{templateS3Url 'subnet.template' }}"

Output:

    "TemplateURL": "https://s3-us-west-1.amazonaws.com/<BUCKET>/cftemplates/vpc.template"
    ...
    "TemplateURL": "https://s3-us-west-1.amazonaws.com/<BUCKET>/cftemplates/subnet.template"

The Handlebars helper, `templateS3Url`, creates a URL that will always reference a template deployed within the same bucket.


## Quick Start Example Projects

* [condensation-examples](https://github.com/SungardAS/condensation-examples)
* [particles-vpc](https://github.com/SungardAS/particles-vpc)
* [particles-cloudsploit-scans](https://github.com/SungardAS/particles-cloudsploit-scans)
* [particles-enhanced-snapshots](https://github.com/SungardAS/particles-enhanced-snapshots)

Check out the growing list of particles on
[npm](https://www.npmjs.com/browse/keyword/condensation-particles)!

## Use

Get started with the Yeoman
[generator](https://github.com/SungardAS/generator-condensation).

    > npm install -g yo
    
    > npm install -g generator-condensation
    
    > yo condensation:project particles-my-project

This will set up a new project for building and sharing particles.


### Project Structure

    particles-my-project
    |
    -- guplfile.js
    |
    -- README.md
    |
    -- CHANGELOG.md
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

Condensation builds templates with Handlebars helpers that
are able to load particles from the local project
or from any condensation compatible module added as a npm
dependency.

All helpers follow the same pattern:

    {{<CONDENSATION-HELPER> [module:<MODULE>] '<PATH_TO_PARTICLE>' [OPTIONS...]}}

When including the particles from another project *MODULE* is the name
of the npm dependency.

**New in 0.5.0**

Use `m` instead of `module` if referencing a module that
starts with `particles-` to minimize characters used. The `m` option
will add `particles-` to the beginning of \<MODULE\> for you.

    {{<CONDENSATION-HELPER> [m:<MODULE>] '<PATH_TO_PARTICLE>' [OPTIONS...]}}

Example, load a particle from `particles-core`

    {{parameter "m:core" "base" logicalId="Parameter1"}}

#### Lazy Loading

Particles will only be included in the final distribution if they are
referenced in a `hbs` file.

### layout support

**New in 0.3.0**

Instead of including particles within a traditional CloudFormation
template the introduction of a layout supports capturing helper output
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
      {{parameter 'my_parameter' logicalId="MyParameter"}}
      {{condition 'my_condition' logicalId="MyCondition"}}

      {{! helpers can occur in any order, allowing you to group related section parts together }}

      {{#each things}}
        {{parameter 'repeate_me' logicalId="RepeateMe" logicalIdSuffix=@index}}
        {{condition 'repeate_me' logicalId="RepeateMeCond" logicalIdSuffix=@index}}
        {{resource 'repeate_me' logicalId="RepeateMeResource" logicalIdSuffix=@index}}
        {{output 'repeate_me' logicalId="RepeateMeOutput" logicalIdSuffix=@index}}
      {{/each}}
    {{/layout}}


#### assets

Files to be uploaded to S3 that are used to supplement CloudFormation
templates.  Files can include bootsrap scripts, packaged install files
or configuration files.

Any file with a `.hbs` extension will be
compiled with handlebars and saved to S3.  The `.hbs` extension will be
removed from the filename.

Asset URLs can be built with the `assetS3Url` helper:

    {{assetS3Url 'my-asset' [protocol=https|s3]}}

    {{assetS3Url 'module:<MODULE>' 'module-asset' [protocol=https|s3]}}


Parameters:

**protocol** *optional* https|s3 - Forces the protocol of the url to https:// or s3://

Example Output:

    "https://s3-us-west-1.amazonaws.com/BUCKET/assets/my-asset"

    "https://s3-us-west-1.amazonaws.com/BUCKET/node_modules/MODULE/particles/assets/module-asset"

Asset paths (the full key path as it will be in the s3 bucket) can be built with the `assetPath` helper:

    {{assetPath 'my-asset'}}

    {{assetPath 'module:<MODULE>' 'module-asset' }}

Example Output:

    "/assets/my-asset"

    "/node_modules/MODULE/particles/assets/module-asset"

For both assetS3Url and assetPath the particle path will match the name of the asset without the `.hbs` extension, if it exists.

To include assets that are not directly referenced from a template
use the `requireAssets` helper.  It will ensure a glob of assets are
included in the distribution.

    {{requireAssets '/**'}}

    {{requireAssets 'module:<MODULE>' '/**'}}

`requireAssets` will not produce output, only ensure that the glob is
uploaded to S3.

#### conditions

Contents of files will be loaded as conditions that can be used in
in a traditional template or a `layout` (**recommended**)

Directory: `conditions`
Helper: `condition`

    {{condition 'my-condition' logicalId="MyCond"}}

    {{condition 'module:<MODULE>' 'condition-name' logicalId="TheirCond"}}

The particle path can match the base name of the file or the base name
plus any extensions.


#### cftemplates

CloudFormation templates that will be uploaded to S3.

Any file with a `.hbs` extension will be compiled with
handlebars and saved to S3 without the `.hbs` extension.

Template URLs can be built with the `assetS3Url` helper:

    {{templateS3Url 'my.template'}}

    {{templateS3Url 'module:<MODULE>' 'module.template'}}

The particle path should match the name of the template without the `.hbs` extension, if it exists.

Example Output:

    "https://s3-us-west-1.amazonaws.com/BUCKET/cftemplates/my.template"

    "https://s3-us-west-1.amazonaws.com/BUCKET/node_modules/MODULE/particles/cftemplates/module.template"

#### helpers

Node modules that export a function that is built as a
Handlebars [block helper](http://handlebarsjs.com/block_helpers.html).

Helpers are called with the `helper` helper:

    {{helper 'my-helper'}}

    {{helper 'module:<MODULE>' 'module-helper'}}

The particle path should match the name of the helper without the `.js` extension.

#### mappings

Contents of files will be loaded as mappings that can be used in
in a traditional template or a `layout` (**recommended**)

Directory: `mappings`
Helper: `mapping`

    {{mapping 'my-mapping' logicalId="MyMapping"}}

    {{mapping 'module:<MODULE>' 'mapping-name' logicalId="TheirMapping"}}

The particle path can match the base name of the file or the base name
plus any extensions.

#### metadata

Contents of files will be loaded as metadata that can be used in
in a traditional template or a `layout` (**recommended**)

Directory: `metadata`
Helper: `metadata`

    {{metadata 'my-metadata' logicalId="MyMetadata"}}

    {{metadata 'module:<MODULE>' 'metadata-name' logicalId="TheirMetadata"}}

The particle path can match the base name of the file or the base name
plus any extensions.

#### outputs

Contents of files will be loaded as outputs that can be used in
in a traditional template or a `layout` (**recommended**)

Directory: `outputs`
Helper: `output`

    {{output 'my-output' logicalId="MyOutput"}}

    {{output 'module:<MODULE>' 'output-name' logicalId="TheirOutput"}}

The particle path can match the base name of the file or the base name
plus any extensions.

#### parameters

Contents of files will be loaded as parameters that can be used in
in a traditional template or a `layout` (**recommended**)

Directory: `parameters`
Helper: `parameter`

    {{parameter 'my-output' logicalId="MyParameter"}}

    {{parameter 'module:<MODULE>' 'parameter-name' logicalId="TheirParameter"}}

The particle path can match the base name of the file or the base name
plus any extensions.

#### partials

Contents of files here will be loaded as partials that can be used in
`assets` and `cftemplates`.

These files will not be packaged or uploaded to S3.

Partials can be loaded with the `partial` helper:

    {{partial 'my-partial'}}

    {{partial 'module:<MODULE>' 'module-partial'}}

The particle path only needs to match the base name of the partial.

A path of `some_partial` would match `some_partial.json` or `some_partial.json.hbs`.

If the desired partial is not being loaded ensure precedence is given to an exact match.

#### resources

Contents of files will be loaded as resources that can be used in
in a traditional template or a `layout` (**recommended**)

Directory: `resources`
Helper: `resource`

    {{resource 'my-output' logicalId="MyResource"}}

    {{resource 'module:<MODULE>' 'resource-name' logicalId="TheirResource"}}

The particle path can match the base name of the file or the base name
plus any extensions.

#### sets

Intended for use with `layout`

A grouping of section definitions that will always be generated
together.  Most commonly used to generate parameters with corresponding
conditions.

Directory: `sets`
Helper: `set`

    {{set 'my-set' logicalId="MySet"}}

    {{set 'module:<MODULE>' 'set-name' logicalId="TheirSet"}}

The particle path can match the base name of the file or the base name
plus any extensions.

##### Scoping

Sets can be repeated multiple times in a template.  Sets can also be
embedded within other sets.  To help with namespacing a set can be
scoped with a `logicalIdPrefix` and/or a 'logicalIdSuffix`.  These
values will be apporperiately added to and logicalIds within the set.

To reference a logicalId within a scoped set use the `scopeId` and `ref`
handlebars helpers provided by condensation.

    {{!-- sets/my_set.hbs --}}
    {{parameter "cidr" logicalId="Cidr"}}
    {{resource "subnet" logicalId="Subnet" cidr=(ref "cidr")}}

    ---

    {{!-- cftemplates/my_template.template.json.hbs --}}

    {{set "my_set" logicalIdSuffix="1"}}
    {{set "my_set" logicalIdSuffix="2"}}

The definition above would produce two parameters, `Cidr1` and `Cidr2`, and
two resources, `Subnet1` and `Subnet2`.  Each subnet will reference
their respective Cidr parameter.

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
Will list all the configured s3 buckets and module corresponding ID.

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
Deploy templates to a specific S3 bucket.

#### condensation:deploy:LABEL
Deploy templates to all S3 buckets that contain the label, LABEL.

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

          // Prefix all objects (allows for multiple deployments to the same bucket
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

## Condensation Helpers

### ref

Build a reference to a logicalId.  By default `ref` will return a
logicalId in relation to it's scope adding any logicalIdPrefix and/or
logicalIdSuffix as necessary.  This can be turned off by setting `scope`
to `false`.

    {{ref 'MyParameter'}}
    {{ref 'MyParameter' scope=false}}

### scopeId

Return a logicalId based on it's current scope.  Will add any
logicalIdPrefix and/or logicalIdSuffix that is defined.

    {{scopeId 'MyParameter'}}

## Handlebars Helpers

Aside from the helpers to load particles, condensation provides the
following generic handlebars helpers.

### concat

Concatenate strings

    {{concat 'one' 'two'}}
    {{#parameter logicalId=(concat 'myPrefix' myStrVar)}}

## Front Matter

All `cftemplates` and `partials` are first processed with
[gray-matter](https://github.com/jonschlinkert/gray-matter) to load any
default data definitions.

## Errors

Errors due to badly formed JSON or failed CF validations will stop the
process and the offending files will be dumped to `condensation_errors`

## Experimental

### condensation.js

If a project contains `condensation.js` the file will be loaded as a
module and will attement to run the `initialize` function providing a
callback as the only parameter.

This can be used by particle project to bootstrap any necessary assets
before any template compiling begins.

Example:
[particles-cloudsploit-scans](https://github.com/SungardAS/particles-cloudsploit-scans)

## Acknowledgements

Big thank-you to [Brent Stees](https://github.com/bstees) for creating
the condensation logo!

## Sungard Availability Services | Labs
[![Sungard Availability Services | Labs][labs-logo]][labs-github-url]

This project is maintained by the Labs team at [Sungard Availability
Services](http://sungardas.com)

GitHub: [https://sungardas.github.io](https://sungardas.github.io)

Blog:
[http://blog.sungardas.com/CTOLabs/](http://blog.sungardas.com/CTOLabs/)


[labs-github-url]: https://sungardas.github.io
[labs-logo]: https://raw.githubusercontent.com/SungardAS/repo-assets/master/images/logos/sungardas-labs-logo-small.png
[condensation-image]: ./docs/images/condensation_logo.png?raw=true
[npm-image]: https://badge.fury.io/js/condensation.svg
[npm-url]: https://npmjs.org/package/condensation
[travis-image]:
https://travis-ci.org/SungardAS/condensation.svg?branch=master
[travis-url]: https://travis-ci.org/SungardAS/condensation
[daviddm-image]:
https://david-dm.org/SungardAS/condensation.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/SungardAS/condensation
[coveralls-image]:
https://coveralls.io/repos/SungardAS/condensation/badge.svg
[coveralls-url]:
https://coveralls.io/r/SungardAS/condensation
[codeclimate-image]:
https://codeclimate.com/github/SungardAS/condensation/badges/gpa.svg
[codeclimate-url]:
https://codeclimate.com/github/SungardAS/condensation
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]:
https://gitter.im/SungardAS/condensation?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
