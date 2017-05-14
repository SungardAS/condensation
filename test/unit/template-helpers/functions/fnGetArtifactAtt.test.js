var assert = require("assert");
var fnGetArtifactAtt = require("../../../../lib/condensation/template-helpers/functions/fnGetArtifactAtt");

describe("helpers", function() {
  describe("fnGetArtifactAtt", function() {

    it("should work with all strings", function() {
      var result = fnGetArtifactAtt("ArtifactName","AttributeName");
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::GetArtifactAtt": ["ArtifactName", "AttributeName"]}
      )
    });

    it("should work with a ref", function() {
      var result = fnGetArtifactAtt("ArtifactName",'{"Ref": "AttributeName"}');
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::GetArtifactAtt": ["ArtifactName", {"Ref": "AttributeName"}]}
      )
    });

  })
});

