'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Vet = mongoose.model('Vet'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  vet;

/**
 * Vet routes tests
 */
describe('Vet CRUD tests', function () {

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

    // Save a user to the test db and create new Vet
    user.save(function () {
      vet = {
        name: 'Vet name'
      };

      done();
    });
  });

  it('should be able to save a Vet if logged in', function (done) {
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

        // Save a new Vet
        agent.post('/api/vets')
          .send(vet)
          .expect(200)
          .end(function (vetSaveErr, vetSaveRes) {
            // Handle Vet save error
            if (vetSaveErr) {
              return done(vetSaveErr);
            }

            // Get a list of Vets
            agent.get('/api/vets')
              .end(function (vetsGetErr, vetsGetRes) {
                // Handle Vets save error
                if (vetsGetErr) {
                  return done(vetsGetErr);
                }

                // Get Vets list
                var vets = vetsGetRes.body;

                // Set assertions
                (vets[0].user._id).should.equal(userId);
                (vets[0].name).should.match('Vet name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Vet if not logged in', function (done) {
    agent.post('/api/vets')
      .send(vet)
      .expect(403)
      .end(function (vetSaveErr, vetSaveRes) {
        // Call the assertion callback
        done(vetSaveErr);
      });
  });

  it('should not be able to save an Vet if no name is provided', function (done) {
    // Invalidate name field
    vet.name = '';

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

        // Save a new Vet
        agent.post('/api/vets')
          .send(vet)
          .expect(400)
          .end(function (vetSaveErr, vetSaveRes) {
            // Set message assertion
            (vetSaveRes.body.message).should.match('Please fill Vet name');

            // Handle Vet save error
            done(vetSaveErr);
          });
      });
  });

  it('should be able to update an Vet if signed in', function (done) {
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

        // Save a new Vet
        agent.post('/api/vets')
          .send(vet)
          .expect(200)
          .end(function (vetSaveErr, vetSaveRes) {
            // Handle Vet save error
            if (vetSaveErr) {
              return done(vetSaveErr);
            }

            // Update Vet name
            vet.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Vet
            agent.put('/api/vets/' + vetSaveRes.body._id)
              .send(vet)
              .expect(200)
              .end(function (vetUpdateErr, vetUpdateRes) {
                // Handle Vet update error
                if (vetUpdateErr) {
                  return done(vetUpdateErr);
                }

                // Set assertions
                (vetUpdateRes.body._id).should.equal(vetSaveRes.body._id);
                (vetUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Vets if not signed in', function (done) {
    // Create new Vet model instance
    var vetObj = new Vet(vet);

    // Save the vet
    vetObj.save(function () {
      // Request Vets
      request(app).get('/api/vets')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Vet if not signed in', function (done) {
    // Create new Vet model instance
    var vetObj = new Vet(vet);

    // Save the Vet
    vetObj.save(function () {
      request(app).get('/api/vets/' + vetObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', vet.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Vet with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/vets/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Vet is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Vet which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Vet
    request(app).get('/api/vets/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Vet with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Vet if signed in', function (done) {
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

        // Save a new Vet
        agent.post('/api/vets')
          .send(vet)
          .expect(200)
          .end(function (vetSaveErr, vetSaveRes) {
            // Handle Vet save error
            if (vetSaveErr) {
              return done(vetSaveErr);
            }

            // Delete an existing Vet
            agent.delete('/api/vets/' + vetSaveRes.body._id)
              .send(vet)
              .expect(200)
              .end(function (vetDeleteErr, vetDeleteRes) {
                // Handle vet error error
                if (vetDeleteErr) {
                  return done(vetDeleteErr);
                }

                // Set assertions
                (vetDeleteRes.body._id).should.equal(vetSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Vet if not signed in', function (done) {
    // Set Vet user
    vet.user = user;

    // Create new Vet model instance
    var vetObj = new Vet(vet);

    // Save the Vet
    vetObj.save(function () {
      // Try deleting Vet
      request(app).delete('/api/vets/' + vetObj._id)
        .expect(403)
        .end(function (vetDeleteErr, vetDeleteRes) {
          // Set message assertion
          (vetDeleteRes.body.message).should.match('User is not authorized');

          // Handle Vet error error
          done(vetDeleteErr);
        });

    });
  });

  it('should be able to get a single Vet that has an orphaned user reference', function (done) {
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

          // Save a new Vet
          agent.post('/api/vets')
            .send(vet)
            .expect(200)
            .end(function (vetSaveErr, vetSaveRes) {
              // Handle Vet save error
              if (vetSaveErr) {
                return done(vetSaveErr);
              }

              // Set assertions on new Vet
              (vetSaveRes.body.name).should.equal(vet.name);
              should.exist(vetSaveRes.body.user);
              should.equal(vetSaveRes.body.user._id, orphanId);

              // force the Vet to have an orphaned user reference
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

                    // Get the Vet
                    agent.get('/api/vets/' + vetSaveRes.body._id)
                      .expect(200)
                      .end(function (vetInfoErr, vetInfoRes) {
                        // Handle Vet error
                        if (vetInfoErr) {
                          return done(vetInfoErr);
                        }

                        // Set assertions
                        (vetInfoRes.body._id).should.equal(vetSaveRes.body._id);
                        (vetInfoRes.body.name).should.equal(vet.name);
                        should.equal(vetInfoRes.body.user, undefined);

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
      Vet.remove().exec(done);
    });
  });
});
