'use strict';

const EOL = require('os').EOL;
const chalk = require('chalk');

const IOS = require('./ios');
const _ = require('./helper');
const Node = require('./node');
const Driver = require('./driver');
const Android = require('./android');

const pkg = require('../package');

function Doctor(options) {
  this.options = options || {};
}

Doctor.prototype.check = function *() {

  try {
    const result = yield _.request({
      uri: `http://registry.npmjs.org/${pkg.name}/latest`,
      method: 'get',
      timeout: 3000
    });

    const data = JSON.parse(result.body);

    if (data && data.version) {
      if (data.version !== pkg.version) {
        _.pass(`Sorry, please update macaca: ${chalk.cyan('npm i macaca-cli@latest -g')}`);
        process.exit(0);
      }
    }
  } catch (e) {
  }

  _.logger(`${pkg.name} version: ${chalk.white(pkg.version)}`);
  _.logger(`Node.js checklist:`);

  yield Node.checkNodeBinary();

  if (_.platform.isOSX) {
    _.logger(`iOS checklist:`);

    yield IOS.xcodeInstalled();
    yield IOS.xcodeBuild();
    yield IOS.iosUsbmuxdIProxyInstalled();
    yield IOS.iosWebkitDebugProxyInstalled();
    yield IOS.carthageInstalled();
  }

  _.logger(`Android checklist:`);

  yield Android.check_JAVA_VERSION();
  yield Android.check_JAVA_HOME();
  yield Android.check_ANDROID_HOME();

  if (_.platform.isWindows) {
    yield Android.check_GRADLE_HOME();
  } else {
    yield Android.check_GRADLE_VERSION();
  }

  _.logger(`Installed driver list:`);

  yield Driver.checkInstalled();

  console.log(EOL);
};

module.exports = Doctor;
