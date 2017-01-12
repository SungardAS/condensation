## Modules

<dl>
<dt><a href="#module_fnAnd">fnAnd</a> ⇒ <code>string</code></dt>
<dd><p>Fn::And definition</p>
</dd>
<dt><a href="#module_fnBase64">fnBase64</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Base64 definition</p>
</dd>
<dt><a href="#module_fnEquals">fnEquals</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Equals definition</p>
</dd>
<dt><a href="#module_fnFindInMap">fnFindInMap</a> ⇒ <code>string</code></dt>
<dd><p>Fn::FindInMap definition</p>
</dd>
<dt><a href="#module_fnGetAZs">fnGetAZs</a> ⇒ <code>string</code></dt>
<dd><p>Fn::GetAZs definition</p>
</dd>
<dt><a href="#module_fnGetAtt">fnGetAtt</a> ⇒ <code>string</code></dt>
<dd><p>Fn::GetAtt definition</p>
</dd>
<dt><a href="#module_fnIf">fnIf</a> ⇒ <code>string</code></dt>
<dd><p>Fn::If definition</p>
</dd>
<dt><a href="#module_fnImportValue">fnImportValue</a> ⇒ <code>string</code></dt>
<dd><p>Fn::ImportValue definition</p>
</dd>
<dt><a href="#module_fnJoin">fnJoin</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Join definition</p>
</dd>
<dt><a href="#module_fnNot">fnNot</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Not definition</p>
</dd>
<dt><a href="#module_fnOr">fnOr</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Or definition</p>
</dd>
<dt><a href="#module_fnSelect">fnSelect</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Select definition</p>
</dd>
<dt><a href="#module_fnSub">fnSub</a> ⇒ <code>string</code></dt>
<dd><p>Fn::Sub definition</p>
</dd>
<dt><a href="#module_ref">ref</a> ⇒ <code>String</code></dt>
<dd><p>Ref definition</p>
</dd>
</dl>

<a name="module_fnAnd"></a>

## fnAnd ⇒ <code>string</code>
Fn::And definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| ...condition | <code>string</code> | Any number of conditions |
| options | <code>Object</code> | options passed by handlebars |

<a name="module_fnBase64"></a>

## fnBase64 ⇒ <code>string</code>
Fn::Base64 definition


| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string to evaluate |
| options | <code>Object</code> | Passed in by Handlebars |

<a name="module_fnEquals"></a>

## fnEquals ⇒ <code>string</code>
Fn::Equals definition

**Returns**: <code>string</code> - A JSON compliant string for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| v1 | <code>string</code> | first value to compare |
| v2 | <code>string</code> | second value to compare |

<a name="module_fnFindInMap"></a>

## fnFindInMap ⇒ <code>string</code>
Fn::FindInMap definition

**Returns**: <code>string</code> - A JSON compliant string for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| mapName | <code>string</code> | logicalId of the map in the template |
| topLevelKey | <code>string</code> | The top-level key name. Its value is a list of key-value pairs |
| secondLevelKey | <code>string</code> | The second-level key name, which is set to one of the keys from the list assigned to TopLevelKey |
| options | <code>Object</code> | options for creting the logicalId reference |

<a name="module_fnGetAZs"></a>

## fnGetAZs ⇒ <code>string</code>
Fn::GetAZs definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| region | <code>string</code> | name of the region |
| options | <code>Object</code> | options passed by handlebars |

<a name="module_fnGetAtt"></a>

## fnGetAtt ⇒ <code>string</code>
Fn::GetAtt definition

**Returns**: <code>string</code> - A JSON compliant string for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| logicalId | <code>string</code> | resource that contains the attribute you want |
| attributeName | <code>string</code> | name of the resource-specific attribute whose value you want |
| options | <code>Object</code> | options for creting the logicalId reference |

<a name="module_fnIf"></a>

## fnIf ⇒ <code>string</code>
Fn::If definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| conditionName | <code>string</code> | Name of the condition to reference |
| trueValue | <code>string</code> | value to use if condition is true |
| falseValue | <code>string</code> | value to use if condition is false |
| options | <code>Object</code> | options passed by handlebars |

<a name="module_fnImportValue"></a>

## fnImportValue ⇒ <code>string</code>
Fn::ImportValue definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| sharedValue | <code>string</code> | name of the shared value |
| options | <code>Object</code> | options passed by handlebars |

<a name="module_fnJoin"></a>

## fnJoin ⇒ <code>string</code>
Fn::Join definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| ...str | <code>string</code> | strings to join together |
| options | <code>Object</code> | options passed by handlebars |

<a name="module_fnNot"></a>

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
<a name="module_fnOr"></a>

## fnOr ⇒ <code>string</code>
Fn::Or definition

**Returns**: <code>string</code> - A JSON compliant Ref object for CloudFormation  

| Param | Type | Description |
| --- | --- | --- |
| ...condition | <code>string</code> | One to many conditions |
| options | <code>Object</code> | options passed by handlebars |

<a name="module_fnSelect"></a>

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
<a name="module_fnSub"></a>

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
<a name="module_ref"></a>

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
