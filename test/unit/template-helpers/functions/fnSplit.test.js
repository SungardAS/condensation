var assert = require("assert");
var fnSplit = require("../../../../lib/condensation/template-helpers/functions/fnSplit");

describe("helpers", function() {
  describe("fnSplit", function() {

    it("accepts a delimiter and a string", function() {
      var result = fnSplit(":","split:me", {});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Split": [":", "split:me"]}
      )
    });

    it("accepts a delimiter and a ref", function() {
      var result = fnSplit(":", '{"Ref": "Parameter1"}',{});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Split": [":", {"Ref": "Parameter1"}]}
      )
    });

  })
});
