
> condensation@0.6.0-rc0 build-docs /Users/kevin.mcgrath/work/condensation
> node ./bin/buildDocs.js

## Classes

* [Condensation](#Condensation)
    * [new Condensation(gulp, options, [dist], [root], [taskPrefix])](#new_Condensation_new)
    * [.condense()](#Condensation+condense)

## Objects

* [IntrinsicFunctions](#IntrinsicFunctions) : <code>object</code>
    * [.fnAnd(...condition, options)](#IntrinsicFunctions.fnAnd) ⇒ <code>module</code> &#124; <code>string</code>
    * [.fnBase64(str, options)](#IntrinsicFunctions.fnBase64) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnEquals(v1, v2)](#IntrinsicFunctions.fnEquals) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnFindInMap(mapName, topLevelKey, secondLevelKey, options)](#IntrinsicFunctions.fnFindInMap) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnGetAtt(logicalId, attributeName, options)](#IntrinsicFunctions.fnGetAtt) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnGetAZs(region, options)](#IntrinsicFunctions.fnGetAZs) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnIf(conditionName, trueValue, falseValue, options)](#IntrinsicFunctions.fnIf) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnImportValue(sharedValue, options)](#IntrinsicFunctions.fnImportValue) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnJoin(...str, options)](#IntrinsicFunctions.fnJoin) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnNot(condition, options)](#IntrinsicFunctions.fnNot) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnOr(...condition, options)](#IntrinsicFunctions.fnOr) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnSelect(index, options)](#IntrinsicFunctions.fnSelect) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnSub(str, options)](#IntrinsicFunctions.fnSub) ⇒ <code>function</code> &#124; <code>string</code>
    * [.ref(logicalId, options)](#IntrinsicFunctions.ref) ⇒ <code>function</code> &#124; <code>String</code>
* [TemplateHelpers](#TemplateHelpers) : <code>object</code>
    * [.assetPath(path)](#TemplateHelpers.assetPath) ⇒ <code>function</code> &#124; <code>String</code>
    * [.assetS3Url(path, options)](#TemplateHelpers.assetS3Url) ⇒ <code>String</code>
    * [.cValue(str, options)](#TemplateHelpers.cValue) ⇒ <code>String</code> &#124; <code>Number</code>
    * [.layout([options])](#TemplateHelpers.layout) ⇒ <code>string</code>
    * [.requireAssets(globPath)](#TemplateHelpers.requireAssets) ⇒ <code>string</code>
    * [.scopeId()](#TemplateHelpers.scopeId) ⇒ <code>string</code>
    * [.templateUrl(path)](#TemplateHelpers.templateUrl) ⇒ <code>string</code>
* [ParticleHelpers](#ParticleHelpers) : <code>object</code>
    * [.helper(path, [...options])](#ParticleHelpers.helper) ⇒ <code>\*</code>
    * [.partial(path, [...options])](#ParticleHelpers.partial) ⇒ <code>string</code>
    * [.condition()](#ParticleHelpers.condition)
    * [.mapping()](#ParticleHelpers.mapping)
    * [.metadata()](#ParticleHelpers.metadata)
    * [.output()](#ParticleHelpers.output)
    * [.parameter()](#ParticleHelpers.parameter)
    * [.resource()](#ParticleHelpers.resource)
    * [.set(path, [options])](#ParticleHelpers.set) ⇒ <code>string</code>
* [HandlebarsHelpers](#HandlebarsHelpers) : <code>object</code>
    * [.concat(...string)](#HandlebarsHelpers.concat) ⇒ <code>String</code>
    * [.stringify([string])](#HandlebarsHelpers.stringify) ⇒ <code>String</code>

## Functions

* [genTaskNameFunc(options)](#genTaskNameFunc) ⇒ <code>[taskNameFunc](#genTaskNameFunc..taskNameFunc)</code>
    * [~taskNameFunc(...str)](#genTaskNameFunc..taskNameFunc) ⇒ <code>string</code>
* [genDistPath(options)](#genDistPath) ⇒ <code>String</code>

<a name="Condensation"></a>

## Condensation
**Kind**: global class  

* [Condensation](#Condensation)
    * [new Condensation(gulp, options, [dist], [root], [taskPrefix])](#new_Condensation_new)
    * [.condense()](#Condensation+condense)

<a name="new_Condensation_new"></a>

### new Condensation(gulp, options, [dist], [root], [taskPrefix])
Condensation


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gulp | <code>Object</code> |  | Gulp object |
| options | <code>Object</code> |  | all options |
| options.s3 | <code>Array</code> |  | list of s3 buckets/paths |
| [dist] | <code>String</code> | <code>&quot;dist&quot;</code> | top level distribution path name |
| [root] | <code>String</code> | <code>&quot;./&quot;</code> | root of the condensation project |
| [taskPrefix] | <code>String</code> | <code>&quot;condensation&quot;</code> | A prefix to add to all task names |

<a name="Condensation+condense"></a>

### condensation.condense()
Condense the project

**Kind**: instance method of <code>[Condensation](#Condensation)</code>  
**this**: <code>[Condensation](#Condensation)</code>  
<a name="IntrinsicFunctions"></a>

## IntrinsicFunctions : <code>object</code>
Handlebars helpers that will create AWS Intrinsic Functions

**Kind**: global namespace  

* [IntrinsicFunctions](#IntrinsicFunctions) : <code>object</code>
    * [.fnAnd(...condition, options)](#IntrinsicFunctions.fnAnd) ⇒ <code>module</code> &#124; <code>string</code>
    * [.fnBase64(str, options)](#IntrinsicFunctions.fnBase64) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnEquals(v1, v2)](#IntrinsicFunctions.fnEquals) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnFindInMap(mapName, topLevelKey, secondLevelKey, options)](#IntrinsicFunctions.fnFindInMap) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnGetAtt(logicalId, attributeName, options)](#IntrinsicFunctions.fnGetAtt) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnGetAZs(region, options)](#IntrinsicFunctions.fnGetAZs) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnIf(conditionName, trueValue, falseValue, options)](#IntrinsicFunctions.fnIf) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnImportValue(sharedValue, options)](#IntrinsicFunctions.fnImportValue) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnJoin(...str, options)](#IntrinsicFunctions.fnJoin) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnNot(condition, options)](#IntrinsicFunctions.fnNot) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnOr(...condition, options)](#IntrinsicFunctions.fnOr) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnSelect(index, options)](#IntrinsicFunctions.fnSelect) ⇒ <code>function</code> &#124; <code>string</code>
    * [.fnSub(str, options)](#IntrinsicFunctions.fnSub) ⇒ <code>function</code> &#124; <code>string</code>
    * [.ref(logicalId, options)](#IntrinsicFunctions.ref) ⇒ <code>function</code> &#124; <code>String</code>

<a name="IntrinsicFunctions.fnAnd"></a>

### IntrinsicFunctions.fnAnd(...condition, options) ⇒ <code>module</code> &#124; <code>string</code>
Fn::And definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...condition | <code>string</code> | Any number of conditions |
| options | <code>Object</code> | options passed by handlebars |

<a name="IntrinsicFunctions.fnBase64"></a>

### IntrinsicFunctions.fnBase64(str, options) ⇒ <code>function</code> &#124; <code>string</code>
Fn::Base64 definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string to evaluate |
| options | <code>Object</code> | Passed in by Handlebars |

<a name="IntrinsicFunctions.fnEquals"></a>

### IntrinsicFunctions.fnEquals(v1, v2) ⇒ <code>function</code> &#124; <code>string</code>
Fn::Equals definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| v1 | <code>string</code> | first value to compare |
| v2 | <code>string</code> | second value to compare |

<a name="IntrinsicFunctions.fnFindInMap"></a>

### IntrinsicFunctions.fnFindInMap(mapName, topLevelKey, secondLevelKey, options) ⇒ <code>function</code> &#124; <code>string</code>
Fn::FindInMap definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| mapName | <code>string</code> | logicalId of the map in the template |
| topLevelKey | <code>string</code> | The top-level key name. Its value is a list of key-value pairs |
| secondLevelKey | <code>string</code> | The second-level key name, which is set to one of the keys from the list assigned to TopLevelKey |
| options | <code>Object</code> | options for creting the logicalId reference |

<a name="IntrinsicFunctions.fnGetAtt"></a>

### IntrinsicFunctions.fnGetAtt(logicalId, attributeName, options) ⇒ <code>function</code> &#124; <code>string</code>
Fn::GetAtt definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| logicalId | <code>string</code> | resource that contains the attribute you want |
| attributeName | <code>string</code> | name of the resource-specific attribute whose value you want |
| options | <code>Object</code> | options for creting the logicalId reference |

<a name="IntrinsicFunctions.fnGetAZs"></a>

### IntrinsicFunctions.fnGetAZs(region, options) ⇒ <code>function</code> &#124; <code>string</code>
Fn::GetAZs definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| region | <code>string</code> | name of the region |
| options | <code>Object</code> | options passed by handlebars |

<a name="IntrinsicFunctions.fnIf"></a>

### IntrinsicFunctions.fnIf(conditionName, trueValue, falseValue, options) ⇒ <code>function</code> &#124; <code>string</code>
Fn::If definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| conditionName | <code>string</code> | Name of the condition to reference |
| trueValue | <code>string</code> | value to use if condition is true |
| falseValue | <code>string</code> | value to use if condition is false |
| options | <code>Object</code> | options passed by handlebars |

<a name="IntrinsicFunctions.fnImportValue"></a>

### IntrinsicFunctions.fnImportValue(sharedValue, options) ⇒ <code>function</code> &#124; <code>string</code>
Fn::ImportValue definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| sharedValue | <code>string</code> | name of the shared value |
| options | <code>Object</code> | options passed by handlebars |

<a name="IntrinsicFunctions.fnJoin"></a>

### IntrinsicFunctions.fnJoin(...str, options) ⇒ <code>function</code> &#124; <code>string</code>
Fn::Join definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...str | <code>string</code> | strings to join together |
| options | <code>Object</code> | options passed by handlebars |

<a name="IntrinsicFunctions.fnNot"></a>

### IntrinsicFunctions.fnNot(condition, options) ⇒ <code>function</code> &#124; <code>string</code>
Fn::Not definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>string</code> | condition to evaluate |
| options | <code>Object</code> | options passed by handlebars |

**Example**  
```js
{{fnNot "Condition1"}}
```
**Example**  
```js
{{fnNot (fnEquals (ref "ParameterName") "value") }}
```
<a name="IntrinsicFunctions.fnOr"></a>

### IntrinsicFunctions.fnOr(...condition, options) ⇒ <code>function</code> &#124; <code>string</code>
Fn::Or definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...condition | <code>string</code> | One to many conditions |
| options | <code>Object</code> | options passed by handlebars |

<a name="IntrinsicFunctions.fnSelect"></a>

### IntrinsicFunctions.fnSelect(index, options) ⇒ <code>function</code> &#124; <code>string</code>
Fn::Select definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> | array member to pick |
| ... | <code>string</code> |  |
| options | <code>Object</code> | options passed by handlebars |

**Example**  
```js
{{fnSelect 0 (ref "ParameterList")}}
```
**Example**  
```js
{{fnSelect 0 "value1" "value2"}}
```
<a name="IntrinsicFunctions.fnSub"></a>

### IntrinsicFunctions.fnSub(str, options) ⇒ <code>function</code> &#124; <code>string</code>
Fn::Sub definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String with replacement variables defined |
| options | <code>Object</code> | options passed by handlebars |
| options.hash | <code>Object</code> | all named parameters will be used for the variableMap |

**Example**  
```js
{{fnSub "The current region is ${AWS::Region"}}
```
**Example**  
```js
{{fnSub "Use this URL ${Url}" Url=(partial "buildUrl") }}
```
<a name="IntrinsicFunctions.ref"></a>

### IntrinsicFunctions.ref(logicalId, options) ⇒ <code>function</code> &#124; <code>String</code>
Ref definition

**Kind**: static method of <code>[IntrinsicFunctions](#IntrinsicFunctions)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| logicalId | <code>string</code> |  | The logicalId to reference |
| options | <code>Object</code> |  | passed by handlebars |
| [options.hash] | <code>Object</code> |  | Named parameters used for ref options |
| [options.hash.scope] | <code>Boolean</code> | <code>true</code> | Whether to scope the logicalId or not |

**Example**  
```js
{{ref "Parameter1"}}
```
**Example**  
```js
{{ref "Parameter2" scope=false}}
```
<a name="TemplateHelpers"></a>

## TemplateHelpers : <code>object</code>
**Kind**: global namespace  

* [TemplateHelpers](#TemplateHelpers) : <code>object</code>
    * [.assetPath(path)](#TemplateHelpers.assetPath) ⇒ <code>function</code> &#124; <code>String</code>
    * [.assetS3Url(path, options)](#TemplateHelpers.assetS3Url) ⇒ <code>String</code>
    * [.cValue(str, options)](#TemplateHelpers.cValue) ⇒ <code>String</code> &#124; <code>Number</code>
    * [.layout([options])](#TemplateHelpers.layout) ⇒ <code>string</code>
    * [.requireAssets(globPath)](#TemplateHelpers.requireAssets) ⇒ <code>string</code>
    * [.scopeId()](#TemplateHelpers.scopeId) ⇒ <code>string</code>
    * [.templateUrl(path)](#TemplateHelpers.templateUrl) ⇒ <code>string</code>

<a name="TemplateHelpers.assetPath"></a>

### TemplateHelpers.assetPath(path) ⇒ <code>function</code> &#124; <code>String</code>
Build the S3 path to an asset particle within the project

**Kind**: static method of <code>[TemplateHelpers](#TemplateHelpers)</code>  

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
<a name="TemplateHelpers.assetS3Url"></a>

### TemplateHelpers.assetS3Url(path, options) ⇒ <code>String</code>
Build full S3 URL an asset particle within the project

**Kind**: static method of <code>[TemplateHelpers](#TemplateHelpers)</code>  
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
<a name="TemplateHelpers.cValue"></a>

### TemplateHelpers.cValue(str, options) ⇒ <code>String</code> &#124; <code>Number</code>
Coerce Value

Will check to see if a string is a parsable object. If it is,
then it will be left alone and simply returned back.

If the string is not a parseable object it will be made JSON compliant and returned.

If the string is empty, null, undefined or otherwise `falsey` then an empty string will be returned.

**Kind**: static method of <code>[TemplateHelpers](#TemplateHelpers)</code>  
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
<a name="TemplateHelpers.layout"></a>

### TemplateHelpers.layout([options]) ⇒ <code>string</code>
Start a layout

**Kind**: static method of <code>[TemplateHelpers](#TemplateHelpers)</code>  
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
<a name="TemplateHelpers.requireAssets"></a>

### TemplateHelpers.requireAssets(globPath) ⇒ <code>string</code>
Include a glob of assets

Only needed for assets that are not directly referenced by another particle

**Kind**: static method of <code>[TemplateHelpers](#TemplateHelpers)</code>  

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
<a name="TemplateHelpers.scopeId"></a>

### TemplateHelpers.scopeId() ⇒ <code>string</code>
Used within sets to add the correct logicalIdPrefix and/or logicalIdSuffix to a logicalId

**Kind**: static method of <code>[TemplateHelpers](#TemplateHelpers)</code>  
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
<a name="TemplateHelpers.templateUrl"></a>

### TemplateHelpers.templateUrl(path) ⇒ <code>string</code>
Generate an S3 URL for another template in the project

**Kind**: static method of <code>[TemplateHelpers](#TemplateHelpers)</code>  

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
<a name="ParticleHelpers"></a>

## ParticleHelpers : <code>object</code>
**Kind**: global namespace  

* [ParticleHelpers](#ParticleHelpers) : <code>object</code>
    * [.helper(path, [...options])](#ParticleHelpers.helper) ⇒ <code>\*</code>
    * [.partial(path, [...options])](#ParticleHelpers.partial) ⇒ <code>string</code>
    * [.condition()](#ParticleHelpers.condition)
    * [.mapping()](#ParticleHelpers.mapping)
    * [.metadata()](#ParticleHelpers.metadata)
    * [.output()](#ParticleHelpers.output)
    * [.parameter()](#ParticleHelpers.parameter)
    * [.resource()](#ParticleHelpers.resource)
    * [.set(path, [options])](#ParticleHelpers.set) ⇒ <code>string</code>

<a name="ParticleHelpers.helper"></a>

### ParticleHelpers.helper(path, [...options]) ⇒ <code>\*</code>
Run a helper particle

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
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
<a name="ParticleHelpers.partial"></a>

### ParticleHelpers.partial(path, [...options]) ⇒ <code>string</code>
Include a partial particle

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  

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
<a name="ParticleHelpers.condition"></a>

### ParticleHelpers.condition()
Creates a condition

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
<a name="ParticleHelpers.mapping"></a>

### ParticleHelpers.mapping()
Mapping

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
<a name="ParticleHelpers.metadata"></a>

### ParticleHelpers.metadata()
Metadata

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
<a name="ParticleHelpers.output"></a>

### ParticleHelpers.output()
Output

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
<a name="ParticleHelpers.parameter"></a>

### ParticleHelpers.parameter()
Parameter

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
<a name="ParticleHelpers.resource"></a>

### ParticleHelpers.resource()
Resource

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
<a name="ParticleHelpers.set"></a>

### ParticleHelpers.set(path, [options]) ⇒ <code>string</code>
Include a set particle

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  

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
<a name="HandlebarsHelpers"></a>

## HandlebarsHelpers : <code>object</code>
**Kind**: global namespace  

* [HandlebarsHelpers](#HandlebarsHelpers) : <code>object</code>
    * [.concat(...string)](#HandlebarsHelpers.concat) ⇒ <code>String</code>
    * [.stringify([string])](#HandlebarsHelpers.stringify) ⇒ <code>String</code>

<a name="HandlebarsHelpers.concat"></a>

### HandlebarsHelpers.concat(...string) ⇒ <code>String</code>
Concatenates two or more strings

**Kind**: static method of <code>[HandlebarsHelpers](#HandlebarsHelpers)</code>  
**Returns**: <code>String</code> - - One concatenated string  

| Param | Type | Description |
| --- | --- | --- |
| ...string | <code>string</code> | two or more strings to concatenate |

**Example**  
```js
{{concat "string1" "string2"}}
```
<a name="HandlebarsHelpers.stringify"></a>

### HandlebarsHelpers.stringify([string]) ⇒ <code>String</code>
JSON.stringify a string or block

**Kind**: static method of <code>[HandlebarsHelpers](#HandlebarsHelpers)</code>  
**Returns**: <code>String</code> - - JSON.stringify result of block or string  

| Param | Type | Description |
| --- | --- | --- |
| [string] | <code>string</code> | String to use if block is not present |

**Example**  
```js
{{stringify "a !string for {json} /end"}}
```
**Example**  
```js
{{#stringify}}
  mybash.sh -o option1
  continue.sh
{{/stringify}}
```
**Example**  
```js
{{#stringify noLineBreaks}}
  docker run
  -e VAR1=VAL1
  -e VAR2=VAL2
  my/image
{{/stringify}}
```
<a name="genTaskNameFunc"></a>

## genTaskNameFunc(options) ⇒ <code>[taskNameFunc](#genTaskNameFunc..taskNameFunc)</code>
Generate a TaskNme based on condensation configuration

**Kind**: global function  
**Returns**: <code>[taskNameFunc](#genTaskNameFunc..taskNameFunc)</code> - - Function that generates task names  
**this**: <code>[Condensation](#Condensation)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | All options |
| [options.separator] | <code>string</code> | <code>&quot;\&quot;:\&quot;&quot;</code> | The separator to use when joining the parts of the name |

<a name="genTaskNameFunc..taskNameFunc"></a>

### genTaskNameFunc~taskNameFunc(...str) ⇒ <code>string</code>
Make a task name

**Kind**: inner method of <code>[genTaskNameFunc](#genTaskNameFunc)</code>  
**Returns**: <code>string</code> - - The full task name  

| Param | Type | Description |
| --- | --- | --- |
| ...str | <code>string</code> | Parts of the task name that will be joined together |

<a name="genDistPath"></a>

## genDistPath(options) ⇒ <code>String</code>
Generates a distribution path

**Kind**: global function  
**Returns**: <code>String</code> - - The distribution path  
**this**: <code>[Condensation](#Condensation)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | All options |
| [options.root] | <code>string</code> | <code>&quot;\&quot;dist\&quot;&quot;</code> | The root distribution name |
| [options.s3prefix] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | Prefix to add to all s3 paths |
| options.id | <code>string</code> |  | The unique ID for this distribution |


