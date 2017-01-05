var assert = require("assert");
var fnNot = require("../../../../lib/condensation/template-helpers/functions/fnNot");

describe("helpers", function() {
  describe("fnNot", function() {

    it("accepts a condition", function() {
      var result = fnNot('{"Condition": "TestCondition"}', {});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Not": [{"Condition": "TestCondition"}]}
      )
    });

    it("accepts condition name as a string", function() {
      var result = fnNot("TestCondition", {});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Not": [{"Condition": "TestCondition"}]}
      )
    });

  })
});

