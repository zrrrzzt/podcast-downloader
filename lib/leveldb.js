'use strict';

var level = require('level');
var db = level('./downloadlog');

function dbPut(options, callback) {
  if (!options) {
    return callback(new Error('Missing required input: options'), null);
  }
  if (!options.key) {
    return callback(new Error('Missing required input: options.key'), null);
  }
  if (!options.value) {
    return callback(new Error('Missing required input: options.value'), null);
  }
  db.put(options.key, options.value, function(error) {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, {message:'Data saved'});
    }
  });
}

function dbGet(key, callback) {
  if (!key) {
    return callback(new Error('Missing required input: key'), null);
  }
  db.get(key, function(error, value) {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, value);
    }
  });
}

module.exports.put = dbPut;

module.exports.get = dbGet;
