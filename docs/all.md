
> condensation@0.6.0-rc0 build-docs /Users/kevin.mcgrath/work/condensation
> node ./bin/buildDocs.js

## Modules

<dl>
<dt><a href="#TemplateHelpers.module_assetPath">assetPath</a> ⇒ <code>String</code></dt>
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
<dt><a href="#TemplateHelpers.Functions.module_fnAnd">fnAnd</a> ⇒ <code>string</code></dt>
<dd><p>Fn::And definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_fnBase64">fnBase64</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Base64 definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_fnEquals">fnEquals</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Equals definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_fnFindInMap">fnFindInMap</a> ⇒ <code>string</code></dt>
<dd><p>Fn::FindInMap definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_fnGetAtt">fnGetAtt</a> ⇒ <code>string</code></dt>
<dd><p>Fn::GetAtt definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_fnGetAZs">fnGetAZs</a> ⇒ <code>string</code></dt>
<dd><p>Fn::GetAZs definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_fnIf">fnIf</a> ⇒ <code>string</code></dt>
<dd><p>Fn::If definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_fnImportValue">fnImportValue</a> ⇒ <code>string</code></dt>
<dd><p>Fn::ImportValue definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_fnJoin">fnJoin</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Join definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_fnNot">fnNot</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Not definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_fnOr">fnOr</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Or definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_fnSelect">fnSelect</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Select definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_fnSub">fnSub</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Sub definition</p>
</dd>
<dt><a href="#TemplateHelpers.Functions.module_ref">ref</a> ⇒ <code>String</code></dt>
<dd><p>Ref definition</p>
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
<dt><a href="#module_condition">condition</a></dt>
<dd><p>Creates a condition</p>
</dd>
<dt><a href="#Condensation.Sections.module_mapping">mapping</a> : <code>function</code></dt>
<dd><p>Mapping</p>
</dd>
<dt><a href="#TemplateHelpers.module_set">set</a> ⇒ <code>string</code></dt>
<dd><p>Include a set particle</p>
</dd>
<dt><a href="#module_templateUrl">templateUrl</a> ⇒ <code>string</code></dt>
<dd><p>Generate an S3 URL for another template in the project</p>
</dd>
<dt><a href="#module_concat">concat</a> ⇒ <code>String</code></dt>
<dd><p>Concatenates two or more strings</p>
</dd>
<dt><a href="#module_stringify">stringify</a> ⇒ <code>String</code></dt>
<dd><p>JSON.stringify a string or block</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Condensation">Condensation</a></dt>
<dd></dd>
</dl>

## Objects

<dl>
<dt><a href="#TemplateHelpers.Functions">TemplateHelpers.Functions</a> : <code>object</code></dt>
<dd><p>AWS Functions</p>
</dd>
<dt><a href="#sections">sections</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#genTaskNameFunc">genTaskNameFunc(options)</a> ⇒ <code><a href="#genTaskNameFunc..taskNameFunc">taskNameFunc</a></code></dt>
<dd><p>Generate a TaskNme based on condensation configuration</p>
</dd>
<dt><a href="#genDistPath">genDistPath(options)</a> ⇒ <code>String</code></dt>
<dd><p>Generates a distribution path</p>
</dd>
</dl>

<a name="TemplateHelpers.module_assetPath"></a>

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
<a name="TemplateHelpers.Functions.module_fnAnd"></a>

## fnAnd ⇒ <code>string</code>
Fn::And definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| ...condition | <code>string</code> | Any number of conditions |
| options | <code>Object</code> | options passed by handlebars |

<a name="TemplateHelpers.Functions.module_fnBase64"></a>

## fnBase64 ⇒ <code>string</code>
Fn::Base64 definition


| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string to evaluate |
| options | <code>Object</code> | Passed in by Handlebars |

<a name="TemplateHelpers.Functions.module_fnEquals"></a>

## fnEquals ⇒ <code>string</code>
Fn::Equals definition

**Returns**: <code>string</code> - A JSON compliant string for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| v1 | <code>string</code> | first value to compare |
| v2 | <code>string</code> | second value to compare |

<a name="TemplateHelpers.Functions.module_fnFindInMap"></a>

## fnFindInMap ⇒ <code>string</code>
Fn::FindInMap definition

**Returns**: <code>string</code> - A JSON compliant string for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| mapName | <code>string</code> | logicalId of the map in the template |
| topLevelKey | <code>string</code> | The top-level key name. Its value is a list of key-value pairs |
| secondLevelKey | <code>string</code> | The second-level key name, which is set to one of the keys from the list assigned to TopLevelKey |
| options | <code>Object</code> | options for creting the logicalId reference |

<a name="TemplateHelpers.Functions.module_fnGetAtt"></a>

## fnGetAtt ⇒ <code>string</code>
Fn::GetAtt definition

**Returns**: <code>string</code> - A JSON compliant string for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| logicalId | <code>string</code> | resource that contains the attribute you want |
| attributeName | <code>string</code> | name of the resource-specific attribute whose value you want |
| options | <code>Object</code> | options for creting the logicalId reference |

<a name="TemplateHelpers.Functions.module_fnGetAZs"></a>

## fnGetAZs ⇒ <code>string</code>
Fn::GetAZs definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| region | <code>string</code> | name of the region |
| options | <code>Object</code> | options passed by handlebars |

<a name="TemplateHelpers.Functions.module_fnIf"></a>

## fnIf ⇒ <code>string</code>
Fn::If definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| conditionName | <code>string</code> | Name of the condition to reference |
| trueValue | <code>string</code> | value to use if condition is true |
| falseValue | <code>string</code> | value to use if condition is false |
| options | <code>Object</code> | options passed by handlebars |

<a name="TemplateHelpers.Functions.module_fnImportValue"></a>

## fnImportValue ⇒ <code>string</code>
Fn::ImportValue definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| sharedValue | <code>string</code> | name of the shared value |
| options | <code>Object</code> | options passed by handlebars |

<a name="TemplateHelpers.Functions.module_fnJoin"></a>

## fnJoin ⇒ <code>string</code>
Fn::Join definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| ...str | <code>string</code> | strings to join together |
| options | <code>Object</code> | options passed by handlebars |

<a name="TemplateHelpers.Functions.module_fnNot"></a>

## fnNot ⇒ <code>string</code>
Fn::Not definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

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
<a name="TemplateHelpers.Functions.module_fnOr"></a>

## fnOr ⇒ <code>string</code>
Fn::Or definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| ...condition | <code>string</code> | One to many conditions |
| options | <code>Object</code> | options passed by handlebars |

<a name="TemplateHelpers.Functions.module_fnSelect"></a>

## fnSelect ⇒ <code>string</code>
Fn::Select definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

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
<a name="TemplateHelpers.Functions.module_fnSub"></a>

## fnSub ⇒ <code>string</code>
Fn::Sub definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

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
<a name="TemplateHelpers.Functions.module_ref"></a>

## ref ⇒ <code>String</code>
Ref definition

**Returns**: <code>String</code> - A JSON compliant Ref object for CloudFormation  

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
<a name="module_condition"></a>

## condition
Creates a condition

<a name="Condensation.Sections.module_mapping"></a>

## mapping : <code>function</code>
Mapping

<a name="TemplateHelpers.module_set"></a>

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
<a name="module_concat"></a>

## concat ⇒ <code>String</code>
Concatenates two or more strings

**Returns**: <code>String</code> - - One concatenated string  

| Param | Type | Description |
| --- | --- | --- |
| ...string | <code>string</code> | two or more strings to concatenate |

**Example**  
```js
{{concat "string1" "string2"}}
```
<a name="module_stringify"></a>

## stringify ⇒ <code>String</code>
JSON.stringify a string or block

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
<a name="TemplateHelpers.Functions"></a>

## TemplateHelpers.Functions : <code>object</code>
AWS Functions

**Kind**: global namespace  
<a name="sections"></a>

## sections : <code>object</code>
**Kind**: global namespace  
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


