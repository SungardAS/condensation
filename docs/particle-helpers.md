<a name="ParticleHelpers"></a>

## ParticleHelpers
**Kind**: global namespace  

* [ParticleHelpers](#ParticleHelpers) : <code>object</code>
    * [.condition()](#ParticleHelpers.condition)
    * [.mapping()](#ParticleHelpers.mapping)
    * [.metadata()](#ParticleHelpers.metadata)
    * [.output()](#ParticleHelpers.output)
    * [.parameter()](#ParticleHelpers.parameter)
    * [.resource()](#ParticleHelpers.resource)
    * [.helper(path, [...options])](#ParticleHelpers.helper) ⇒ <code>\*</code>
    * [.partial(path, [...options])](#ParticleHelpers.partial) ⇒ <code>string</code>
    * [.set(path, [options])](#ParticleHelpers.set) ⇒ <code>string</code>

<a name="ParticleHelpers.condition"></a>

### condition()
Creates a condition

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
<a name="ParticleHelpers.mapping"></a>

### mapping()
Mapping

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
<a name="ParticleHelpers.metadata"></a>

### metadata()
Metadata

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
<a name="ParticleHelpers.output"></a>

### output()
Output

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
<a name="ParticleHelpers.parameter"></a>

### parameter()
Parameter

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
<a name="ParticleHelpers.resource"></a>

### resource()
Resource

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
<a name="ParticleHelpers.helper"></a>

### helper(path, [...options])
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

### partial(path, [...options])
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
<a name="ParticleHelpers.set"></a>

### set(path, [options])
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
