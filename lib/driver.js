'use strict';

const {
  drivers
} = require('macaca-cli');
const path = require('path');

const _ = require('./helper');

exports.checkInstalled = function *() {
  var availableList = [];

  for (let i in drivers) {
    const driver = drivers[i];
    const modName = `macaca-${driver}`;
    try {
      require.resolve(modName);
      availableList.push(driver);
    } catch (e) {
    }
  }

  for (let i in availableList) {
    const driver = availableList[i];
    const modName = `macaca-${driver}`;
    const mod = require.resolve(modName);
    const pkg = path.join(mod, '..', '..', 'package');
    const currentVersion = require(pkg).version;

    const host = 'registry.cnpmjs.org';
    const protocol = 'http:';

    try {
      const result = yield _.request({
        uri: `${protocol}//${host}/${modName}/latest`,
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
