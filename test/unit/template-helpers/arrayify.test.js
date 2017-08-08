var arrayify = require('../../../lib/condensation/template-helpers/arrayify'),
assert = require('assert');

describe('arrayify', function() {
  it('should accept two strings', function() {
    var string = arrayify('one','two',{});
    assert.equal(string,'["one","two"]');
  });

  it('should recgonize objects', function() {
    var string = arrayify('one','two','{"Ref":"Parameter1"}', {});
    assert.equal(string,'["one","two",{"Ref":"Parameter1"}]');
  });

  it('should return with a single string', function() {
    var string = arrayify('one',{});
    assert.equal(string,'["one"]');
  });

  it('should not double quote strings', function() {
    var string = arrayify('"one"',{});
    assert.equal(string,'["one"]');
  });


  it('should return an empty array if no strings are passed', function() {
    var string = arrayify({});
    assert.equal(string,'[]');
  });

});
