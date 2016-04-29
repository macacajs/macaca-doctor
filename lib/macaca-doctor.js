'use strict';

var EOL = require('os').EOL;

var IOS = require('./ios');
var _ = require('./helper');
var Node = require('./node');
var Android = require('./android');

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
  yield Android.check_ANDROID_HOME();

  console.log(EOL);
};

module.exports = Doctor;
