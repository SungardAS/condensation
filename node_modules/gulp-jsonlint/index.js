'use strict';

var mapStream = require('map-stream');
var gutil = require('gulp-util');
var c = gutil.colors;
var jsonlint = require('jsonlint');

var formatOutput = function (msg) {
    var output = {};

    if (msg) { output.message = msg; }

    output.success = msg ? false : true;

    return output;
};

var jsonLintPlugin = function (options) {
    // TODO: add support for jsonlint options
    options = options || {};

    return mapStream(function (file, cb) {
        var errorMessage = '';

        try {
            jsonlint.parse(String(file.contents));
        }
        catch (err) {
            errorMessage = err.message;
        }
        file.jsonlint = formatOutput(errorMessage);

        cb(null, file);
    });
};

var defaultReporter = function (file) {
    gutil.log(c.yellow('Error on file ') + c.magenta(file.path));
    gutil.log(c.red(file.jsonlint.message));
};

jsonLintPlugin.reporter = function (customReporter) {
    var reporter = defaultReporter;

    if (typeof customReporter === 'function') {
        reporter = customReporter;
    }

    return mapStream(function (file, cb) {
        if (file.jsonlint && !file.jsonlint.success) {
            reporter(file);
        }
        return cb(null, file);
    });
};

module.exports = jsonLintPlugin;
