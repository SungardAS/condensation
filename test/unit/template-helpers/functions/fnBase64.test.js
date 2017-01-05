var assert = require("assert");
var fnBase64 = require("../../../../lib/condensation/template-helpers/functions/fnBase64");

describe("helpers", function() {
  describe("fnBase64", function() {

    it("should accept a string", function() {
      var result = fnBase64("a string",{});
      assert.deepEqual(JSON.parse(result), {"Fn::Base64": "a string"})
    });

    it("should accept a ref", function() {
      var result = fnBase64('{"Ref": "SomethingElse"}',{});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Base64": {"Ref": "SomethingElse"}}
      )
    });

  })
});

