var assert = require("assert");
var fnSelect = require("../../../../lib/condensation/template-helpers/functions/fnSelect");

describe("helpers", function() {
  describe("fnSelect", function() {

    it("accepts two values", function() {
      var result = fnSelect(0, "Value1", "Value2", {});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Select": [0, ["Value1", "Value2"]]}
      )
    });

    it("accepts three values", function() {
      var result = fnSelect(1, "Value1", "Value2", "Value3", {});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Select": [1, ["Value1", "Value2", "Value3"]]}
      )
    });

    it("accepts a value that is a ref", function() {
      var result = fnSelect(2, "Value1", {"Ref": "Value2"}, "Value3", {});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Select": [2, ["Value1", {"Ref": "Value2"}, "Value3"]]}
      )
    });

  })
});
