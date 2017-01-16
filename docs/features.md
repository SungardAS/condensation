## Features

* Write reusable CloudFormation snippets, called `particles` that can be used
  accross condensation projets
* Package templates and assets then upload full distributions to multiple buckets across
  regions with one command.
* Reference another template within the distribution with
  [AWS::CloudFormation::Stack](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-stack.html)
and the `templateS3Url` helper
* Upload scripts, configuration files and other assets alongside
  CloudFormation templates and reference them with asset helpers.

## Why?

CloudFormation templates are great for creating, updating and deleting
AWS resources.  Reusing parts of templates, referencing other
templates with `AWS::CloudFormation::Stack` and deploying cloud-init
scripts can be difficult to manage.

* Sections such as AMI [mappings](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/mappings-section-structure.html)
  are often re-used by many templates.  Particles provide a way to
  write the mapping once and reuse it in other templates by reference.
* It is common to set up resources, such as a VPC, with nearly
  identical attributes and structure for different applications and
  services.  Condensation allows that definition to become a independent
  stack that can be referenced by other templates that are part of the
  same distribution.
* When bootstrapping ec2 instances it is beneficial to have versioned scripts and configuration
  files deployed in the same bucket and path as the CloudFormation template
  they are associated with.
* When using `AWS::CloudFormation::Authentication` to download assets from
  S3 buckets all resources must be in the same region.  Condensation
  makes it easy to deploy the same templates and assets to multiple
  regions and ensure the referencing URLs are always pointing to the
  right place.

For example, templates in a distribution can reference one another based on the
bucket they are deployed to.

Example:

    "TemplateURL": "{{templateS3Url 'vpc.template' }}"
    ...
    "TemplateURL": "{{templateS3Url 'subnet.template' }}"

Output:

    "TemplateURL": "https://s3-us-west-1.amazonaws.com/<BUCKET>/cftemplates/vpc.template"
    ...
    "TemplateURL": "https://s3-us-west-1.amazonaws.com/<BUCKET>/cftemplates/subnet.template"

The Handlebars helper, `templateS3Url`, creates a URL that will always reference a template deployed within the same bucket.
