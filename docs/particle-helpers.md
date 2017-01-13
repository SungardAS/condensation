<a name="TemplateHelpers"></a>

## TemplateHelpers
**Kind**: global namespace  

-

<a name="ParticleHelpers"></a>

## ParticleHelpers
Particle Helpers load particles from their respective paths within the project.

```
- particles
|-- conditions
|-- mappings
|-- metadata
|-- outputs
|-- parameters
|-- partials
|-- resources
|-- sets
```

All helpers follow the same pattern

`{{<CONDENSATION-HELPER> [module:<MODULE>] '<PATH_TO_PARTICLE>' [OPTIONS...]}}`

When loading a particle from a module that starts with `particles-` the short form
can also be used, where <M> is the name of the module without `particles-`

`{{<CONDENSATION-HELPER> [m:<M>] '<PATH_TO_PARTICLE>' [OPTIONS...]}}`

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


-

<a name="ParticleHelpers.condition"></a>

### condition()
```
- particles
|- conditions
 |- particle_name
```

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
**Example**  
```js
{{condition "particle_name"}}
```
**Example**  
```js
{{condition "particle_name" foo="bar"}}
```
**Example**  
```js
{{condition "module:<MODULE>" 'particle_name'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{condition "m:<NAME>" "particle_name"}}
```

-

<a name="ParticleHelpers.mapping"></a>

### mapping()
```
- particles
|- mappings
 |- particle_name
```

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
**Example**  
```js
{{mapping "particle_name"}}
```
**Example**  
```js
{{mapping "particle_name" foo="bar"}}
```
**Example**  
```js
{{mapping "module:<MODULE>" 'particle_name'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{mapping "m:<NAME>" "particle_name"}}
```

-

<a name="ParticleHelpers.metadata"></a>

### metadata()
```
- particles
|- metadata
 |- particle_name
```

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
**Example**  
```js
{{metadata "particle_name"}}
```
**Example**  
```js
{{metadata "particle_name" foo="bar"}}
```
**Example**  
```js
{{metadata "module:<MODULE>" 'particle_name'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{metadata "m:<NAME>" "particle_name"}}
```

-

<a name="ParticleHelpers.output"></a>

### output()
```
- particles
|- outputs
 |- particle_name
```

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
**Example**  
```js
{{output "particle_name"}}
```
**Example**  
```js
{{output "particle_name" foo="bar"}}
```
**Example**  
```js
{{output "module:<MODULE>" 'particle_name'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{output "m:<NAME>" "particle_name"}}
```

-

<a name="ParticleHelpers.parameter"></a>

### parameter()
```
- particles
|- parameters
 |- particle_name
```

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
**Example**  
```js
{{parameter "particle_name"}}
```
**Example**  
```js
{{parameter "particle_name" foo="bar"}}
```
**Example**  
```js
{{parameter "module:<MODULE>" 'particle_name'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{parameter "m:<NAME>" "particle_name"}}
```

-

<a name="ParticleHelpers.resource"></a>

### resource()
```
- particles
|- resources
 |- particle_name
```

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
**Example**  
```js
{{resource "particle_name"}}
```
**Example**  
```js
{{resource "particle_name" foo="bar"}}
```
**Example**  
```js
{{resource "module:<MODULE>" 'particle_name'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{resource "m:<NAME>" "particle_name"}}
```

-

<a name="ParticleHelpers.helper"></a>

### helper(path, [...options])
```
- particles
|- helpers
 |- particle_name
```

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  
**Returns**: <code>\*</code> - - Will returns the output from the particle helper  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to the helper, excluding the `.js` extension |
| [...options] | <code>kv</code> | Key/Value pairs to pass to the particle helper |

**Example**  
```js
{{helper "particle_name"}}
```
**Example**  
```js
{{helper "particle_name" foo="bar"}}
```
**Example**  
```js
{{helper "module:<MODULE>" 'particle_name'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{helper "m:<NAME>" "particle_name"}}
```

-

<a name="ParticleHelpers.partial"></a>

### partial(path, [...options])
```
- particles
|- partials
 |- particle_name
```

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to the partial (file extensions optional) |
| [...options] | <code>kv</code> | Key/Value pairs to pass to the particle partial |

**Example**  
```js
{{partial "particle_name"}}
```
**Example**  
```js
{{partial "particle_name" foo="bar"}}
```
**Example**  
```js
{{partial "module:<MODULE>" 'particle_name'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{partial "m:<NAME>" "particle_name"}}
```

-

<a name="ParticleHelpers.set"></a>

### set(path, [options])
```
- particles
|- sets
 |- particle_name
```

**Kind**: static method of <code>[ParticleHelpers](#ParticleHelpers)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to the set (file extensions optional) |
| [options] | <code>Object</code> | options for the set |
| [options.logicalIdPrefix] | <code>string</code> | Add a prefix to the set's scope |
| [options.logicalIdSuffix] | <code>string</code> | Add a suffix to the set's scope |

**Example**  
```js
{{set "particle_name"}}
```
**Example**  
```js
{{set "particle_name" foo="bar"}}
```
**Example**  
```js
{{set "module:<MODULE>" 'particle_name'}}
```
**Example**  
```js
{{!-- to load modules with format `particles-NAME` --}}
{{set "m:<NAME>" "particle_name"}}
```

-

