import s3 = require('@aws-cdk/aws-s3');
import iam = require('@aws-cdk/aws-iam');
import cdk = require('@aws-cdk/cdk');

export class BuildStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const user = new iam.User(this, 'uploader');
    
    const bucket = new s3.Bucket(this, 'BuildBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    });    
    bucket.grantPut(user)

    const accessKey = new iam.CfnAccessKey(this, 'myAccessKey', {
      userName: user.userName,
    });
    
    new cdk.Output(this, 'accessKeyId', { value: accessKey.accessKeyId });
    new cdk.Output(this, 'secretAccessKey', { value: accessKey.accessKeySecretAccessKey });
    new cdk.Output(this, 'bucket', { value: bucket.bucketName });
  }
}