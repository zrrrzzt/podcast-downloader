'use strict';

var level = require('level');
var db = level('./downloadlog');

function dbPut(options, callback) {
  db.put(options.key, options.value, function(error) {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, {message:'Data saved'});
    }
  });
}

function dbGet(key, callback) {
  db.get(key, function(error, value) {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, value);
    }
  });
}

module.exports.dbPut = dbPut;

module.exports.dbGet = dbGet;
