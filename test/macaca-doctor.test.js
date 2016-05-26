'use strict';

var Doctor = require('../lib/macaca-doctor');

describe('test', function() {
  it('should be ok', function() {
    Doctor.should.be.ok();
  });

  it('should check ok', function *() {
    var doctor = new Doctor();
    yield doctor.check();
  });
});
