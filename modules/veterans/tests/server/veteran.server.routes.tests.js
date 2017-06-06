'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Veteran = mongoose.model('Veteran'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  veteran;

/**
 * Veteran routes tests
 */
describe('Veteran CRUD tests', function () {

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

    // Save a user to the test db and create new Veteran
    user.save(function () {
      veteran = {
        name: 'Veteran name'
      };

      done();
    });
  });

  it('should be able to save a Veteran if logged in', function (done) {
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

        // Save a new Veteran
        agent.post('/api/veterans')
          .send(veteran)
          .expect(200)
          .end(function (veteranSaveErr, veteranSaveRes) {
            // Handle Veteran save error
            if (veteranSaveErr) {
              return done(veteranSaveErr);
            }

            // Get a list of Veterans
            agent.get('/api/veterans')
              .end(function (veteransGetErr, veteransGetRes) {
                // Handle Veterans save error
                if (veteransGetErr) {
                  return done(veteransGetErr);
                }

                // Get Veterans list
                var veterans = veteransGetRes.body;

                // Set assertions
                (veterans[0].user._id).should.equal(userId);
                (veterans[0].name).should.match('Veteran name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Veteran if not logged in', function (done) {
    agent.post('/api/veterans')
      .send(veteran)
      .expect(403)
      .end(function (veteranSaveErr, veteranSaveRes) {
        // Call the assertion callback
        done(veteranSaveErr);
      });
  });

  it('should not be able to save an Veteran if no name is provided', function (done) {
    // Invalidate name field
    veteran.name = '';

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

        // Save a new Veteran
        agent.post('/api/veterans')
          .send(veteran)
          .expect(400)
          .end(function (veteranSaveErr, veteranSaveRes) {
            // Set message assertion
            (veteranSaveRes.body.message).should.match('Please fill Veteran name');

            // Handle Veteran save error
            done(veteranSaveErr);
          });
      });
  });

  it('should be able to update an Veteran if signed in', function (done) {
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

        // Save a new Veteran
        agent.post('/api/veterans')
          .send(veteran)
          .expect(200)
          .end(function (veteranSaveErr, veteranSaveRes) {
            // Handle Veteran save error
            if (veteranSaveErr) {
              return done(veteranSaveErr);
            }

            // Update Veteran name
            veteran.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Veteran
            agent.put('/api/veterans/' + veteranSaveRes.body._id)
              .send(veteran)
              .expect(200)
              .end(function (veteranUpdateErr, veteranUpdateRes) {
                // Handle Veteran update error
                if (veteranUpdateErr) {
                  return done(veteranUpdateErr);
                }

                // Set assertions
                (veteranUpdateRes.body._id).should.equal(veteranSaveRes.body._id);
                (veteranUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Veterans if not signed in', function (done) {
    // Create new Veteran model instance
    var veteranObj = new Veteran(veteran);

    // Save the veteran
    veteranObj.save(function () {
      // Request Veterans
      request(app).get('/api/veterans')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Veteran if not signed in', function (done) {
    // Create new Veteran model instance
    var veteranObj = new Veteran(veteran);

    // Save the Veteran
    veteranObj.save(function () {
      request(app).get('/api/veterans/' + veteranObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', veteran.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Veteran with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/veterans/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Veteran is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Veteran which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Veteran
    request(app).get('/api/veterans/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Veteran with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Veteran if signed in', function (done) {
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

        // Save a new Veteran
        agent.post('/api/veterans')
          .send(veteran)
          .expect(200)
          .end(function (veteranSaveErr, veteranSaveRes) {
            // Handle Veteran save error
            if (veteranSaveErr) {
              return done(veteranSaveErr);
            }

            // Delete an existing Veteran
            agent.delete('/api/veterans/' + veteranSaveRes.body._id)
              .send(veteran)
              .expect(200)
              .end(function (veteranDeleteErr, veteranDeleteRes) {
                // Handle veteran error error
                if (veteranDeleteErr) {
                  return done(veteranDeleteErr);
                }

                // Set assertions
                (veteranDeleteRes.body._id).should.equal(veteranSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Veteran if not signed in', function (done) {
    // Set Veteran user
    veteran.user = user;

    // Create new Veteran model instance
    var veteranObj = new Veteran(veteran);

    // Save the Veteran
    veteranObj.save(function () {
      // Try deleting Veteran
      request(app).delete('/api/veterans/' + veteranObj._id)
        .expect(403)
        .end(function (veteranDeleteErr, veteranDeleteRes) {
          // Set message assertion
          (veteranDeleteRes.body.message).should.match('User is not authorized');

          // Handle Veteran error error
          done(veteranDeleteErr);
        });

    });
  });

  it('should be able to get a single Veteran that has an orphaned user reference', function (done) {
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

          // Save a new Veteran
          agent.post('/api/veterans')
            .send(veteran)
            .expect(200)
            .end(function (veteranSaveErr, veteranSaveRes) {
              // Handle Veteran save error
              if (veteranSaveErr) {
                return done(veteranSaveErr);
              }

              // Set assertions on new Veteran
              (veteranSaveRes.body.name).should.equal(veteran.name);
              should.exist(veteranSaveRes.body.user);
              should.equal(veteranSaveRes.body.user._id, orphanId);

              // force the Veteran to have an orphaned user reference
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

                    // Get the Veteran
                    agent.get('/api/veterans/' + veteranSaveRes.body._id)
                      .expect(200)
                      .end(function (veteranInfoErr, veteranInfoRes) {
                        // Handle Veteran error
                        if (veteranInfoErr) {
                          return done(veteranInfoErr);
                        }

                        // Set assertions
                        (veteranInfoRes.body._id).should.equal(veteranSaveRes.body._id);
                        (veteranInfoRes.body.name).should.equal(veteran.name);
                        should.equal(veteranInfoRes.body.user, undefined);

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
      Veteran.remove().exec(done);
    });
  });
});
