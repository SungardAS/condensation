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
```

You can also get started with [nodejs](docs/getting-started.md#nodejs)

## Use

[Particles](docs/particle-helpers.md)

[Template Helpers](docs/template-helpers.md)

[AWS Intrinsic Functions](docs/intrinsic-functions.md)

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
