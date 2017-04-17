# condensation

[![Join the chat at https://gitter.im/SungardAS/condensation](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/SungardAS/condensation?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Package, reuse and share particles for CloudFormation projects

![condensation][condensation-image]

[![NPM][npm-image]][npm-url]
[![Gitter][gitter-image]][gitter-url]
[![Build Status][travis-image]][travis-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependency Status][daviddm-image]][daviddm-url]


## Summary

Condensation provides a framework for building and sharing `particles`
that when packaged together create [AWS CloudFormation](http://aws.amazon.com/cloudformation/)
projects.

Projects are uploaded to S3 and include templates, static assets and/or lambda functions.

Check out all of Condensation's [features](docs/features.md) and see it
in action on [YouTube](https://youtu.be/Vj0dRI9qiMM?list=PLYGffQg665R7PtM0XdPEQuJ0ez5j2G0LW).

## Quick Start

Get started fast with [condensation-docker][condensation-docker-url]

```
$ alias condensation="docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN -v \"$HOME\"/.aws/credentials:/home/condensation/.aws/credentials -v \`pwd\`:/particles --rm -it sungardas/condensation"

$ condensation create project particles-MYPROJECT
$ cd particles-MYPROJECT
$ condensation run build

# Upload to S3
$ condensation run deploy
```

You can also get started with [nodejs](docs/getting-started.md#nodejs)

Next become familiar with all of Condensation's [tasks](docs/tasks.md)


## Use

[Particles](docs/particle-helpers.md)

[Template Helpers](docs/template-helpers.md)

[Handlebars Helpers](docs/handlebars-helpers.md)

[AWS Intrinsic Functions](docs/intrinsic-functions.md)

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
are able to load [particles](docs/particle-helpers.md) from the local project
or from any condensation compatible module added as a npm
dependency.

### Processing Templates

Condensation will process any template that ends with `.hbs`
```
- particles
|- cftemplates
 |- network.template.json.hbs
```

This allows static templates to be deployed alongside compiled templates

### layout support

Instead of including particles within a traditional CloudFormation
template use a [layout](docs/template-helpers.md#TemplateHelpers.layout)
to include particles in any order you wish.  They will be added to correct
template section during the condensation build process.

### Lazy Loading

Particles will only be included in the final distribution if they are
referenced in a `hbs` file.


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


##Front Matter

All particles are first processed with
[gray-matter](https://github.com/jonschlinkert/gray-matter) to load any
default data definitions.

## Errors

Errors due to badly formed JSON or failed CF validations will stop the
process and the offending files will be dumped to `condensation_errors`

## Experimental

### condensation.js

If a project contains `condensation.js` the file will be loaded as a
module and will attement to run the `initialize` function.  If
`initialize` accepts a single argument then only a callback will be
provided.  If `initialize` accepts two arguments the project
configuration will be passed as the first argument and the callback as
the second.

This can be used by a condensation project to bootstrap assets and configuration
before template compiling begins.

Example:
[particles-cloudsploit-scans](https://github.com/SungardAS/particles-cloudsploit-scans)


## License

Apache-2.0 ©

## Maintained By

[![Sungard Availability Services | Labs][labs-logo]][labs-github-url]

This project is maintained by the Labs team at [Sungard Availability
Services](http://sungardas.com)

GitHub: [https://sungardas.github.io](https://sungardas.github.io)

Blog: [http://blog.sungardas.com/CTOLabs/](http://blog.sungardas.com/CTOLabs/)


[codeclimate-image]: https://codeclimate.com/github/SungardAS/condensation/badges/gpa.svg
[codeclimate-url]: https://codeclimate.com/github/SungardAS/condensation
[condensation-image]: ./docs/images/condensation_logo.png?raw=true
[coveralls-image]: https://coveralls.io/repos/SungardAS/condensation/badge.svg
[coveralls-url]: https://coveralls.io/r/SungardAS/condensation
[condensation-docker-url]: https://github.com/SungardAS/condensation-docker
[daviddm-image]: https://david-dm.org/SungardAS/condensation.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/SungardAS/condensation
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/SungardAS/condensation?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
[labs-github-url]: https://sungardas.github.io
[labs-logo]: https://raw.githubusercontent.com/SungardAS/repo-assets/master/images/logos/sungardas-labs-logo-small.png
[npm-image]: https://badge.fury.io/js/condensation.svg
[npm-url]: https://npmjs.org/package/condensation
[travis-image]: https://travis-ci.org/SungardAS/condensation.svg?branch=master
[travis-url]: https://travis-ci.org/SungardAS/condensation
