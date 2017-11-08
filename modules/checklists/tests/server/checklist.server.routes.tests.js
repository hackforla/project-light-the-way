'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Checklist = mongoose.model('Checklist'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  checklist;

/**
 * Checklist routes tests
 */
describe('Checklist CRUD tests', function () {

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

    // Save a user to the test db and create new Checklist
    user.save(function () {
      checklist = {
        name: 'Checklist name'
      };

      done();
    });
  });

  it('should be able to save a Checklist if logged in', function (done) {
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

        // Save a new Checklist
        agent.post('/api/checklists')
          .send(checklist)
          .expect(200)
          .end(function (checklistSaveErr, checklistSaveRes) {
            // Handle Checklist save error
            if (checklistSaveErr) {
              return done(checklistSaveErr);
            }

            // Get a list of Checklists
            agent.get('/api/checklists')
              .end(function (checklistsGetErr, checklistsGetRes) {
                // Handle Checklists save error
                if (checklistsGetErr) {
                  return done(checklistsGetErr);
                }

                // Get Checklists list
                var checklists = checklistsGetRes.body;

                // Set assertions
                (checklists[0].user._id).should.equal(userId);
                (checklists[0].name).should.match('Checklist name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Checklist if not logged in', function (done) {
    agent.post('/api/checklists')
      .send(checklist)
      .expect(403)
      .end(function (checklistSaveErr, checklistSaveRes) {
        // Call the assertion callback
        done(checklistSaveErr);
      });
  });

  it('should not be able to save an Checklist if no name is provided', function (done) {
    // Invalidate name field
    checklist.name = '';

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

        // Save a new Checklist
        agent.post('/api/checklists')
          .send(checklist)
          .expect(400)
          .end(function (checklistSaveErr, checklistSaveRes) {
            // Set message assertion
            (checklistSaveRes.body.message).should.match('Please fill Checklist name');

            // Handle Checklist save error
            done(checklistSaveErr);
          });
      });
  });

  it('should be able to update an Checklist if signed in', function (done) {
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

        // Save a new Checklist
        agent.post('/api/checklists')
          .send(checklist)
          .expect(200)
          .end(function (checklistSaveErr, checklistSaveRes) {
            // Handle Checklist save error
            if (checklistSaveErr) {
              return done(checklistSaveErr);
            }

            // Update Checklist name
            checklist.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Checklist
            agent.put('/api/checklists/' + checklistSaveRes.body._id)
              .send(checklist)
              .expect(200)
              .end(function (checklistUpdateErr, checklistUpdateRes) {
                // Handle Checklist update error
                if (checklistUpdateErr) {
                  return done(checklistUpdateErr);
                }

                // Set assertions
                (checklistUpdateRes.body._id).should.equal(checklistSaveRes.body._id);
                (checklistUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Checklists if not signed in', function (done) {
    // Create new Checklist model instance
    var checklistObj = new Checklist(checklist);

    // Save the checklist
    checklistObj.save(function () {
      // Request Checklists
      request(app).get('/api/checklists')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Checklist if not signed in', function (done) {
    // Create new Checklist model instance
    var checklistObj = new Checklist(checklist);

    // Save the Checklist
    checklistObj.save(function () {
      request(app).get('/api/checklists/' + checklistObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', checklist.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Checklist with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/checklists/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Checklist is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Checklist which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Checklist
    request(app).get('/api/checklists/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Checklist with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Checklist if signed in', function (done) {
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

        // Save a new Checklist
        agent.post('/api/checklists')
          .send(checklist)
          .expect(200)
          .end(function (checklistSaveErr, checklistSaveRes) {
            // Handle Checklist save error
            if (checklistSaveErr) {
              return done(checklistSaveErr);
            }

            // Delete an existing Checklist
            agent.delete('/api/checklists/' + checklistSaveRes.body._id)
              .send(checklist)
              .expect(200)
              .end(function (checklistDeleteErr, checklistDeleteRes) {
                // Handle checklist error error
                if (checklistDeleteErr) {
                  return done(checklistDeleteErr);
                }

                // Set assertions
                (checklistDeleteRes.body._id).should.equal(checklistSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Checklist if not signed in', function (done) {
    // Set Checklist user
    checklist.user = user;

    // Create new Checklist model instance
    var checklistObj = new Checklist(checklist);

    // Save the Checklist
    checklistObj.save(function () {
      // Try deleting Checklist
      request(app).delete('/api/checklists/' + checklistObj._id)
        .expect(403)
        .end(function (checklistDeleteErr, checklistDeleteRes) {
          // Set message assertion
          (checklistDeleteRes.body.message).should.match('User is not authorized');

          // Handle Checklist error error
          done(checklistDeleteErr);
        });

    });
  });

  it('should be able to get a single Checklist that has an orphaned user reference', function (done) {
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

          // Save a new Checklist
          agent.post('/api/checklists')
            .send(checklist)
            .expect(200)
            .end(function (checklistSaveErr, checklistSaveRes) {
              // Handle Checklist save error
              if (checklistSaveErr) {
                return done(checklistSaveErr);
              }

              // Set assertions on new Checklist
              (checklistSaveRes.body.name).should.equal(checklist.name);
              should.exist(checklistSaveRes.body.user);
              should.equal(checklistSaveRes.body.user._id, orphanId);

              // force the Checklist to have an orphaned user reference
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

                    // Get the Checklist
                    agent.get('/api/checklists/' + checklistSaveRes.body._id)
                      .expect(200)
                      .end(function (checklistInfoErr, checklistInfoRes) {
                        // Handle Checklist error
                        if (checklistInfoErr) {
                          return done(checklistInfoErr);
                        }

                        // Set assertions
                        (checklistInfoRes.body._id).should.equal(checklistSaveRes.body._id);
                        (checklistInfoRes.body.name).should.equal(checklist.name);
                        should.equal(checklistInfoRes.body.user, undefined);

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
      Checklist.remove().exec(done);
    });
  });
});
