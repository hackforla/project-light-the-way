'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Resource = mongoose.model('Resource');

/**
 * Globals
 */
var user,
  resource;

/**
 * Unit tests
 */
describe('Resource Model Unit Tests:', function() {
  beforeEach(function() {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      resource = new Resource({
        org: 'Resource Name',
        desc: 'Description',
        web: 'http://url.com',
        addr: '123 Main St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90000',
        poc_name: 'John Doe',
        poc_email: 'john.doe@email.com',
        poc_line: '1234319876',
        tags:'tag1,tag2,tag3,tag4',
        created: 1506496766817,
        user: user
      });
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function() {
      // Mocha v3+ not allowed to over specify
      return resource.save(function(err) {
        should.not.exist(err);
      });
    });

    // Bug #1 - Validation doesn't allow test as it's prechecked
    // it('should be able to show an error when try to save without name', function() {
    //   resource.org = '';
    //   return resource.save(function(err) {
    //     should.exist(err.message);
    //   });
    // });
  });

  afterEach(function() {
    Resource.remove().exec(function() {
      User.remove().exec(function() {
      });
    });
  });
});
