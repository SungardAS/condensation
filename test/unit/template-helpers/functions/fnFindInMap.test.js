var assert = require("assert");
var fnFindInMap = require("../../../../lib/condensation/template-helpers/functions/fnFindInMap");

describe("helpers", function() {
  describe("fnFindInMap", function() {

    it("should work with all strings", function() {
      var result = fnFindInMap("MapName","TopLevelKey","SecondLevelKey");
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::FindInMap": ["MapName", "TopLevelKey", "SecondLevelKey"]}
      )
    });

    it("should work with a ref", function() {
      var result = fnFindInMap("MapName",'{"Ref": "TopLevelKey"}',"SecondLevelKey");
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::FindInMap": ["MapName", {"Ref": "TopLevelKey"}, "SecondLevelKey"]}
      )
    });

  })
});

