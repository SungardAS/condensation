module.exports = function(s3opts,awsS3,cb) {
  awsS3.headBucket({
    Bucket: s3opts.aws.bucket
  },function(err,response){
    if (err && err.code === 'NotFound' && s3opts.create) {
      awsS3.createBucket({
        Bucket: s3opts.aws.bucket
      },cb);
    }
    else {
      cb(null,response);
      //TODO Removed for cross account access.  Need to revisit s3 bucket permissions and correct fallback
      // cb(err,data);
    }
  });
};
