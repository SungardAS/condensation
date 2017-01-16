var concat = require('../../../lib/handlebars-helpers/concat'),
assert = require('assert');

describe('concat', function() {
  it('should concatenate strings', function() {
    var string = concat('one','two',{});
    assert.equal(string,'onetwo');
  });

  it('should concatenate strings with a separator', function() {
    var string = concat('one','two',{hash: {separator: "-"}});
    assert.equal(string,'one-two');
  });

  it('should return with a single string', function() {
    var string = concat('one',{});
    assert.equal(string,'one');
  });

  it('should return an empty string if no strings are passed', function() {
    var string = concat({});
    assert.equal(string,'');
  });

});
