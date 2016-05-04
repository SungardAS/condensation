var Handlebars = require('handlebars');
var _ = require('lodash');

var loadHelper = function(helperDefinition,options) {
  var cOpts = _.merge({
    handlebars: Handlebars,
    projectDir: process.cwd(),
    particleLoader: null
  },_.omit(options,_.isUndefined));

  var wrappedHelper = function () {
    var cModule, pPath, hArgs, hOpts;

    if (arguments.length === 1) {
      cModule = '';
      pPath = '';
    }
    else {
      var moduleCheck = _.isString(arguments[0]) ? arguments[0].split(':') : null;

      if (moduleCheck && moduleCheck[0] === 'module') {
        cModule = moduleCheck[1];
        pPath = arguments[1];
      }
      else if (moduleCheck && moduleCheck[0] === 'm') {
        cModule = "particles-" + moduleCheck[1];
        pPath = arguments[1];
      }
      else {
        cModule = '';
        pPath = arguments[0];
      }

      hArgs = _.slice(arguments,(cModule ? 2 : 1),arguments.length-1);
    }
    hOpts = arguments[arguments.length-1];

    return helperDefinition.helper.apply(this,[cModule,pPath,hArgs,hOpts,cOpts]);

  };

  return wrappedHelper;
};

module.exports = loadHelper;
