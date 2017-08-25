'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Search = mongoose.model('Search'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  search;

/**
 * Search routes tests
 */
describe('Search CRUD tests', function () {

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

    // Save a user to the test db and create new Search
    user.save(function () {
      search = {
        name: 'Search name'
      };

      done();
    });
  });

  it('should be able to save a Search if logged in', function (done) {
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

        // Save a new Search
        agent.post('/api/searches')
          .send(search)
          .expect(200)
          .end(function (searchSaveErr, searchSaveRes) {
            // Handle Search save error
            if (searchSaveErr) {
              return done(searchSaveErr);
            }

            // Get a list of Searches
            agent.get('/api/searches')
              .end(function (searchesGetErr, searchesGetRes) {
                // Handle Searches save error
                if (searchesGetErr) {
                  return done(searchesGetErr);
                }

                // Get Searches list
                var searches = searchesGetRes.body;

                // Set assertions
                (searches[0].user._id).should.equal(userId);
                (searches[0].name).should.match('Search name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Search if not logged in', function (done) {
    agent.post('/api/searches')
      .send(search)
      .expect(403)
      .end(function (searchSaveErr, searchSaveRes) {
        // Call the assertion callback
        done(searchSaveErr);
      });
  });

  it('should not be able to save an Search if no name is provided', function (done) {
    // Invalidate name field
    search.name = '';

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

        // Save a new Search
        agent.post('/api/searches')
          .send(search)
          .expect(400)
          .end(function (searchSaveErr, searchSaveRes) {
            // Set message assertion
            (searchSaveRes.body.message).should.match('Please fill Search name');

            // Handle Search save error
            done(searchSaveErr);
          });
      });
  });

  it('should be able to update an Search if signed in', function (done) {
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

        // Save a new Search
        agent.post('/api/searches')
          .send(search)
          .expect(200)
          .end(function (searchSaveErr, searchSaveRes) {
            // Handle Search save error
            if (searchSaveErr) {
              return done(searchSaveErr);
            }

            // Update Search name
            search.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Search
            agent.put('/api/searches/' + searchSaveRes.body._id)
              .send(search)
              .expect(200)
              .end(function (searchUpdateErr, searchUpdateRes) {
                // Handle Search update error
                if (searchUpdateErr) {
                  return done(searchUpdateErr);
                }

                // Set assertions
                (searchUpdateRes.body._id).should.equal(searchSaveRes.body._id);
                (searchUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Searches if not signed in', function (done) {
    // Create new Search model instance
    var searchObj = new Search(search);

    // Save the search
    searchObj.save(function () {
      // Request Searches
      request(app).get('/api/searches')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Search if not signed in', function (done) {
    // Create new Search model instance
    var searchObj = new Search(search);

    // Save the Search
    searchObj.save(function () {
      request(app).get('/api/searches/' + searchObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', search.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Search with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/searches/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Search is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Search which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Search
    request(app).get('/api/searches/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Search with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Search if signed in', function (done) {
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

        // Save a new Search
        agent.post('/api/searches')
          .send(search)
          .expect(200)
          .end(function (searchSaveErr, searchSaveRes) {
            // Handle Search save error
            if (searchSaveErr) {
              return done(searchSaveErr);
            }

            // Delete an existing Search
            agent.delete('/api/searches/' + searchSaveRes.body._id)
              .send(search)
              .expect(200)
              .end(function (searchDeleteErr, searchDeleteRes) {
                // Handle search error error
                if (searchDeleteErr) {
                  return done(searchDeleteErr);
                }

                // Set assertions
                (searchDeleteRes.body._id).should.equal(searchSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Search if not signed in', function (done) {
    // Set Search user
    search.user = user;

    // Create new Search model instance
    var searchObj = new Search(search);

    // Save the Search
    searchObj.save(function () {
      // Try deleting Search
      request(app).delete('/api/searches/' + searchObj._id)
        .expect(403)
        .end(function (searchDeleteErr, searchDeleteRes) {
          // Set message assertion
          (searchDeleteRes.body.message).should.match('User is not authorized');

          // Handle Search error error
          done(searchDeleteErr);
        });

    });
  });

  it('should be able to get a single Search that has an orphaned user reference', function (done) {
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

          // Save a new Search
          agent.post('/api/searches')
            .send(search)
            .expect(200)
            .end(function (searchSaveErr, searchSaveRes) {
              // Handle Search save error
              if (searchSaveErr) {
                return done(searchSaveErr);
              }

              // Set assertions on new Search
              (searchSaveRes.body.name).should.equal(search.name);
              should.exist(searchSaveRes.body.user);
              should.equal(searchSaveRes.body.user._id, orphanId);

              // force the Search to have an orphaned user reference
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

                    // Get the Search
                    agent.get('/api/searches/' + searchSaveRes.body._id)
                      .expect(200)
                      .end(function (searchInfoErr, searchInfoRes) {
                        // Handle Search error
                        if (searchInfoErr) {
                          return done(searchInfoErr);
                        }

                        // Set assertions
                        (searchInfoRes.body._id).should.equal(searchSaveRes.body._id);
                        (searchInfoRes.body.name).should.equal(search.name);
                        should.equal(searchInfoRes.body.user, undefined);

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
      Search.remove().exec(done);
    });
  });
});
