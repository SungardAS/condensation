# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

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

[cpt-url]: https://github.com/SungardAS/condensation-particle-tests
