
module.exports = function scopeId(str,options) {
  var scopeStr = [this.logicalIdPrefix,str,this.logicalIdSuffix].join('');
  return scopeStr;
};
