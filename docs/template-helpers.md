<a name="TemplateHelpers"></a>

## TemplateHelpers
Condensation specific helpers for common tasks

**Kind**: global namespace  

* [TemplateHelpers](#TemplateHelpers) : <code>object</code>
    * [.arrayify(...str)](#TemplateHelpers.arrayify) ⇒ <code>String</code>
    * [.assetPath(path)](#TemplateHelpers.assetPath) ⇒ <code>String</code>
    * [.cValue(str, options)](#TemplateHelpers.cValue) ⇒ <code>string</code> \| <code>Number</code>
    * [.layout([options])](#TemplateHelpers.layout) ⇒ <code>string</code>
    * [.objectify([...options])](#TemplateHelpers.objectify) ⇒ <code>String</code>
    * [.requireAssets(globPath)](#TemplateHelpers.requireAssets) ⇒ <code>string</code>
    * [.scopeId()](#TemplateHelpers.scopeId) ⇒ <code>string</code>
    * [.templateUrl(path)](#TemplateHelpers.templateUrl) ⇒ <code>string</code>


* * *

<a name="TemplateHelpers.arrayify"></a>

### arrayify(...str)
Turn a string into a JSON parseable array.
Each value is processed with `cValue`

**Kind**: static method of [<code>TemplateHelpers</code>](#TemplateHelpers)  
**Returns**: <code>String</code> - - When parsed will be an array  

| Param | Type | Description |
| --- | --- | --- |
| ...str | <code>string</code> | String to use if block is not present |

**Example**  
```js
{{arrayify "string" (ref "Parameter1") }}
```
**Example**  
```js
{{arrayify (ref "Parameter1")}}
```

* * *

<a name="TemplateHelpers.assetPath"></a>

### assetPath(path)
Build the S3 path to an asset particle within the project

**Kind**: static method of [<code>TemplateHelpers</code>](#TemplateHelpers)  
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

* * *

<a name="TemplateHelpers.cValue"></a>

### cValue(str, options)
Coerce Value

Will check to see if a string is a parsable object. If it is,
then it will be left alone and simply returned back.

If the string is not a parseable object it will be made JSON compliant and returned.

If the string is empty, null, undefined or otherwise `falsey` then an empty string will be returned.

**Kind**: static method of [<code>TemplateHelpers</code>](#TemplateHelpers)  
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

* * *

<a name="TemplateHelpers.layout"></a>

### layout([options])
Start a layout

**Kind**: static method of [<code>TemplateHelpers</code>](#TemplateHelpers)  
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

* * *

<a name="TemplateHelpers.objectify"></a>

### objectify([...options])
Return options as a stringified object

**Kind**: static method of [<code>TemplateHelpers</code>](#TemplateHelpers)  
**Returns**: <code>String</code> - - When parsed will be an object  

| Param | Type | Description |
| --- | --- | --- |
| [...options] | <code>kv</code> | Key/Value pairs to pass to the particle helper |

**Example**  
```js
{{objectify Param1="Value1" Param2=(ref "AWS::Region")}}
```

* * *

<a name="TemplateHelpers.requireAssets"></a>

### requireAssets(globPath)
Include a glob of assets

Only needed for assets that are not directly referenced by another particle

**Kind**: static method of [<code>TemplateHelpers</code>](#TemplateHelpers)  

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

* * *

<a name="TemplateHelpers.scopeId"></a>

### scopeId()
Used within sets to add the correct logicalIdPrefix and/or logicalIdSuffix to a logicalId

**Kind**: static method of [<code>TemplateHelpers</code>](#TemplateHelpers)  
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

* * *

<a name="TemplateHelpers.templateUrl"></a>

### templateUrl(path)
Generate an S3 URL for another template in the project

**Kind**: static method of [<code>TemplateHelpers</code>](#TemplateHelpers)  

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

* * *

