'use strict'

var fs = require('fs')
var http = require('http')
var validUrl = require('valid-url')

function downloadFile (options, callback) {
  if (!options) {
    return callback(new Error('Missing required input: options'), null)
  }

  if (!options.filename) {
    return callback(new Error('Missing required input: options.filename'), null)
  }

  if (!options.url) {
    return callback(new Error('Missing required input: options.url'), null)
  }

  if (!validUrl.isWebUri(options.url)) {
    return callback(new Error('Invalid url: options.url'), null)
  }
  http.get(options.url, function (response) {
    response.pipe(fs.createWriteStream(options.filename))
    response.on('end', function () {
      return callback(null, {message: 'Finished downloading file: ' + options.filename})
    })
  }).on('error', function (e) {
    return callback(e, null)
  })
}

module.exports = downloadFile
