'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Dire = mongoose.model('Dire'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  dire;

/**
 * Dire routes tests
 */
describe('Dire CRUD tests', function () {

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

    // Save a user to the test db and create new Dire
    user.save(function () {
      dire = {
        name: 'Dire name'
      };

      done();
    });
  });

  it('should be able to save a Dire if logged in', function (done) {
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

        // Save a new Dire
        agent.post('/api/dire')
          .send(dire)
          .expect(200)
          .end(function (direSaveErr, direSaveRes) {
            // Handle Dire save error
            if (direSaveErr) {
              return done(direSaveErr);
            }

            // Get a list of Dire
            agent.get('/api/dire')
              .end(function (direGetErr, direGetRes) {
                // Handle Dire save error
                if (direGetErr) {
                  return done(direGetErr);
                }

                // Get Dire list
                var dire = direGetRes.body;

                // Set assertions
                (dire[0].user._id).should.equal(userId);
                (dire[0].name).should.match('Dire name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Dire if not logged in', function (done) {
    agent.post('/api/dire')
      .send(dire)
      .expect(403)
      .end(function (direSaveErr, direSaveRes) {
        // Call the assertion callback
        done(direSaveErr);
      });
  });

  it('should not be able to save an Dire if no name is provided', function (done) {
    // Invalidate name field
    dire.name = '';

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

        // Save a new Dire
        agent.post('/api/dire')
          .send(dire)
          .expect(400)
          .end(function (direSaveErr, direSaveRes) {
            // Set message assertion
            (direSaveRes.body.message).should.match('Please fill Dire name');

            // Handle Dire save error
            done(direSaveErr);
          });
      });
  });

  it('should be able to update an Dire if signed in', function (done) {
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

        // Save a new Dire
        agent.post('/api/dire')
          .send(dire)
          .expect(200)
          .end(function (direSaveErr, direSaveRes) {
            // Handle Dire save error
            if (direSaveErr) {
              return done(direSaveErr);
            }

            // Update Dire name
            dire.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Dire
            agent.put('/api/dire/' + direSaveRes.body._id)
              .send(dire)
              .expect(200)
              .end(function (direUpdateErr, direUpdateRes) {
                // Handle Dire update error
                if (direUpdateErr) {
                  return done(direUpdateErr);
                }

                // Set assertions
                (direUpdateRes.body._id).should.equal(direSaveRes.body._id);
                (direUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Dire if not signed in', function (done) {
    // Create new Dire model instance
    var direObj = new Dire(dire);

    // Save the dire
    direObj.save(function () {
      // Request Dire
      request(app).get('/api/dire')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Dire if not signed in', function (done) {
    // Create new Dire model instance
    var direObj = new Dire(dire);

    // Save the Dire
    direObj.save(function () {
      request(app).get('/api/dire/' + direObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', dire.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Dire with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/dire/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Dire is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Dire which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Dire
    request(app).get('/api/dire/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Dire with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Dire if signed in', function (done) {
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

        // Save a new Dire
        agent.post('/api/dire')
          .send(dire)
          .expect(200)
          .end(function (direSaveErr, direSaveRes) {
            // Handle Dire save error
            if (direSaveErr) {
              return done(direSaveErr);
            }

            // Delete an existing Dire
            agent.delete('/api/dire/' + direSaveRes.body._id)
              .send(dire)
              .expect(200)
              .end(function (direDeleteErr, direDeleteRes) {
                // Handle dire error error
                if (direDeleteErr) {
                  return done(direDeleteErr);
                }

                // Set assertions
                (direDeleteRes.body._id).should.equal(direSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Dire if not signed in', function (done) {
    // Set Dire user
    dire.user = user;

    // Create new Dire model instance
    var direObj = new Dire(dire);

    // Save the Dire
    direObj.save(function () {
      // Try deleting Dire
      request(app).delete('/api/dire/' + direObj._id)
        .expect(403)
        .end(function (direDeleteErr, direDeleteRes) {
          // Set message assertion
          (direDeleteRes.body.message).should.match('User is not authorized');

          // Handle Dire error error
          done(direDeleteErr);
        });

    });
  });

  it('should be able to get a single Dire that has an orphaned user reference', function (done) {
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

          // Save a new Dire
          agent.post('/api/dire')
            .send(dire)
            .expect(200)
            .end(function (direSaveErr, direSaveRes) {
              // Handle Dire save error
              if (direSaveErr) {
                return done(direSaveErr);
              }

              // Set assertions on new Dire
              (direSaveRes.body.name).should.equal(dire.name);
              should.exist(direSaveRes.body.user);
              should.equal(direSaveRes.body.user._id, orphanId);

              // force the Dire to have an orphaned user reference
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

                    // Get the Dire
                    agent.get('/api/dire/' + direSaveRes.body._id)
                      .expect(200)
                      .end(function (direInfoErr, direInfoRes) {
                        // Handle Dire error
                        if (direInfoErr) {
                          return done(direInfoErr);
                        }

                        // Set assertions
                        (direInfoRes.body._id).should.equal(direSaveRes.body._id);
                        (direInfoRes.body.name).should.equal(dire.name);
                        should.equal(direInfoRes.body.user, undefined);

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
      Dire.remove().exec(done);
    });
  });
});
