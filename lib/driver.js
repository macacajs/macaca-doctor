'use strict';

const path = require('path');
const maps = require('macaca-cli').drivers;

const _ = require('./helper');

exports.checkInstalled = () => {

  _.filter(maps, function(name) {
    try {
      var mod = require.resolve(`macaca-${name}`);
      var pkg = path.join(mod, '..', 'package');
      _.pass(`${name}: ${require(pkg).version}`);
    } catch (e) {
    }
  });
};
