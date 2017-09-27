'use strict';

// Protractor configuration
var config = {
  specs: ['modules/*/tests/e2e/*.js'],
  chromeOnly: true,
  directConnect: true
};

if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'firefox'
  };
}

exports.config = config;
