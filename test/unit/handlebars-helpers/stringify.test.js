var stringify = require('../../../lib/handlebars-helpers/stringify'),
assert = require('assert');

describe('stringify', function() {
  it('should JSON.stringify a string', function() {
    var string = stringify('${/^"',{hash:{}});
    assert.equal(string,'"${/^\\""');
  });

});
