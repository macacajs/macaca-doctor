'use strict';

const path = require('path');
const maps = ['ios', 'android', 'electron', 'chrome'];

const _ = require('./helper');

exports.checkInstalled = () => {

  try {
    var installerPkg = path.resolve(require.resolve('webdriver-server'), '..', 'node_modules', 'node-installer', 'package.json');

    var devDependencies = require(installerPkg).devDependencies;
  } catch (e) {
    console.log(e);
  }

  _.filter(devDependencies, function(v, k) {
    if (!!~k.indexOf('macaca')) {
      _.pass(`${k}: ${v}`);
    }
  });
};

