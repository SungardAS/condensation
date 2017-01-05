## Modules

<dl>
<dt><a href="#module_assetPath">assetPath</a> ⇒ <code>String</code></dt>
<dd><p>Build the S3 path to an asset particle within the project</p>
</dd>
<dt><a href="#module_assetS3Url">assetS3Url</a> ⇒
<code>String</code></dt>
<dd><p>Build full S3 URL an asset particle within the project</p>
</dd>
<dt><a href="#module_cValue">cValue</a> ⇒ <code>String</code> |
<code>Number</code></dt>
<dd><p>Coerce Value</p>
<p>Will check to see if a string is a parsable object. If it is,
then it will be left alone and simply returned back.</p>
<p>If the string is not a parseable object it will be made JSON
compliant and returned.</p>
<p>If the string is empty, null, undefined or otherwise
<code>falsey</code> then an empty string will be returned.</p>
</dd>
</dl>

<a name="module_assetPath"></a>

## assetPath ⇒ <code>String</code>
Build the S3 path to an asset particle within the project

**Returns**: <code>String</code> - - S3 path to the asset  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the path to the particle relative to the
`assets` directory |

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
| path | <code>string</code> | the path to the particle relative to the
`assets` directory |
| options | <code>Object</code> | options used to generate the URL |
| options.protocol | <code>Object</code> | [s3|https] s3:// or https://
|

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

If the string is not a parseable object it will be made JSON compliant
and returned.

If the string is empty, null, undefined or otherwise `falsey` then an
empty string will be returned.


| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string to evaluate |
| options | <code>Object</code> | options object from Handlebars |
| options.hash | <code>Object</code> | options for parsing |
| options.hash.forceNumber | <code>boolean</code> | Force the return of
a number instead of a string |


