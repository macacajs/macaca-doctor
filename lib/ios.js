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

var _ = require('./helper');
var iosUtils = require('ios-utils');

exports.xcodeInstalled = function *() {
  var version = yield _.exec('xcode-select -v');

  if (_.include(version, 'version')) {
    version = version.split('version')[1];
    version = version.trim();

    var xcode = yield iosUtils.getXcodePath();
    _.pass('Xcode is installed at: `%s`', xcode);
    _.pass('Xcode Command Line Tools is ready, version: %s', version);
  } else {
    _.fail('Command Line Tools is uninstalled');
  }
};
