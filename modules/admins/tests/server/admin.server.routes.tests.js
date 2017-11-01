'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Admin = mongoose.model('Admin'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  admin;

/**
 * Admin routes tests
 */
describe('Admin CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Admin
    user.save(function () {
      admin = {
        name: 'Admin name'
      };

      done();
    });
  });

  it('should be able to save a Admin if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Admin
        agent.post('/api/admins')
          .send(admin)
          .expect(200)
          .end(function (adminSaveErr, adminSaveRes) {
            // Handle Admin save error
            if (adminSaveErr) {
              return done(adminSaveErr);
            }

            // Get a list of Admins
            agent.get('/api/admins')
              .end(function (adminsGetErr, adminsGetRes) {
                // Handle Admins save error
                if (adminsGetErr) {
                  return done(adminsGetErr);
                }

                // Get Admins list
                var admins = adminsGetRes.body;

                // Set assertions
                (admins[0].user._id).should.equal(userId);
                (admins[0].name).should.match('Admin name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Admin if not logged in', function (done) {
    agent.post('/api/admins')
      .send(admin)
      .expect(403)
      .end(function (adminSaveErr, adminSaveRes) {
        // Call the assertion callback
        done(adminSaveErr);
      });
  });

  it('should not be able to save an Admin if no name is provided', function (done) {
    // Invalidate name field
    admin.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Admin
        agent.post('/api/admins')
          .send(admin)
          .expect(400)
          .end(function (adminSaveErr, adminSaveRes) {
            // Set message assertion
            (adminSaveRes.body.message).should.match('Please fill Admin name');

            // Handle Admin save error
            done(adminSaveErr);
          });
      });
  });

  it('should be able to update an Admin if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Admin
        agent.post('/api/admins')
          .send(admin)
          .expect(200)
          .end(function (adminSaveErr, adminSaveRes) {
            // Handle Admin save error
            if (adminSaveErr) {
              return done(adminSaveErr);
            }

            // Update Admin name
            admin.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Admin
            agent.put('/api/admins/' + adminSaveRes.body._id)
              .send(admin)
              .expect(200)
              .end(function (adminUpdateErr, adminUpdateRes) {
                // Handle Admin update error
                if (adminUpdateErr) {
                  return done(adminUpdateErr);
                }

                // Set assertions
                (adminUpdateRes.body._id).should.equal(adminSaveRes.body._id);
                (adminUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Admins if not signed in', function (done) {
    // Create new Admin model instance
    var adminObj = new Admin(admin);

    // Save the admin
    adminObj.save(function () {
      // Request Admins
      request(app).get('/api/admins')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Admin if not signed in', function (done) {
    // Create new Admin model instance
    var adminObj = new Admin(admin);

    // Save the Admin
    adminObj.save(function () {
      request(app).get('/api/admins/' + adminObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', admin.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Admin with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/admins/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Admin is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Admin which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Admin
    request(app).get('/api/admins/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Admin with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Admin if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Admin
        agent.post('/api/admins')
          .send(admin)
          .expect(200)
          .end(function (adminSaveErr, adminSaveRes) {
            // Handle Admin save error
            if (adminSaveErr) {
              return done(adminSaveErr);
            }

            // Delete an existing Admin
            agent.delete('/api/admins/' + adminSaveRes.body._id)
              .send(admin)
              .expect(200)
              .end(function (adminDeleteErr, adminDeleteRes) {
                // Handle admin error error
                if (adminDeleteErr) {
                  return done(adminDeleteErr);
                }

                // Set assertions
                (adminDeleteRes.body._id).should.equal(adminSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Admin if not signed in', function (done) {
    // Set Admin user
    admin.user = user;

    // Create new Admin model instance
    var adminObj = new Admin(admin);

    // Save the Admin
    adminObj.save(function () {
      // Try deleting Admin
      request(app).delete('/api/admins/' + adminObj._id)
        .expect(403)
        .end(function (adminDeleteErr, adminDeleteRes) {
          // Set message assertion
          (adminDeleteRes.body.message).should.match('User is not authorized');

          // Handle Admin error error
          done(adminDeleteErr);
        });

    });
  });

  it('should be able to get a single Admin that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Admin
          agent.post('/api/admins')
            .send(admin)
            .expect(200)
            .end(function (adminSaveErr, adminSaveRes) {
              // Handle Admin save error
              if (adminSaveErr) {
                return done(adminSaveErr);
              }

              // Set assertions on new Admin
              (adminSaveRes.body.name).should.equal(admin.name);
              should.exist(adminSaveRes.body.user);
              should.equal(adminSaveRes.body.user._id, orphanId);

              // force the Admin to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Admin
                    agent.get('/api/admins/' + adminSaveRes.body._id)
                      .expect(200)
                      .end(function (adminInfoErr, adminInfoRes) {
                        // Handle Admin error
                        if (adminInfoErr) {
                          return done(adminInfoErr);
                        }

                        // Set assertions
                        (adminInfoRes.body._id).should.equal(adminSaveRes.body._id);
                        (adminInfoRes.body.name).should.equal(admin.name);
                        should.equal(adminInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Admin.remove().exec(done);
    });
  });
});
