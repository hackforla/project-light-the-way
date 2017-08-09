'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  TestPage = mongoose.model('TestPage'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  testPage;

/**
 * Test page routes tests
 */
describe('Test page CRUD tests', function () {

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

    // Save a user to the test db and create new Test page
    user.save(function () {
      testPage = {
        name: 'Test page name'
      };

      done();
    });
  });

  it('should be able to save a Test page if logged in', function (done) {
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

        // Save a new Test page
        agent.post('/api/testPages')
          .send(testPage)
          .expect(200)
          .end(function (testPageSaveErr, testPageSaveRes) {
            // Handle Test page save error
            if (testPageSaveErr) {
              return done(testPageSaveErr);
            }

            // Get a list of Test pages
            agent.get('/api/testPages')
              .end(function (testPagesGetErr, testPagesGetRes) {
                // Handle Test pages save error
                if (testPagesGetErr) {
                  return done(testPagesGetErr);
                }

                // Get Test pages list
                var testPages = testPagesGetRes.body;

                // Set assertions
                (testPages[0].user._id).should.equal(userId);
                (testPages[0].name).should.match('Test page name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Test page if not logged in', function (done) {
    agent.post('/api/testPages')
      .send(testPage)
      .expect(403)
      .end(function (testPageSaveErr, testPageSaveRes) {
        // Call the assertion callback
        done(testPageSaveErr);
      });
  });

  it('should not be able to save an Test page if no name is provided', function (done) {
    // Invalidate name field
    testPage.name = '';

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

        // Save a new Test page
        agent.post('/api/testPages')
          .send(testPage)
          .expect(400)
          .end(function (testPageSaveErr, testPageSaveRes) {
            // Set message assertion
            (testPageSaveRes.body.message).should.match('Please fill Test page name');

            // Handle Test page save error
            done(testPageSaveErr);
          });
      });
  });

  it('should be able to update an Test page if signed in', function (done) {
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

        // Save a new Test page
        agent.post('/api/testPages')
          .send(testPage)
          .expect(200)
          .end(function (testPageSaveErr, testPageSaveRes) {
            // Handle Test page save error
            if (testPageSaveErr) {
              return done(testPageSaveErr);
            }

            // Update Test page name
            testPage.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Test page
            agent.put('/api/testPages/' + testPageSaveRes.body._id)
              .send(testPage)
              .expect(200)
              .end(function (testPageUpdateErr, testPageUpdateRes) {
                // Handle Test page update error
                if (testPageUpdateErr) {
                  return done(testPageUpdateErr);
                }

                // Set assertions
                (testPageUpdateRes.body._id).should.equal(testPageSaveRes.body._id);
                (testPageUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Test pages if not signed in', function (done) {
    // Create new Test page model instance
    var testPageObj = new TestPage(testPage);

    // Save the testPage
    testPageObj.save(function () {
      // Request Test pages
      request(app).get('/api/testPages')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Test page if not signed in', function (done) {
    // Create new Test page model instance
    var testPageObj = new TestPage(testPage);

    // Save the Test page
    testPageObj.save(function () {
      request(app).get('/api/testPages/' + testPageObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', testPage.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Test page with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/testPages/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Test page is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Test page which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Test page
    request(app).get('/api/testPages/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Test page with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Test page if signed in', function (done) {
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

        // Save a new Test page
        agent.post('/api/testPages')
          .send(testPage)
          .expect(200)
          .end(function (testPageSaveErr, testPageSaveRes) {
            // Handle Test page save error
            if (testPageSaveErr) {
              return done(testPageSaveErr);
            }

            // Delete an existing Test page
            agent.delete('/api/testPages/' + testPageSaveRes.body._id)
              .send(testPage)
              .expect(200)
              .end(function (testPageDeleteErr, testPageDeleteRes) {
                // Handle testPage error error
                if (testPageDeleteErr) {
                  return done(testPageDeleteErr);
                }

                // Set assertions
                (testPageDeleteRes.body._id).should.equal(testPageSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Test page if not signed in', function (done) {
    // Set Test page user
    testPage.user = user;

    // Create new Test page model instance
    var testPageObj = new TestPage(testPage);

    // Save the Test page
    testPageObj.save(function () {
      // Try deleting Test page
      request(app).delete('/api/testPages/' + testPageObj._id)
        .expect(403)
        .end(function (testPageDeleteErr, testPageDeleteRes) {
          // Set message assertion
          (testPageDeleteRes.body.message).should.match('User is not authorized');

          // Handle Test page error error
          done(testPageDeleteErr);
        });

    });
  });

  it('should be able to get a single Test page that has an orphaned user reference', function (done) {
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

          // Save a new Test page
          agent.post('/api/testPages')
            .send(testPage)
            .expect(200)
            .end(function (testPageSaveErr, testPageSaveRes) {
              // Handle Test page save error
              if (testPageSaveErr) {
                return done(testPageSaveErr);
              }

              // Set assertions on new Test page
              (testPageSaveRes.body.name).should.equal(testPage.name);
              should.exist(testPageSaveRes.body.user);
              should.equal(testPageSaveRes.body.user._id, orphanId);

              // force the Test page to have an orphaned user reference
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

                    // Get the Test page
                    agent.get('/api/testPages/' + testPageSaveRes.body._id)
                      .expect(200)
                      .end(function (testPageInfoErr, testPageInfoRes) {
                        // Handle Test page error
                        if (testPageInfoErr) {
                          return done(testPageInfoErr);
                        }

                        // Set assertions
                        (testPageInfoRes.body._id).should.equal(testPageSaveRes.body._id);
                        (testPageInfoRes.body.name).should.equal(testPage.name);
                        should.equal(testPageInfoRes.body.user, undefined);

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
      TestPage.remove().exec(done);
    });
  });
});
