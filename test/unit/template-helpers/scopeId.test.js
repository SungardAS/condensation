var assert = require("assert");
var scopeId = require("../../../lib/condensation/template-helpers/scopeId");

describe("helpers", function() {
  describe("scopeId", function() {

    it("should do nothing when no prefix or suffix is defined", function() {
      var result = scopeId("LogicalId");
      assert.equal(result,"LogicalId");
    });

    it("should add a prefix", function() {
      var result = scopeId.apply({logicalIdPrefix: "My"}, ["LogicalId"]);
      assert.equal(result,"MyLogicalId");
    });

    it("should add a suffix", function() {
      var result = scopeId.apply({logicalIdSuffix: "2"}, ["LogicalId"]);
      assert.equal(result,"LogicalId2");
    });

    it("should add a prefix and a suffix", function() {
      var result = scopeId.apply({logicalIdPrefix: "My", logicalIdSuffix: "2"}, ["LogicalId"]);
      assert.equal(result,"MyLogicalId2");
    });

  })
});
