# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [UNRELEASED]
### Added
- Short module reference syntax. Use `m` instead of `module` to
  reference a particle module.  When `m` is used `particles-` will
  automatically be added to the name.
  
  To reference particles in `particles-core` use `m:core` or
  `module:particles-core`

- Better reporting for particle compile errors

### Fixed
- When a template has invalid JSON the correct error is reported and the
  file is dumped to `condensation_errors`

## [0.4.12] - 2016-04-13
### Fixed
- turn off HTML escaping at the highest level
- merge order of Front Matter with extended templates
