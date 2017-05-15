var jsdoc2md = require("jsdoc-to-markdown");
var fs = require("fs");
var path = require("path");

jsdoc2md.render({
  files: ['lib/condensation/template-helpers/functions/*.js'],
  partial: [
    path.join(__dirname,"..","jsdoc2md","templates","sig-name.hbs")
  ],
  separators: true,
  "name-format": false,
  "global-index-format": "none",
  "module-index-format": "none"
}).then(function(doc) {
  fs.writeFile(path.join(__dirname,"..","docs","intrinsic-functions.md"),doc,function(err) {
    if (err) console.warn(err);
    //done
  });
});

jsdoc2md.render({
  files: [
    'lib/condensation/template-helpers/sections/*.js',
    'lib/condensation/template-helpers/helper.js',
    'lib/condensation/template-helpers/partial.js',
    'lib/condensation/template-helpers/set.js'
  ],
  partial: [
    path.join(__dirname,"..","jsdoc2md","templates","sig-name.hbs")
  ],
  separators: true,
  "name-format": false,
  "global-index-format": "none",
  "module-index-format": "none"
}).then(function(doc) {
  fs.writeFile(path.join(__dirname,"..","docs","particle-helpers.md"),doc,function(err) {
    //done
  });
});

jsdoc2md.render({
  files: [
    'lib/condensation/template-helpers/index.js',
    'lib/condensation/template-helpers/arrayify.js',
    'lib/condensation/template-helpers/assetPath.js',
    'lib/condensation/template-helpers/cValue.js',
    'lib/condensation/template-helpers/layout.js',
    'lib/condensation/template-helpers/objectify.js',
    'lib/condensation/template-helpers/requireAssets.js',
    'lib/condensation/template-helpers/scopeId.js',
    'lib/condensation/template-helpers/templateS3Url.js'
  ],
  partial: [
    path.join(__dirname,"..","jsdoc2md","templates","sig-name.hbs")
  ],
  separators: true,
  "name-format": false,
  "global-index-format": "none",
  "module-index-format": "none"
}).then(function(doc) {
  fs.writeFile(path.join(__dirname,"..","docs","template-helpers.md"),doc,function(err) {
    if (err) console.warn(err);
    //done
  });
});

jsdoc2md.render({
  files: [
    'lib/handlebars-helpers/*'
  ],
  partial: [
    path.join(__dirname,"..","jsdoc2md","templates","sig-name.hbs")
  ],
  separators: true,
  "name-format": false,
  "global-index-format": "none",
  "module-index-format": "none"
}).then(function(doc) {
  fs.writeFile(path.join(__dirname,"..","docs","handlebars-helpers.md"),doc,function(err) {
    if (err) console.warn(err);
    //done
  });
});
