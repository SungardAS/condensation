<a name="HandlebarsHelpers"></a>

## HandlebarsHelpers
Generic helpers that work with any handlebars project

**Kind**: global namespace  

* [HandlebarsHelpers](#HandlebarsHelpers) : <code>object</code>
    * [.concat(...string, options)](#HandlebarsHelpers.concat) ⇒ <code>String</code>
    * [.stringify([string])](#HandlebarsHelpers.stringify) ⇒ <code>String</code>


-

<a name="HandlebarsHelpers.concat"></a>

### concat(...string, options)
Concatenates two or more strings

**Kind**: static method of <code>[HandlebarsHelpers](#HandlebarsHelpers)</code>  
**Returns**: <code>String</code> - - One concatenated string  

| Param | Type | Description |
| --- | --- | --- |
| ...string | <code>string</code> | two or more strings to concatenate |
| options | <code>Object</code> | passed by handlebars |
| options.hash | <code>Object</code> | named key/value pairs |
| options.hash.separator | <code>string</code> | string to separate each value |

**Example**  
```js
{{concat "string1" "string2"}}
```
**Example**  
```js
{{concat "string1" "string2" separator="-"}}
```

-

<a name="HandlebarsHelpers.stringify"></a>

### stringify([string])
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

-

