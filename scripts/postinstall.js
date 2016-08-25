var path = require("path");
var semver = require("semver");

var condensationDir = path.join(__dirname,"..");
var rimraf = require("rimraf");

/*
 * This is evil. But the warning produced by
 * these modules with node 6 are annoying and
 * distracting when running condensation on particle
 * projects. All the tests are passing with this "fix"
 *
 * Would love for gulp and vinyl-fs to update v3 to accomidate
 * this but I do not think that is going to happen.
 */

if (semver.gt(process.version,"4.0.0")) {
  rimraf.sync(path.join(condensationDir,"node_modules","s3","node_modules","graceful-fs"));
  rimraf.sync(path.join(condensationDir,"node_modules","vinyl-fs","node_modules","graceful-fs"));
  rimraf.sync(path.join(condensationDir,"node_modules","globule","node_modules","graceful-fs"));
}
