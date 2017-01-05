## Modules

<dl>
<dt><a href="#module_concat">concat</a> ⇒ <code>String</code></dt>
<dd><p>Concatenates two or more strings</p>
</dd>
<dt><a href="#module_stringify">stringify</a> ⇒ <code>String</code></dt>
<dd><p>JSON.stringify a string or block</p>
</dd>
</dl>

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

**Returns**: <code>String</code> - - JSON.stringify result of block or
string  

| Param | Type | Description |
| --- | --- | --- |
| [string] | <code>string</code> | String to use if block is not present
|

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
