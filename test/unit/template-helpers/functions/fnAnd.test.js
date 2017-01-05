var assert = require("assert");
var fnAnd = require("../../../../lib/condensation/template-helpers/functions/fnAnd");

describe("helpers", function() {
  describe("fnAnd", function() {

    it("should accept a condition", function() {
      var result = fnAnd('{"Condition": "TestCondition"}',{});
      assert.deepEqual(
        JSON.parse(result),
        {
          "Fn::And": [
            {
              "Condition": "TestCondition"
            }
          ]
        }
      )
    });

    it("should accept 2 conditions", function() {
      var result = fnAnd('{"Condition": "TestCondition"}','{"Condition": "TestCondition2"}',{});
      assert.deepEqual(
        JSON.parse(result),
        {
          "Fn::And": [
            {"Condition": "TestCondition"},
            {"Condition": "TestCondition2"}
          ]
        }
      )
    });

    it("should convert a string to a condition reference", function() {
      var result = fnAnd("TestCondition",'{"Condition": "TestCondition2"}',{});
      assert.deepEqual(
        JSON.parse(result),
        {
          "Fn::And": [
            {"Condition": "TestCondition"},
            {"Condition": "TestCondition2"}
          ]
        }
      )
    });

    it("should convert all strings to a condition reference", function() {
      var result = fnAnd("TestCondition", "TestCondition2",{});
      assert.deepEqual(
        JSON.parse(result),
        {
          "Fn::And": [
            {"Condition": "TestCondition"},
            {"Condition": "TestCondition2"}
          ]
        }
      )
    });

    it("should convert the last string to a condition reference", function() {
      var result = fnAnd('{"Condition": "TestCondition"}',"TestCondition2",{});
      assert.deepEqual(
        JSON.parse(result),
        {
          "Fn::And": [
            {"Condition": "TestCondition"},
            {"Condition": "TestCondition2"}
          ]
        }
      )
    });

    it("should accept 3 conditions", function() {
      var result = fnAnd('{"Condition": "TestCondition"}',"TestCondition2","TestCondition3",{});
      assert.deepEqual(
        JSON.parse(result),
        {
          "Fn::And": [
            {"Condition": "TestCondition"},
            {"Condition": "TestCondition2"},
            {"Condition": "TestCondition3"}
          ]
        }
      )
    });


  })
});

