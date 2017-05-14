<a name="ParticleHelpers"></a>

## ParticleHelpers
Particle Helpers load particles from their respective paths within the project.

```
- particles
|-- conditions
|-- helpers
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
    * [.condition([module], path, [...options])](#ParticleHelpers.condition) ⇒ <code>string</code>
    * [.mapping([module], path, [...options])](#ParticleHelpers.mapping) ⇒ <code>string</code>
    * [.metadata([module], path, [...options])](#ParticleHelpers.metadata) ⇒ <code>string</code>
    * [.output([module], path, [...options])](#ParticleHelpers.output) ⇒ <code>string</code>
    * [.parameter([module], path, [...options])](#ParticleHelpers.parameter) ⇒ <code>string</code>
    * [.resource([module], path, [...options])](#ParticleHelpers.resource) ⇒ <code>string</code>
    * [.helper([module], path, [...options])](#ParticleHelpers.helper) ⇒ <code>\*</code>
    * [.partial([module], path, [...options])](#ParticleHelpers.partial) ⇒ <code>string</code>
    * [.set([module], path, [options])](#ParticleHelpers.set) ⇒ <code>string</code>


* * *

<a name="ParticleHelpers.condition"></a>

### condition([module], path, [...options])
```
- particles
|- conditions
 |- particle_name
```

**Kind**: static method of [<code>ParticleHelpers</code>](#ParticleHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| [module] | <code>string</code> | module to load with either `module:<MODULE>` or `m:<M>` |
| path | <code>string</code> | Path to the particle (file extensions optional) |
| [...options] | <code>kv</code> | Key/Value pairs to pass to the particle |

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

* * *

<a name="ParticleHelpers.mapping"></a>

### mapping([module], path, [...options])
```
- particles
|- mappings
 |- particle_name
```

**Kind**: static method of [<code>ParticleHelpers</code>](#ParticleHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| [module] | <code>string</code> | module to load with either `module:<MODULE>` or `m:<M>` |
| path | <code>string</code> | Path to the particle (file extensions optional) |
| [...options] | <code>kv</code> | Key/Value pairs to pass to the particle |

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

* * *

<a name="ParticleHelpers.metadata"></a>

### metadata([module], path, [...options])
```
- particles
|- metadata
 |- particle_name
```

**Kind**: static method of [<code>ParticleHelpers</code>](#ParticleHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| [module] | <code>string</code> | module to load with either `module:<MODULE>` or `m:<M>` |
| path | <code>string</code> | Path to the particle (file extensions optional) |
| [...options] | <code>kv</code> | Key/Value pairs to pass to the particle |

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

* * *

<a name="ParticleHelpers.output"></a>

### output([module], path, [...options])
```
- particles
|- outputs
 |- particle_name
```

**Kind**: static method of [<code>ParticleHelpers</code>](#ParticleHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| [module] | <code>string</code> | module to load with either `module:<MODULE>` or `m:<M>` |
| path | <code>string</code> | Path to the particle (file extensions optional) |
| [...options] | <code>kv</code> | Key/Value pairs to pass to the particle |

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

* * *

<a name="ParticleHelpers.parameter"></a>

### parameter([module], path, [...options])
```
- particles
|- parameters
 |- particle_name
```

**Kind**: static method of [<code>ParticleHelpers</code>](#ParticleHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| [module] | <code>string</code> | module to load with either `module:<MODULE>` or `m:<M>` |
| path | <code>string</code> | Path to the particle (file extensions optional) |
| [...options] | <code>kv</code> | Key/Value pairs to pass to the particle |

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

* * *

<a name="ParticleHelpers.resource"></a>

### resource([module], path, [...options])
```
- particles
|- resources
 |- particle_name
```

**Kind**: static method of [<code>ParticleHelpers</code>](#ParticleHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| [module] | <code>string</code> | module to load with either `module:<MODULE>` or `m:<M>` |
| path | <code>string</code> | Path to the particle (file extensions optional) |
| [...options] | <code>kv</code> | Key/Value pairs to pass to the particle |

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

* * *

<a name="ParticleHelpers.helper"></a>

### helper([module], path, [...options])
```
- particles
|- helpers
 |- particle_name
```

**Kind**: static method of [<code>ParticleHelpers</code>](#ParticleHelpers)  
**Returns**: <code>\*</code> - - The output from the particle helper  

| Param | Type | Description |
| --- | --- | --- |
| [module] | <code>string</code> | module to load with either `module:<MODULE>` or `m:<M>` |
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

* * *

<a name="ParticleHelpers.partial"></a>

### partial([module], path, [...options])
```
- particles
|- partials
 |- particle_name
```

**Kind**: static method of [<code>ParticleHelpers</code>](#ParticleHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| [module] | <code>string</code> | module to load with either `module:<MODULE>` or `m:<M>` |
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

* * *

<a name="ParticleHelpers.set"></a>

### set([module], path, [options])
```
- particles
|- sets
 |- particle_name
```

**Kind**: static method of [<code>ParticleHelpers</code>](#ParticleHelpers)  

| Param | Type | Description |
| --- | --- | --- |
| [module] | <code>string</code> | module to load with either `module:<MODULE>` or `m:<M>` |
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

* * *

