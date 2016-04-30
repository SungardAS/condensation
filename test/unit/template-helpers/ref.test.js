var assert = require("assert");
var ref = require("../../../lib/condensation/template-helpers/ref");

describe("helpers", function() {
  describe("ref", function() {

    it("should accept a string and return it as a Ref", function() {
      var result = ref("LogicalId");
      assert.deepEqual(result,'{"Ref": "LogicalId"}');
    });

    it("should add a prefix if defined by the scope", function() {
      var result = ref.apply({logicalIdPrefix: "My"}, ["LogicalId"]);
      assert.deepEqual(result,'{"Ref": "MyLogicalId"}');
    });

    it("should add a suffix if defined by the scope", function() {
      var result = ref.apply({logicalIdSuffix: "2"}, ["LogicalId"]);
      assert.deepEqual(result,'{"Ref": "LogicalId2"}');
    });

    it("should add a prefix and a suffix if defined by the scope", function() {
      var result = ref.apply({logicalIdPrefix: "My", logicalIdSuffix: "2"}, ["LogicalId"]);
      assert.deepEqual(result,'{"Ref": "MyLogicalId2"}');
    });

    it("should ignore prefix and suffix if scope is false", function() {
      var result = ref.apply({logicalIdPrefix: "My", logicalIdSuffix: "2"}, ["LogicalId",{hash: {scope:false}}]);
      assert.deepEqual(result,'{"Ref": "LogicalId"}');
    });

  })
});

