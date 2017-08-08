var assert = require("assert");
var fnEquals = require("../../../../lib/condensation/template-helpers/functions/fnEquals");

describe("helpers", function() {
  describe("fnEquals", function() {

    it("should accept two strings", function() {
      var result = fnEquals("a string","a string");
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Equals": ["a string", "a string"]}
      )
    });

    it("should accept a ref", function() {
      var result = fnEquals("a string",'{"Ref":"SomethingElse"}',{});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Equals": ["a string", {"Ref":"SomethingElse"}]}
      )
    });

  })
});

