var through = require('through2');

module.exports = function() {
  return through.obj(function(file, enc, cb) {
    file._origPath = file.path;
    cb(null,file);
  });
};
