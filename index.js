var Condensation = require('./lib/condensation');

module.exports.buildTasks = function(gulp,options) {
  return new Condensation(gulp,options);
};
