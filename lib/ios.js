'use strict';

const semver = require('semver');
const iosUtils = require('ios-utils');

const _ = require('./helper');

exports.xcodeInstalled = function *() {
  try {
    const binPath = yield _.exec(`which xcode-select`);

    if (!_.isExistedFile(binPath)) {
      return _.fail('Xcode is uninstalled');
    }

    let version = yield _.exec(`${binPath} -v`);
    const MIN_VERSION = 2347;

    if (_.include(version, 'version')) {
      version = version.split('version')[1];
      version = version.trim();

      if (parseInt(version, 10) >= MIN_VERSION) {
        var xcode = yield iosUtils.getXcodePath();
        _.pass('Xcode is installed at: `%s`', xcode);
        _.pass('Xcode Command Line Tools is ready, version: %s', version);
      } else {
        _.fail('Xcode Command Line Tools require version: %s and above', MIN_VERSION);
      }
    } else {
      _.fail('Xcode Command Line Tools is uninstalled');
    }
  } catch (e) {
    _.fail('Xcode is uninstalled');
  }
};

exports.xcodeBuild = function *() {
  try {
    const binPath = yield _.exec(`which xcodebuild`);

    if (!_.isExistedFile(binPath)) {
      return _.fail('Xcode is uninstalled');
    }

    let version = yield _.exec('xcodebuild -version');
    version = version.split(/\s/)[1];
    const MIN_VERSION = '8.3.2';

    if (semver.lt(version, MIN_VERSION)) {
      _.fail('xcodebuild version: %s lower than %s', version, MIN_VERSION);
    } else {
      _.pass('xcodebuild version: %s', version);
    }
  } catch (e) {
    return _.fail('Xcode is uninstalled');
  }
};

exports.carthageInstalled = function *() {
  const CARTHAGE = 'carthage';
  const MIN_VERSION_STRING = '0.22.0';
  try {
    const binPath = yield _.exec(`which ${CARTHAGE}`);

    if (_.isExistedFile(binPath)) {
      const version = yield _.exec(`${CARTHAGE} version`);

      if (version.trim() >= MIN_VERSION_STRING) {
        _.pass(`${CARTHAGE} is installed, version: ${version.trim()}`);
      } else {
        _.fail(`${CARTHAGE} require version ${MIN_VERSION_STRING} and above`);
      }
    } else {
      _.fail(`${CARTHAGE} is uninstalled`);
    }
  } catch (e) {
    _.fail(`${CARTHAGE} is uninstalled`);
  }
};

exports.iosUsbmuxdIProxyInstalled = function *() {
  const IOS_USBMUXD_IPROXY = 'iproxy';

  try {
    const binPath = yield _.exec(`which ${IOS_USBMUXD_IPROXY}`);

    if (_.isExistedFile(binPath)) {
      _.pass('%s[usbmuxd] is installed at: `%s`', IOS_USBMUXD_IPROXY, binPath);
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
      _.pass('%s is installed at: `%s`', IOS_WEBKIT_DEBUG_PROXY, binPath);
    } else {
      _.fail(`Command Line Tools: ${IOS_WEBKIT_DEBUG_PROXY} is uninstalled`);
    }
  } catch (e) {
    _.fail(`Command Line Tools: ${IOS_WEBKIT_DEBUG_PROXY} is uninstalled`);
  }
};
