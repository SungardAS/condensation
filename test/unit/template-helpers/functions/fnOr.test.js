var assert = require("assert");
var fnOr = require("../../../../lib/condensation/template-helpers/functions/fnOr");

describe("helpers", function() {
  describe("fnOr", function() {

    it("should accept a condition", function() {
      var result = fnOr('{"Condition": "TestCondition"}',{});
      assert.deepEqual(
        JSON.parse(result),
        {
          "Fn::Or": [
            {
              "Condition": "TestCondition"
            }
          ]
        }
      )
    });

    it("should accept 2 conditions", function() {
      var result = fnOr('{"Condition": "TestCondition"}','{"Condition": "TestCondition2"}',{});
      assert.deepEqual(
        JSON.parse(result),
        {
          "Fn::Or": [
            {"Condition": "TestCondition"},
            {"Condition": "TestCondition2"}
          ]
        }
      )
    });

    it("should convert a string to a condition reference", function() {
      var result = fnOr("TestCondition",'{"Condition": "TestCondition2"}',{});
      assert.deepEqual(
        JSON.parse(result),
        {
          "Fn::Or": [
            {"Condition": "TestCondition"},
            {"Condition": "TestCondition2"}
          ]
        }
      )
    });

    it("should convert all strings to a condition reference", function() {
      var result = fnOr("TestCondition", "TestCondition2",{});
      assert.deepEqual(
        JSON.parse(result),
        {
          "Fn::Or": [
            {"Condition": "TestCondition"},
            {"Condition": "TestCondition2"}
          ]
        }
      )
    });

    it("should convert the last string to a condition reference", function() {
      var result = fnOr('{"Condition": "TestCondition"}',"TestCondition2",{});
      assert.deepEqual(
        JSON.parse(result),
        {
          "Fn::Or": [
            {"Condition": "TestCondition"},
            {"Condition": "TestCondition2"}
          ]
        }
      )
    });

    it("should accept 3 conditions", function() {
      var result = fnOr('{"Condition": "TestCondition"}',"TestCondition2","TestCondition3",{});
      assert.deepEqual(
        JSON.parse(result),
        {
          "Fn::Or": [
            {"Condition": "TestCondition"},
            {"Condition": "TestCondition2"},
            {"Condition": "TestCondition3"}
          ]
        }
      )
    });


  })
});

