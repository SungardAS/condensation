/**
 * Run a helper particle
 * @example
 * {{helper "my-helper"}}
 * @example
 * {{helper "my-helper" foo="bar"}}
 * @example
 * {{helper "module:<MODULE>" 'module-helper'}}
 * @example
 * {{!-- to load modules with format `particles-NAME` --}}
 * {{helper "m:<NAME>" "module-helper"}}
 * @module helper
 * @type {function}
 * @param {string} path - Path to the helper, excluding the `.js` extension
 * @param {...kv} options - Key/Value pairs to pass to the particle helper
 * @returns {*} - Will returns the output from the particle helper
 *
 */

var _ = require("lodash");

var helper = function helper(cModule,pPath,hArgs,hOpts,cOpts) {

    var particle = cOpts.particleLoader.loadParticle('helper',cModule,pPath,{parentFile: hOpts.data._file});
    var helperFunc = require(particle.path);

    return helperFunc.apply(
      this,
      _.flatten(
        [
          hArgs,
          _.merge(hOpts,{handlebars: cOpts.handlebars})
        ]
      )
    );
};

module.exports.NAME = 'helper';
module.exports.helper = helper;
