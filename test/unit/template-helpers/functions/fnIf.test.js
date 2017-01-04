var assert = require("assert");
var fnIf = require("../../../../lib/condensation/template-helpers/functions/fnIf");

describe("helpers", function() {
  describe("fnIf", function() {

    it("accepts strings", function() {
      var result = fnIf("ConditionName","TrueValue","FalseValue");
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::If": ["ConditionName", "TrueValue", "FalseValue"]}
      )
    });

    it("accepts a ref for the trueValue", function() {
      var result = fnIf("ConditionName", {"Ref": "TrueValue"}, "FalseValue");
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::If": ["ConditionName", {"Ref": "TrueValue"}, "FalseValue"]}
      )
    });

    it("accepts a ref for the falseValue", function() {
      var result = fnIf("ConditionName", {"Ref": "TrueValue"}, {"Ref": "AWS::NoValue"});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::If": ["ConditionName", {"Ref": "TrueValue"}, {"Ref": "AWS::NoValue"}]}
      )
    });

  })
});

