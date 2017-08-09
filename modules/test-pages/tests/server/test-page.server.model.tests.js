'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  TestPage = mongoose.model('TestPage');

/**
 * Globals
 */
var user,
  testPage;

/**
 * Unit tests
 */
describe('Test page Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      testPage = new TestPage({
        name: 'Test page Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return testPage.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      testPage.name = '';

      return testPage.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    TestPage.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
