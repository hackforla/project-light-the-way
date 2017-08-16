'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Resource = mongoose.model('Resource'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  resource;

/**
 * Resource routes tests
 */
describe('Resource CRUD tests', function () {

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

    // Save a user to the test db and create new Resource
    user.save(function () {
      resource = {
        name: 'Resource name'
      };

      done();
    });
  });

  it('should be able to save a Resource if logged in', function (done) {
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

        // Save a new Resource
        agent.post('/api/resources')
          .send(resource)
          .expect(200)
          .end(function (resourceSaveErr, resourceSaveRes) {
            // Handle Resource save error
            if (resourceSaveErr) {
              return done(resourceSaveErr);
            }

            // Get a list of Resources
            agent.get('/api/resources')
              .end(function (resourcesGetErr, resourcesGetRes) {
                // Handle Resources save error
                if (resourcesGetErr) {
                  return done(resourcesGetErr);
                }

                // Get Resources list
                var resources = resourcesGetRes.body;

                // Set assertions
                (resources[0].user._id).should.equal(userId);
                (resources[0].name).should.match('Resource name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Resource if not logged in', function (done) {
    agent.post('/api/resources')
      .send(resource)
      .expect(403)
      .end(function (resourceSaveErr, resourceSaveRes) {
        // Call the assertion callback
        done(resourceSaveErr);
      });
  });

  it('should not be able to save an Resource if no name is provided', function (done) {
    // Invalidate name field
    resource.name = '';

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

        // Save a new Resource
        agent.post('/api/resources')
          .send(resource)
          .expect(400)
          .end(function (resourceSaveErr, resourceSaveRes) {
            // Set message assertion
            (resourceSaveRes.body.message).should.match('Please fill Resource name');

            // Handle Resource save error
            done(resourceSaveErr);
          });
      });
  });

  it('should be able to update an Resource if signed in', function (done) {
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

        // Save a new Resource
        agent.post('/api/resources')
          .send(resource)
          .expect(200)
          .end(function (resourceSaveErr, resourceSaveRes) {
            // Handle Resource save error
            if (resourceSaveErr) {
              return done(resourceSaveErr);
            }

            // Update Resource name
            resource.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Resource
            agent.put('/api/resources/' + resourceSaveRes.body._id)
              .send(resource)
              .expect(200)
              .end(function (resourceUpdateErr, resourceUpdateRes) {
                // Handle Resource update error
                if (resourceUpdateErr) {
                  return done(resourceUpdateErr);
                }

                // Set assertions
                (resourceUpdateRes.body._id).should.equal(resourceSaveRes.body._id);
                (resourceUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Resources if not signed in', function (done) {
    // Create new Resource model instance
    var resourceObj = new Resource(resource);

    // Save the resource
    resourceObj.save(function () {
      // Request Resources
      request(app).get('/api/resources')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Resource if not signed in', function (done) {
    // Create new Resource model instance
    var resourceObj = new Resource(resource);

    // Save the Resource
    resourceObj.save(function () {
      request(app).get('/api/resources/' + resourceObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', resource.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Resource with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/resources/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Resource is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Resource which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Resource
    request(app).get('/api/resources/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Resource with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Resource if signed in', function (done) {
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

        // Save a new Resource
        agent.post('/api/resources')
          .send(resource)
          .expect(200)
          .end(function (resourceSaveErr, resourceSaveRes) {
            // Handle Resource save error
            if (resourceSaveErr) {
              return done(resourceSaveErr);
            }

            // Delete an existing Resource
            agent.delete('/api/resources/' + resourceSaveRes.body._id)
              .send(resource)
              .expect(200)
              .end(function (resourceDeleteErr, resourceDeleteRes) {
                // Handle resource error error
                if (resourceDeleteErr) {
                  return done(resourceDeleteErr);
                }

                // Set assertions
                (resourceDeleteRes.body._id).should.equal(resourceSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Resource if not signed in', function (done) {
    // Set Resource user
    resource.user = user;

    // Create new Resource model instance
    var resourceObj = new Resource(resource);

    // Save the Resource
    resourceObj.save(function () {
      // Try deleting Resource
      request(app).delete('/api/resources/' + resourceObj._id)
        .expect(403)
        .end(function (resourceDeleteErr, resourceDeleteRes) {
          // Set message assertion
          (resourceDeleteRes.body.message).should.match('User is not authorized');

          // Handle Resource error error
          done(resourceDeleteErr);
        });

    });
  });

  it('should be able to get a single Resource that has an orphaned user reference', function (done) {
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

          // Save a new Resource
          agent.post('/api/resources')
            .send(resource)
            .expect(200)
            .end(function (resourceSaveErr, resourceSaveRes) {
              // Handle Resource save error
              if (resourceSaveErr) {
                return done(resourceSaveErr);
              }

              // Set assertions on new Resource
              (resourceSaveRes.body.name).should.equal(resource.name);
              should.exist(resourceSaveRes.body.user);
              should.equal(resourceSaveRes.body.user._id, orphanId);

              // force the Resource to have an orphaned user reference
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

                    // Get the Resource
                    agent.get('/api/resources/' + resourceSaveRes.body._id)
                      .expect(200)
                      .end(function (resourceInfoErr, resourceInfoRes) {
                        // Handle Resource error
                        if (resourceInfoErr) {
                          return done(resourceInfoErr);
                        }

                        // Set assertions
                        (resourceInfoRes.body._id).should.equal(resourceSaveRes.body._id);
                        (resourceInfoRes.body.name).should.equal(resource.name);
                        should.equal(resourceInfoRes.body.user, undefined);

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
      Resource.remove().exec(done);
    });
  });
});
