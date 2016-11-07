'use strict';

const iosUtils = require('ios-utils');

const _ = require('./helper');

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

exports.iosUsbmuxdIProxyInstalled = function *() {
  const IOS_USBMUXD_IPROXY = 'iproxy';

  try {
    const binPath = yield _.exec(`which ${IOS_USBMUXD_IPROXY}`);

    if (_.isExistedFile(binPath)) {
      _.pass(`${IOS_USBMUXD_IPROXY}[usbmuxd] is installed at: `%s``, binPath);
    } else {
      _.fail(`Command Line Tools: ${IOS_USBMUXD_IPROXY}[usbmuxd] is uninstalled`);
    }
  } catch (e) {
    _.fail(`Command Line Tools: ${IOS_USBMUXD_IPROXY}[usbmuxd] is uninstalled`);
  }
};

exports.iosWebkitDebugProxyInstalled = function *() {
  const IOS_WEBKIT_DEBUG_PROXY = 'ios_webkit_debug_proxy';

  try {
    const binPath = yield _.exec(`which ${IOS_WEBKIT_DEBUG_PROXY}`);

    if (_.isExistedFile(binPath)) {
      _.pass(`${IOS_WEBKIT_DEBUG_PROXY} is installed at: `%s``, binPath);
    } else {
      _.fail(`Command Line Tools: ${IOS_WEBKIT_DEBUG_PROXY} is uninstalled`);
    }
  } catch (e) {
    _.fail(`Command Line Tools: ${IOS_WEBKIT_DEBUG_PROXY} is uninstalled`);
  }
};
