'use strict';

const path = require('path');
const drivers = require('macaca-cli').drivers;

const _ = require('./helper');

exports.checkInstalled = function *() {
  var availableList = [];

  for (var i in drivers) {
    const driver = drivers[i];
    const modName = `macaca-${driver}`;
    try {
      require.resolve(modName);
      availableList.push(driver);
    } catch (e) {
    }
  }

  for (var i in availableList) {
    const driver = availableList[i];
    const modName = `macaca-${driver}`;
    const mod = require.resolve(modName);
    const pkg = path.join(mod, '..', '..', 'package');
    const currentVersion = require(pkg).version;

    try {
      const result = yield _.request({
        uri: `http://registry.npmjs.org/${modName}/latest`,
        method: 'get',
        timeout: 3000
      });

      const data = JSON.parse(result.body);

      if (data && data.version) {
        if (data.version === currentVersion) {
          _.pass(`${driver}: ${currentVersion}`);
        } else {
          _.fail(`${driver}: ${currentVersion} [out-of-date]`);
        }
      } else {
        _.pass(`${driver}: ${currentVersion}`);
      }

    } catch (e) {
      _.pass(`${driver}: ${currentVersion}`);
    }
  }
};
