var assert = require("assert");
var fnGetParam = require("../../../../lib/condensation/template-helpers/functions/fnGetParam");

describe("helpers", function() {
  describe("fnGetParam", function() {

    it("should work with all strings", function() {
      var result = fnGetParam("ArtifactName","JSONFileName","KeyName");
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::GetParam": ["ArtifactName", "JSONFileName", "KeyName"]}
      )
    });

    it("should work with a ref", function() {
      var result = fnGetParam("ArtifactName",'{"Ref": "JSONFileName"}',"KeyName");
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::GetParam": ["ArtifactName", {"Ref": "JSONFileName"}, "KeyName"]}
      )
    });

  })
});

