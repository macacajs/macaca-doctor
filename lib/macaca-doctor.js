'use strict';

const EOL = require('os').EOL;

const IOS = require('./ios');
const _ = require('./helper');
const Node = require('./node');
const Driver = require('./driver');
const Android = require('./android');

function Doctor(options) {
  this.options = options || {};
}

Doctor.prototype.check = function *() {
  console.log(`${EOL}  Node.js checklist:${EOL}`);

  yield Node.checkNodeBinary();

  if (_.platform.isOSX) {
    console.log(`${EOL}  iOS checklist:${EOL}`);

    yield IOS.xcodeInstalled();

    yield IOS.iosWebkitDebugProxyInstalled();
  }

  console.log(`${EOL}  Android checklist:${EOL}`);

  yield Android.check_JAVA_VERSION();
  yield Android.check_JAVA_HOME();
  yield Android.check_ANT_HOME();

  if (_.platform.isWindows) {
    yield Android.check_ANDROID_HOME();
  }

  console.log(`${EOL}  Installed driver list:${EOL}`);

  Driver.checkInstalled();

  console.log(EOL);
};

module.exports = Doctor;
