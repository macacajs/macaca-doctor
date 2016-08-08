'use strict';

const fs = require('fs');
const path = require('path');
const JAVA = require('java-util');

const _ = require('./helper');
const JAVA_HOME = JAVA.JAVA_HOME;

var env = process.env;
var isWindows = _.platform.isWindows;

exports.check_JAVA_VERSION = function *() {
  var version = yield JAVA.getVersion();
  if (version) {
    _.pass('JAVA version is `%s`', version);
  } else {
    _.fail('JAVA version get not found');
  }
};

exports.check_ANDROID_HOME = function *() {
  if (typeof env.ANDROID_HOME !== 'undefined') {
    _.pass('ANDROID_HOME is set to `%s`', env.ANDROID_HOME);

    var platforms = path.join(env.ANDROID_HOME, 'platforms');

    if (!_.isExistedDir(platforms)) {
      return _.fail('platforms directory is not exist');
    }

    var res = fs.readdirSync(platforms);

    res = _.filter(res, n => {
      return /android-\d+/.test(n);
    });

    if (!res.length) {
      return _.fail('platforms directory is not exist');
    }

    var platformsDir = res[res.length - 1];

    _.pass(`Platforms is set to \`${path.resolve(platforms, platformsDir)}\``);

    var android = isWindows ? 'android.bat' : 'android';
    var androidTool = path.resolve(env.ANDROID_HOME, 'tools', android);

    if (!_.isExistedFile(androidTool)) {
      return _.fail('Android tools is not exist');
    }

    _.pass(`Android tools is set to \`${androidTool}\``);
  } else {
    _.fail('ANDROID_HOME is not set');
  }
};

exports.check_JAVA_HOME = function() {
  return new Promise((resolve) => {
    JAVA_HOME.getPath((error, javaHome) => {
      if (error) {
        _.fail('JAVA_HOME is not set');
      } else {
        _.pass('JAVA_HOME is set to `%s`', javaHome);
      }
      resolve();
    });
  });
};

exports.check_ANT_HOME = function *() {
  if (typeof env.ANT_HOME !== 'undefined') {
    _.pass(`ANT_HOME is set to \`${env.ANT_HOME}\``);
  } else {
    _.fail('ANT_HOME is not set');
  }
};
