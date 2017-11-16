'use strict';

var Doctor = require('../lib/macaca-doctor');
var DoctorIos = require('../lib/macaca-doctor/ios');

describe('test', function() {

  it('should be ok', function() {
    Doctor.should.be.ok();
  });

  it('should check ok', function *() {
    var doctor = new Doctor();
    yield doctor.check();
  });

  it('ios check standalone should be ok', function *() {
    var version = yield DoctorIos.getXcodeVersion();
    console.log(version);
  });

});
