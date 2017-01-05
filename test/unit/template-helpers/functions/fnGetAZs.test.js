var assert = require("assert");
var fnGetAZs = require("../../../../lib/condensation/template-helpers/functions/fnGetAZs");

describe("helpers", function() {
  describe("fnGetAZs", function() {

    it("accept a region as a string", function() {
      var result = fnGetAZs("us-east-1");
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::GetAZs": "us-east-1"}
      )
    });

    it("accept the region psuedo parameter", function() {
      var result = fnGetAZs('{"Ref": "AWS::Region"}');
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::GetAZs": {
          "Ref": "AWS::Region"
        }}
      )
    });

  })
});

