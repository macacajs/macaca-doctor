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

var platform = _.platform;

exports.checkNodeBinary = function *() {
  var node_bin = yield _.exec(_.platform.isWindows ? 'node -e "console.log(process.argv[0])"' : 'which node');

  if (node_bin) {
    _.pass('node env: %s', node_bin);
  } else {
    _.fail('node env error: %s', node_bin);
  }

  var node_version = yield _.exec(_.platform.isWindows ? 'node -e "console.log(process.version)"' : 'node --version');

  var version  = 'v4.2.1';

  if (node_version < version) {
    _.fail('node version: %s lower than %s', node_version, version);
  } else {
    _.pass('node version: %s', node_version);
  }
};
