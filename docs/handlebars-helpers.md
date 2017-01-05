## stringify([string]) ⇒ <code>String</code>
JSON.stringify a string or block

**Kind**: global function  
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

