'use strict';

const assert = require('assert');

const DoctorIos = require('../lib/ios');
const Doctor = require('../lib/macaca-doctor');

describe('test', function() {

  it('should be ok', function() {
    assert.ok(Doctor);
  });

  it('should check ok', function *() {
    var doctor = new Doctor();
    yield doctor.check();
  });

  it('ios check standalone should be ok', function *() {
    var version = yield DoctorIos.getXcodeVersion();
    assert.ok(version);
  });

});
