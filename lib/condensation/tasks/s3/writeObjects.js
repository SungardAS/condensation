var gulp = require('gulp');
var path = require('path');

module.exports = function(s3opts,awsS3,distPath) {
  var stream = gulp.src("**",{cwd:distPath}).on("data",function(file) {
    if (file.stat.isFile()) {
      var newFilename = file.relative;

      if (s3opts.prefix) {

        newFilename = path.posix.join(s3opts.prefix,newFilename);

        // Ensure the path does not start with a '/'
        newFilename = newFilename.replace(/^\//,'');
      }

      awsS3.putObject({
        Bucket: s3opts.aws.bucket,
        ACL: "bucket-owner-full-control",
        //ACL: "private",
        Key: newFilename,
        Body: file.contents
      },function(err,response) {
        if (err) {
          // TODO throw error
          console.warn(err,response);
        }
      });
    }
  });
  return stream;
};
