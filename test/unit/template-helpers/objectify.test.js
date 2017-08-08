var objectify = require('../../../lib/condensation/template-helpers/objectify'),
assert = require('assert');

describe('objectify', function() {

  it('should work with multiple parameters', function() {
    var string = objectify({hash:{Param1: "Value2", Param2: '{"Ref":"Parameter1"}'}});
    assert.deepEqual(JSON.parse(string),{"Param1": "Value2", "Param2": {"Ref":"Parameter1"}});
  });

});
