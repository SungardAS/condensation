## Modules

<dl>
<dt><a href="#module_assetPath">assetPath</a> ⇒ <code>String</code></dt>
<dd><p>Build the S3 path to an asset particle within the project</p>
</dd>
<dt><a href="#module_assetS3Url">assetS3Url</a> ⇒ <code>String</code></dt>
<dd><p>Build full S3 URL an asset particle within the project</p>
</dd>
<dt><a href="#module_cValue">cValue</a> ⇒ <code>String</code> | <code>Number</code></dt>
<dd><p>Coerce Value</p>
<p>Will check to see if a string is a parsable object. If it is,
then it will be left alone and simply returned back.</p>
<p>If the string is not a parseable object it will be made JSON compliant and returned.</p>
<p>If the string is empty, null, undefined or otherwise <code>falsey</code> then an empty string will be returned.</p>
</dd>
<dt><a href="#module_helper">helper</a> ⇒ <code>*</code></dt>
<dd><p>Run a helper particle</p>
</dd>
<dt><a href="#module_layout">layout</a> ⇒ <code>*</code></dt>
<dd><p>Start a layout</p>
</dd>
</dl>

<a name="module_assetPath"></a>

## assetPath ⇒ <code>String</code>
Build the S3 path to an asset particle within the project

**Returns**: <code>String</code> - - S3 path to the asset  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the path to the particle relative to the `assets` directory |

**Example**  
```js
{{assetPath "myasset.zip"}}
```
**Example**  
```js
{{assetPath "path/to/myasset.sh"}}
```
<a name="module_assetS3Url"></a>

## assetS3Url ⇒ <code>String</code>
Build full S3 URL an asset particle within the project

**Returns**: <code>String</code> - - Full S3 URL to the asset  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the path to the particle relative to the `assets` directory |
| options | <code>Object</code> | options used to generate the URL |
| options.protocol | <code>Object</code> | [s3|https] s3:// or https:// |

**Example**  
```js
{{assetS3Url "myasset.zip"}}
```
**Example**  
```js
{{assetS3Url "myasset.zip" protocol="s3"}}
```
**Example**  
```js
{{assetS3Url "path/to/myasset.sh"}}
```
<a name="module_cValue"></a>

## cValue ⇒ <code>String</code> &#124; <code>Number</code>
Coerce Value

Will check to see if a string is a parsable object. If it is,
then it will be left alone and simply returned back.

If the string is not a parseable object it will be made JSON compliant and returned.

If the string is empty, null, undefined or otherwise `falsey` then an empty string will be returned.

**Summary**: Coerce value  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string to evaluate |
| options | <code>Object</code> | options object from Handlebars |
| options.forceNumber | <code>boolean</code> | return a number at all costs |

**Example**  
```js
---
foo: bar
baz: {"Ref": "LogicalId"}
faz: "5"
---
{{cValue foo}}
{{cValue baz}}
{{cValue faz forceNumber=true}}
```
<a name="module_helper"></a>

## helper ⇒ <code>\*</code>
Run a helper particle

**Returns**: <code>\*</code> - - Will returns the output from the particle helper  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to the helper, excluding the `.js` extension |
| ...options | <code>kv</code> | Key/Value pairs to pass to the particle helper |

**Example**  
```js
{{helper "my-helper"}}
```
**Example**  
```js
{{helper "my-helper" foo="bar"}}
```
**Example**  
```js
{{helper "module:<MODULE>" 'module-helper'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{helper "m:<NAME>" "module-helper"}}
```
<a name="module_layout"></a>

## layout ⇒ <code>\*</code>
Start a layout

**Returns**: <code>\*</code> - - Will returns the output from the particle helper  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options object from Handlebars |
| [options.AWSTemplateFormatVersion] | <code>string</code> | <code>&quot;2010-09-09&quot;</code> | AWS Format Version |
| [options.TemplateDescription] | <code>string</code> |  | Description for the template |
| [options.Transform] | <code>string</code> |  | AWS Transform type for the template |

**Example**  
```js
---
things:
-
  name: subnet1
  cidr: "10.0.0.0/24"
-
  name subnet2
  cidr: "10.0.1.0/24"
---

{{#layout templateDescription="condensation rocks!"}}
  {{parameter 'my_parameter' logicalId="MyParameter"}}
  {{condition 'my_condition' logicalId="MyCondition"}}

  {{! helpers can occur in any order, allowing you to group related section parts together }}

  {{#each things}}
    {{parameter 'repeate_me' logicalId="RepeateMe" logicalIdSuffix=@index}}
    {{condition 'repeate_me' logicalId="RepeateMeCond" logicalIdSuffix=@index}}
    {{resource 'repeate_me' logicalId="RepeateMeResource" logicalIdSuffix=@index}}
    {{output 'repeate_me' logicalId="RepeateMeOutput" logicalIdSuffix=@index}}
  {{/each}}
{{/layout}} 
```

