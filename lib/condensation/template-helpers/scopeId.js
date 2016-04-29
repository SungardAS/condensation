/*
 * Will create a return a logicalId scoped with logicalIdPrefix and logicalIdSuffix
 *
 * @param {string}  - The logicalId
 * @param {Object} options - unused at this time
 * @return {string}
 */
module.exports = function scopeId(str,options) {
  var scopeStr = [this.logicalIdPrefix,str,this.logicalIdSuffix].join('');
  return scopeStr;
};
