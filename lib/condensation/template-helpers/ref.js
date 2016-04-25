var scopeId = require("./scopeId");

module.exports = function(str,options) {
  options = options || {}; 
  if (options.scope !== false) {
    str = scopeId.apply(this,[str]);
  }
  return ['{"Ref": "',str,'"}'].join('');
};

