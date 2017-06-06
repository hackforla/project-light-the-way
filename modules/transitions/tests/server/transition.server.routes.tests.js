'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Transition = mongoose.model('Transition'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  transition;

/**
 * Transition routes tests
 */
describe('Transition CRUD tests', function () {

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

    // Save a user to the test db and create new Transition
    user.save(function () {
      transition = {
        name: 'Transition name'
      };

      done();
    });
  });

  it('should be able to save a Transition if logged in', function (done) {
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

        // Save a new Transition
        agent.post('/api/transitions')
          .send(transition)
          .expect(200)
          .end(function (transitionSaveErr, transitionSaveRes) {
            // Handle Transition save error
            if (transitionSaveErr) {
              return done(transitionSaveErr);
            }

            // Get a list of Transitions
            agent.get('/api/transitions')
              .end(function (transitionsGetErr, transitionsGetRes) {
                // Handle Transitions save error
                if (transitionsGetErr) {
                  return done(transitionsGetErr);
                }

                // Get Transitions list
                var transitions = transitionsGetRes.body;

                // Set assertions
                (transitions[0].user._id).should.equal(userId);
                (transitions[0].name).should.match('Transition name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Transition if not logged in', function (done) {
    agent.post('/api/transitions')
      .send(transition)
      .expect(403)
      .end(function (transitionSaveErr, transitionSaveRes) {
        // Call the assertion callback
        done(transitionSaveErr);
      });
  });

  it('should not be able to save an Transition if no name is provided', function (done) {
    // Invalidate name field
    transition.name = '';

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

        // Save a new Transition
        agent.post('/api/transitions')
          .send(transition)
          .expect(400)
          .end(function (transitionSaveErr, transitionSaveRes) {
            // Set message assertion
            (transitionSaveRes.body.message).should.match('Please fill Transition name');

            // Handle Transition save error
            done(transitionSaveErr);
          });
      });
  });

  it('should be able to update an Transition if signed in', function (done) {
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

        // Save a new Transition
        agent.post('/api/transitions')
          .send(transition)
          .expect(200)
          .end(function (transitionSaveErr, transitionSaveRes) {
            // Handle Transition save error
            if (transitionSaveErr) {
              return done(transitionSaveErr);
            }

            // Update Transition name
            transition.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Transition
            agent.put('/api/transitions/' + transitionSaveRes.body._id)
              .send(transition)
              .expect(200)
              .end(function (transitionUpdateErr, transitionUpdateRes) {
                // Handle Transition update error
                if (transitionUpdateErr) {
                  return done(transitionUpdateErr);
                }

                // Set assertions
                (transitionUpdateRes.body._id).should.equal(transitionSaveRes.body._id);
                (transitionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Transitions if not signed in', function (done) {
    // Create new Transition model instance
    var transitionObj = new Transition(transition);

    // Save the transition
    transitionObj.save(function () {
      // Request Transitions
      request(app).get('/api/transitions')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Transition if not signed in', function (done) {
    // Create new Transition model instance
    var transitionObj = new Transition(transition);

    // Save the Transition
    transitionObj.save(function () {
      request(app).get('/api/transitions/' + transitionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', transition.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Transition with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/transitions/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Transition is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Transition which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Transition
    request(app).get('/api/transitions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Transition with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Transition if signed in', function (done) {
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

        // Save a new Transition
        agent.post('/api/transitions')
          .send(transition)
          .expect(200)
          .end(function (transitionSaveErr, transitionSaveRes) {
            // Handle Transition save error
            if (transitionSaveErr) {
              return done(transitionSaveErr);
            }

            // Delete an existing Transition
            agent.delete('/api/transitions/' + transitionSaveRes.body._id)
              .send(transition)
              .expect(200)
              .end(function (transitionDeleteErr, transitionDeleteRes) {
                // Handle transition error error
                if (transitionDeleteErr) {
                  return done(transitionDeleteErr);
                }

                // Set assertions
                (transitionDeleteRes.body._id).should.equal(transitionSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Transition if not signed in', function (done) {
    // Set Transition user
    transition.user = user;

    // Create new Transition model instance
    var transitionObj = new Transition(transition);

    // Save the Transition
    transitionObj.save(function () {
      // Try deleting Transition
      request(app).delete('/api/transitions/' + transitionObj._id)
        .expect(403)
        .end(function (transitionDeleteErr, transitionDeleteRes) {
          // Set message assertion
          (transitionDeleteRes.body.message).should.match('User is not authorized');

          // Handle Transition error error
          done(transitionDeleteErr);
        });

    });
  });

  it('should be able to get a single Transition that has an orphaned user reference', function (done) {
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

          // Save a new Transition
          agent.post('/api/transitions')
            .send(transition)
            .expect(200)
            .end(function (transitionSaveErr, transitionSaveRes) {
              // Handle Transition save error
              if (transitionSaveErr) {
                return done(transitionSaveErr);
              }

              // Set assertions on new Transition
              (transitionSaveRes.body.name).should.equal(transition.name);
              should.exist(transitionSaveRes.body.user);
              should.equal(transitionSaveRes.body.user._id, orphanId);

              // force the Transition to have an orphaned user reference
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

                    // Get the Transition
                    agent.get('/api/transitions/' + transitionSaveRes.body._id)
                      .expect(200)
                      .end(function (transitionInfoErr, transitionInfoRes) {
                        // Handle Transition error
                        if (transitionInfoErr) {
                          return done(transitionInfoErr);
                        }

                        // Set assertions
                        (transitionInfoRes.body._id).should.equal(transitionSaveRes.body._id);
                        (transitionInfoRes.body.name).should.equal(transition.name);
                        should.equal(transitionInfoRes.body.user, undefined);

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
      Transition.remove().exec(done);
    });
  });
});
