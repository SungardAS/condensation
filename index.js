var Condensation = require('./lib/condensation');

module.exports.buildTasks = function(gulp,options) {
  var condensation = new Condensation(gulp,options);
  return condensation.condense();
};
