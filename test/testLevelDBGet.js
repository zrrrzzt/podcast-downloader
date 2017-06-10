'use strict'

var assert = require('assert')
var db = require('../lib/leveldb')

describe('dbGet', function () {
  it('it requires a key', function (done) {
    var key = false

    db.get(key, function (err, data) {
      assert.throws(function () {
        if (err) {
          throw err
        } else {
          console.log(data)
        }
      }, function (err) {
        if ((err instanceof Error) && /Missing required input: key/.test(err)) {
          return true
        }
      },
        'Unexpected error'
      )
      done()
    })
  })

  it('it will return error if key not found', function (done) {
    var key = 'YabbaDabbaDooooooo'

    db.get(key, function (err, data) {
      if (err) {
        assert(err.notFound)
      } else {
        console.log(console.log(data))
      }
      done()
    })
  })

  it('it returns value if key is found', function (done) {
    var key = 'testKey'

    db.get(key, function (err, data) {
      if (err) {
        console.error(err)
      } else {
        assert.equal(data, 'testValue')
      }
      done()
    })
  })
})
