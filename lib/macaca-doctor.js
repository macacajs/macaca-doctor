/* ================================================================
 * macaca-doctor by xdf(xudafeng[at]126.com)
 *
 * first created at : Sat Mar 05 2016 11:35:25 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

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
  }

  console.log(`${EOL}  Android checklist:${EOL}`);

  yield Android.check_JAVA_VERSION();
  yield Android.check_JAVA_HOME();
  yield Android.check_ANDROID_HOME();

  console.log(EOL);
};

module.exports = Doctor;
