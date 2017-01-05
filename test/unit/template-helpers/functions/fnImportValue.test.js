var assert = require("assert");
var fnImportValue = require("../../../../lib/condensation/template-helpers/functions/fnImportValue");

describe("helpers", function() {
  describe("fnImportValue", function() {

    it("accepts shared value name", function() {
      var result = fnImportValue("SharedValue");
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::ImportValue": "SharedValue"}
      )
    });

    it("accepts shared value ref object", function() {
      var result = fnImportValue('{"Ref": "SharedValue"}');
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::ImportValue": {"Ref": "SharedValue"}}
      )
    });

  })
});

