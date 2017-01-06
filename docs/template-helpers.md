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
<dt><a href="#module_layout">layout</a> ⇒ <code>string</code></dt>
<dd><p>Start a layout</p>
</dd>
<dt><a href="#module_partial">partial</a> ⇒ <code>string</code></dt>
<dd><p>Include a partial particle</p>
</dd>
<dt><a href="#module_requireAssets">requireAssets</a> ⇒ <code>string</code></dt>
<dd><p>Include a glob of assets</p>
<p>Only needed for assets that are not directly referenced by another particle</p>
</dd>
<dt><a href="#module_scopeId">scopeId</a> ⇒ <code>string</code></dt>
<dd><p>Used within sets to add the correct logicalIdPrefix and/or logicalIdSuffix to a logicalId</p>
</dd>
<dt><a href="#module_set">set</a> ⇒ <code>string</code></dt>
<dd><p>Include a set particle</p>
</dd>
<dt><a href="#module_templateUrl">templateUrl</a> ⇒ <code>string</code></dt>
<dd><p>Generate an S3 URL for another template in the project</p>
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
| [...options] | <code>kv</code> | Key/Value pairs to pass to the particle helper |

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

## layout ⇒ <code>string</code>
Start a layout

**Returns**: <code>string</code> - - CloudFormation Template  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options object from Handlebars |
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
<a name="module_partial"></a>

## partial ⇒ <code>string</code>
Include a partial particle


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to the partial (file extensions optional) |
| [...options] | <code>kv</code> | Key/Value pairs to pass to the particle partial |

**Example**  
```js
{{partial "my_partial"}}
```
**Example**  
```js
{{partial "my_partial" foo="bar"}}
```
**Example**  
```js
{{partial "module:<MODULE>" 'module_partial'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{partial "m:<NAME>" "module-partial"}}
```
<a name="module_requireAssets"></a>

## requireAssets ⇒ <code>string</code>
Include a glob of assets

Only needed for assets that are not directly referenced by another particle


| Param | Type | Description |
| --- | --- | --- |
| globPath | <code>string</code> | Glob patter of assets to package with the project |

**Example**  
```js
{{requireAssets "all_of_these/**"}}
```
**Example**  
```js
{{requireAssets "module:<MODULE>" 'all_from_module/**'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{requireAssets "m:<NAME>" "all_from_module/**"}}
```
<a name="module_scopeId"></a>

## scopeId ⇒ <code>string</code>
Used within sets to add the correct logicalIdPrefix and/or logicalIdSuffix to a logicalId

**Returns**: <code>string</code> - - The logical with the correct prefix and suffix for the current scope  

| Type | Description |
| --- | --- |
| <code>string</code> | The logicalId |

**Example**  
```js
{{scopeId "LogicalId"}}
```
**Example**  
```js
{{ref (scopeId "LogicalId")}}
```
<a name="module_set"></a>

## set ⇒ <code>string</code>
Include a set particle


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to the set (file extensions optional) |
| [options] | <code>Object</code> | options for the set |
| [options.logicalIdPrefix] | <code>string</code> | Add a prefix to the set's scope |
| [options.logicalIdSuffix] | <code>string</code> | Add a suffix to the set's scope |

**Example**  
```js
{{set "my_set"}}
```
**Example**  
```js
{{set "my_set" foo="bar"}}
```
**Example**  
```js
{{set "module:<MODULE>" 'module_set'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{set "m:<NAME>" "module_set"}}
{{set "m:<NAME>" "module_set" logicalIdPrefix="First"}}
{{set "m:<NAME>" "module_set" logicalIdPrefix="Second"}}
```
<a name="module_templateUrl"></a>

## templateUrl ⇒ <code>string</code>
Generate an S3 URL for another template in the project


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to the template (file extensions optional) |

**Example**  
```js
{{templateUrl "another.template.json"}}
```
**Example**  
```js
{{templateUrl "module:<MODULE>" 'another.template.json'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{set "m:<NAME>" "another.template.json"}}
```
