var assert = require("assert");
var fnJoin = require("../../../../lib/condensation/template-helpers/functions/fnJoin");

describe("helpers", function() {
  describe("fnJoin", function() {

    it("accepts two values", function() {
      var result = fnJoin(",", "Value1", "Value2", {});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Join": [",", ["Value1", "Value2"]]}
      )
    });

    it("accepts three values", function() {
      var result = fnJoin(",", "Value1", "Value2", "Value3", {});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Join": [",", ["Value1", "Value2", "Value3"]]}
      )
    });

    it("accepts a value that is a ref", function() {
      var result = fnJoin(",", "Value1", {"Ref": "Value2"}, "Value3", {});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Join": [",", ["Value1", {"Ref": "Value2"}, "Value3"]]}
      )
    });

  })
});

