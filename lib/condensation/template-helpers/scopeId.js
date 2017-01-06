/**
 * Used within sets to add the correct logicalIdPrefix and/or logicalIdSuffix to a logicalId
 * @example
 * {{scopeId "LogicalId"}}
 * @example
 * {{ref (scopeId "LogicalId")}}
 *
 * @module scopeId
 * @type {function}
 * @param {string} - The logicalId
 * @return {string} - The logical with the correct prefix and suffix for the current scope
 */

module.exports = function scopeId(str,options) {
  var scopeStr = [this.logicalIdPrefix,str,this.logicalIdSuffix].join('');
  return scopeStr;
};
