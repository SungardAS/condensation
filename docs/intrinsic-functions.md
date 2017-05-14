<a name="IntrinsicFunctions"></a>

## IntrinsicFunctions
Helpers that will create AWS Intrinsic Functions

**Kind**: global namespace  

* [IntrinsicFunctions](#IntrinsicFunctions) : <code>object</code>
    * [.fnAnd(...condition)](#IntrinsicFunctions.fnAnd) ⇒ <code>string</code>
    * [.fnBase64(str, options)](#IntrinsicFunctions.fnBase64) ⇒ <code>function</code> \| <code>string</code>
    * [.fnEquals(v1, v2)](#IntrinsicFunctions.fnEquals) ⇒ <code>function</code> \| <code>string</code>
    * [.fnFindInMap(mapName, topLevelKey, secondLevelKey, options)](#IntrinsicFunctions.fnFindInMap) ⇒ <code>function</code> \| <code>string</code>
    * [.fnGetArtifactAtt(artifactName, attributeName, options)](#IntrinsicFunctions.fnGetArtifactAtt) ⇒ <code>function</code> \| <code>string</code>
    * [.fnGetAtt(logicalId, attributeName, options)](#IntrinsicFunctions.fnGetAtt) ⇒ <code>function</code> \| <code>string</code>
    * [.fnGetAZs(region, options)](#IntrinsicFunctions.fnGetAZs) ⇒ <code>function</code> \| <code>string</code>
    * [.fnGetParam(artifactName, JSONFileName, keyName, options)](#IntrinsicFunctions.fnGetParam) ⇒ <code>function</code> \| <code>string</code>
    * [.fnIf(conditionName, trueValue, falseValue, options)](#IntrinsicFunctions.fnIf) ⇒ <code>function</code> \| <code>string</code>
    * [.fnImportValue(sharedValue, options)](#IntrinsicFunctions.fnImportValue) ⇒ <code>function</code> \| <code>string</code>
    * [.fnJoin(arr, options)](#IntrinsicFunctions.fnJoin) ⇒ <code>function</code> \| <code>string</code>
    * [.fnNot(condition, options)](#IntrinsicFunctions.fnNot) ⇒ <code>function</code> \| <code>string</code>
    * [.fnOr(...condition)](#IntrinsicFunctions.fnOr) ⇒ <code>function</code> \| <code>string</code>
    * [.fnSelect(index, ...str, options)](#IntrinsicFunctions.fnSelect) ⇒ <code>function</code> \| <code>string</code>
    * [.fnSplit(delimiter, str, options)](#IntrinsicFunctions.fnSplit) ⇒ <code>function</code> \| <code>string</code>
    * [.fnSub(str, options)](#IntrinsicFunctions.fnSub) ⇒ <code>function</code> \| <code>string</code>
    * [.ref(logicalId, options)](#IntrinsicFunctions.ref) ⇒ <code>function</code> \| <code>String</code>


* * *

<a name="IntrinsicFunctions.fnAnd"></a>

### fnAnd(...condition)
Fn::And definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| ...condition | <code>string</code> | Any number of conditions |


* * *

<a name="IntrinsicFunctions.fnBase64"></a>

### fnBase64(str, options)
Fn::Base64 definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string to evaluate |
| options | <code>Object</code> | Passed in by Handlebars |


* * *

<a name="IntrinsicFunctions.fnEquals"></a>

### fnEquals(v1, v2)
Fn::Equals definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| v1 | <code>string</code> | first value to compare |
| v2 | <code>string</code> | second value to compare |


* * *

<a name="IntrinsicFunctions.fnFindInMap"></a>

### fnFindInMap(mapName, topLevelKey, secondLevelKey, options)
Fn::FindInMap definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| mapName | <code>string</code> | logicalId of the map in the template |
| topLevelKey | <code>string</code> | The top-level key name. Its value is a list of key-value pairs |
| secondLevelKey | <code>string</code> | The second-level key name, which is set to one of the keys from the list assigned to TopLevelKey |
| options | <code>Object</code> | options for creting the logicalId reference |


* * *

<a name="IntrinsicFunctions.fnGetArtifactAtt"></a>

### fnGetArtifactAtt(artifactName, attributeName, options)
Fn::GetArtifactAtt definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| artifactName | <code>string</code> | The name of the input artifact. You must declare this artifact as input for the associated action. |
| attributeName | <code>string</code> | The name of the artifact attribute whose value you want to retrieve. For details about each artifact attribute, see the following Attributes section. |
| options | <code>Object</code> | options for creting the logicalId reference |


* * *

<a name="IntrinsicFunctions.fnGetAtt"></a>

### fnGetAtt(logicalId, attributeName, options)
Fn::GetAtt definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| logicalId | <code>string</code> | resource that contains the attribute you want |
| attributeName | <code>string</code> | name of the resource-specific attribute whose value you want |
| options | <code>Object</code> | options for creting the logicalId reference |


* * *

<a name="IntrinsicFunctions.fnGetAZs"></a>

### fnGetAZs(region, options)
Fn::GetAZs definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| region | <code>string</code> | name of the region |
| options | <code>Object</code> | options passed by handlebars |


* * *

<a name="IntrinsicFunctions.fnGetParam"></a>

### fnGetParam(artifactName, JSONFileName, keyName, options)
Fn::GetParam definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| artifactName | <code>string</code> | The name of the artifact, which must be included as an input artifact for the associated action |
| JSONFileName | <code>string</code> | The name of a JSON file that is contained in the artifact |
| keyName | <code>string</code> | The name of the key whose value you want to retrieve |
| options | <code>Object</code> | options for creting the logicalId reference |


* * *

<a name="IntrinsicFunctions.fnIf"></a>

### fnIf(conditionName, trueValue, falseValue, options)
Fn::If definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| conditionName | <code>string</code> | Name of the condition to reference |
| trueValue | <code>string</code> | value to use if condition is true |
| falseValue | <code>string</code> | value to use if condition is false |
| options | <code>Object</code> | options passed by handlebars |


* * *

<a name="IntrinsicFunctions.fnImportValue"></a>

### fnImportValue(sharedValue, options)
Fn::ImportValue definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| sharedValue | <code>string</code> | name of the shared value |
| options | <code>Object</code> | options passed by handlebars |


* * *

<a name="IntrinsicFunctions.fnJoin"></a>

### fnJoin(arr, options)
Fn::Join definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> \| <code>string</code> \| <code>string</code> | if one parameter, it will be used as the array.  If multiple, they will be joined to form the array. |
| options | <code>Object</code> | options passed by handlebars |

**Example**  
```js
{{fnJoin "," (ref "Parameter1") }}
```
**Example**  
```js
{{fnJoin "," (fnGetAZs (ref "AWS::Region")) }}
```
**Example**  
```js
{{fnJoin "," "one" (ref "Parameter") "three"}}
```

* * *

<a name="IntrinsicFunctions.fnNot"></a>

### fnNot(condition, options)
Fn::Not definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

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

* * *

<a name="IntrinsicFunctions.fnOr"></a>

### fnOr(...condition)
Fn::Or definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| ...condition | <code>string</code> | One to many conditions |


* * *

<a name="IntrinsicFunctions.fnSelect"></a>

### fnSelect(index, ...str, options)
Fn::Select definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> | array member to pick |
| ...str | <code>string</code> | strings to select from |
| options | <code>Object</code> | options passed by handlebars |

**Example**  
```js
{{fnSelect 0 (ref "ParameterList")}}
```
**Example**  
```js
{{fnSelect 0 "value1" "value2"}}
```

* * *

<a name="IntrinsicFunctions.fnSplit"></a>

### fnSplit(delimiter, str, options)
Fn::Split definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

| Param | Type | Description |
| --- | --- | --- |
| delimiter | <code>string</code> | A string value that determines where the source string is divided |
| str | <code>string</code> | A string |
| options | <code>Object</code> | options passed by handlebars |

**Example**  
```js
{{fnSplit ":" "split:me"}}
```

* * *

<a name="IntrinsicFunctions.fnSub"></a>

### fnSub(str, options)
Fn::Sub definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

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

* * *

<a name="IntrinsicFunctions.ref"></a>

### ref(logicalId, options)
Ref definition

**Kind**: static method of [<code>IntrinsicFunctions</code>](#IntrinsicFunctions)  

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

* * *

