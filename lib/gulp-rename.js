var rename = require('gulp-rename'),
through = require('through2');

module.exports = function(opt) {
  console.log(arguments);
    var args = arguments;
    return through.obj(function(file, enc, cb) {
      console.log(file.path);
      file._origPath = file.path;
      cb(null,file);
    }).pipe(rename(opt));
};
