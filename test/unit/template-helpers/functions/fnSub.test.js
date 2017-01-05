var assert = require("assert");
var fnSub = require("../../../../lib/condensation/template-helpers/functions/fnSub");

describe("helpers", function() {
  describe("fnSub", function() {

    it("accepts a string", function() {
      var result = fnSub("The Region Is ${AWS::StackName}", {});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Sub": ["The Region Is ${AWS::StackName}", {}]}
      )
    });

    it("accepts a string with a map", function() {
      var result = fnSub("The Region Is ${Region}", {hash: {Region: '{"Ref": "AWS::Region"}'}});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Sub": ["The Region Is ${Region}", {"Region": {"Ref": "AWS::Region"}}]}
      )
    });

    it("processed a map with string values", function() {
      var result = fnSub("The Region Is ${Region}", {hash: {Region: 'blah blah $"/^'}});
      assert.deepEqual(
        JSON.parse(result),
        {"Fn::Sub": ["The Region Is ${Region}", {"Region": "blah blah $\"/^"}]}
      )
    });

  })
});
