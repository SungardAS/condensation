# Change Log
All notable changes to this project will be documented here in
accordance with [Keep a CHANGELOG][keep-changelog-url].
This project adheres to [Semantic Versioning][semver-url].

## [0.6.5] - [2017-02-12]
### Added
- front loaders - scripts that can run before a template is processed
- more descriptive errors for failed particles

### Fixed
- Layout compile error messages now report which template the error is
  in
- partials always return a string and not a safestring object
- fnSub will check for string before checking for first character

## [0.6.3] - [2017-01-18]
### Changed
- Impoved particle path load error

### Fixed
- ref helper should not scope psuedo variables that start with AWS::

## [0.6.2] - 2017-01-17
### Changed
- Only clean the S3 bucket if the build passes

## [0.6.1] - 2017-01-17
### Added
- fnSplit helper

## [0.6.0] - 2017-01-16
### Added
- Helpers for all CloudFormation Functions fnAnd, fnBase64, fnEquals,
  fnFindInMap, fnGetAtt, FnGetAZs, fnIf, fnImportValue, fnJoin, fnOr,
  fnSelect, fnSub, ref

- New template helpers arrayify and cValue

- New handlebars helper stringify

### Changed
- Error handling now uses VError

- Documention is now converted from jsdoc to markdown with jsdoc2md

## [0.5.9] - 2016-12-28
### Fixed
- Bug where logicalIdPrefix would not work correctly with sets that
  extended other sets

### Added
- If a `condensation.js` file accepts 2 arguments the first will be a
  configuration object for Condensation and the second will be a
  callback. For `condensation.js` files that accept one argument only
  the callback will be provided.

- Helper particles will receive the global handlebars object as part of
  hOpts so that they can access other helpers and particles.


## [0.5.8] - 2016-12-14
### Added
- Support **Transform** in layout

## [0.5.7] - 2016-11-16
### Fixed
- stop partials being read with an extra newline

### Changed
- graceful-fs hack removed with dependency upgrade

## [0.5.6] - 2016-08-25
### Fixed
- warnings about graceful-fs on node 6

### Updated
- package.json with latest dependencies
- documentation with docker-condensation use

## [0.5.5] - 2016-05-12
### Fixed
- output when errors bubble up in `_buildHelper`

## [0.5.4] - 2016-05-06
### Fixed
- The particle loader should ignore directories when using glob to find
  particles
- `_templatePath` should be the full relative path

## [0.5.3] - 2016-05-04
### Added
- The template being compiled is now recorded in the Handlebars data
  object as `_templatePath`
- s3:list now includes the prefix path

### Changed
- npm releases will now happen with node 6

### Fixed
- If a prefix starts with a `/` ensure `//` does not occur when
  written to S3

## [0.5.2] - 2016-04-30
### Fixed
- `ref` helper needs to look in options.hash to follow handlebars
  standards

## [0.5.1] - 2016-04-29
### Added
- `ref` helper
- `scopeId` helper
- `scope` can be set to true or false which will add or ignore logicalId
  prefix and suffix respectively.

### Fixed
- doValidation in build.js will now validate correctly
- tests will now validate if AWS Credentials are available
- condensation helpers use the same parameter format as handlebars helpers

## [0.5.0] - 2016-04-21
### Added
- Short module reference syntax. Use `m` instead of `module` to
  reference a particle module.  When `m` is used `particles-` will
  automatically be added to the name.
  
  To reference particles in `particles-core` use `m:core` or
  `module:particles-core`

- Better reporting for particle compile errors

- Overhaul of the test suite. Now uses
  [condensation-particle-tests][cpt-url] to test individual particles.

- Expose all helpers through class object. Used by
  [condensation-particle-tests][cpt-url]

### Changed
- The constructor no longer calls `condense`. The function must be
  called after initializing the class.
- Dependencies updated to latest versions

### Fixed
- When a template has invalid JSON the correct error is reported and the
  file is dumped to `condensation_errors`
- merge order in partials and sets

### Removed
- jsonlint - was not adding value.  Will look for better lint-er

## [0.4.12] - 2016-04-13
### Fixed
- turn off HTML escaping at the highest level
- merge order of Front Matter with extended templates

[keep-changelog-url]: http://keepachangelog.com/
[cpt-url]: https://github.com/SungardAS/condensation-particle-tests
[semver-url]: http://semver.org
