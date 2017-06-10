'use strict'

var assert = require('assert')
var downloadFile = require('../lib/downloadfile')

describe('downloadFile', function () {
  it('it requires an options object', function (done) {
    var options = false

    downloadFile(options, function (err, data) {
      assert.throws(function () {
        if (err) {
          throw err
        } else {
          console.log(data)
        }
      }, function (err) {
        if ((err instanceof Error) && /Missing required input: options/.test(err)) {
          return true
        }
      },
        'Unexpected error'
      )
      done()
    })
  })

  it('it requires options.filename to exist', function (done) {
    var options = {
      filename: false
    }

    downloadFile(options, function (err, data) {
      assert.throws(function () {
        if (err) {
          throw err
        } else {
          console.log(data)
        }
      }, function (err) {
        if ((err instanceof Error) && /Missing required input: options.filename/.test(err)) {
          return true
        }
      },
        'Unexpected error'
      )
      done()
    })
  })

  it('it requires options.url to exist', function (done) {
    var options = {
      filename: true,
      url: false
    }

    downloadFile(options, function (err, data) {
      assert.throws(function () {
        if (err) {
          throw err
        } else {
          console.log(data)
        }
      }, function (err) {
        if ((err instanceof Error) && /Missing required input: options.url/.test(err)) {
          return true
        }
      },
        'Unexpected error'
      )
      done()
    })
  })

  it('it requires options.url to be a valid url', function (done) {
    var options = {
      filename: true,
      url: 'ThisIsSoNotAValidUrl'
    }

    downloadFile(options, function (err, data) {
      assert.throws(function () {
        if (err) {
          throw err
        } else {
          console.log(data)
        }
      }, function (err) {
        if ((err instanceof Error) && /Invalid url: options.url/.test(err)) {
          return true
        }
      },
        'Unexpected error'
      )
      done()
    })
  })

  it('it returns error on file not found', function (done) {
    var options = {
      filename: 'ThisIsSoNotAValidImage.png',
      url: 'http://www.zrrrzzt.no/ThisIsSoNotAValidImage.png'
    }

    downloadFile(options, function (err, data) {
      assert.throws(function () {
        if (err) {
          throw err
        } else {
          console.log(data)
        }
      }, function (err) {
        if ((err instanceof Error) && /getaddrinfo ENOTFOUND/.test(err)) {
          return true
        }
      },
        'Unexpected error'
      )
      done()
    })
  })

  it('it returns message on finished', function (done) {
    var options = {
      filename: 'index.html',
      url: 'http://www.pythonia.no'
    }

    downloadFile(options, function (err, data) {
      if (err) {
        throw err
      } else {
        assert.equal(data.message, 'Finished downloading file: ' + options.filename)
      }
      done()
    })
  })
})
