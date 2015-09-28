var s3 = require('s3');

module.exports = function(s3opts,awsS3,cb) {
  var client = s3.createClient({
    s3Options: {
      region: s3opts.aws.region
    }
  });

  var deleteDir = client.deleteDir({
    Bucket: s3opts.aws.bucket,
    Prefix: s3opts.prefix
  });
  deleteDir.on('error',cb);
  deleteDir.on('end',cb);

};
