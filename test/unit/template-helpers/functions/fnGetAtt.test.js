var assert = require("assert");
var fnGetAtt = require("../../../../lib/condensation/template-helpers/functions/fnGetAtt");

describe("helpers", function() {
  describe("fnGetAtt", function() {

    it("should build the function definition", function() {
      var result = fnGetAtt("LogicalId","AttributeName");
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::GetAtt": ["LogicalId", "AttributeName"]}
      )
    });

  })
});

