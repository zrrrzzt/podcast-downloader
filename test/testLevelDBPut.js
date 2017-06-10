'use strict'

var assert = require('assert')
var db = require('../lib/leveldb')

describe('dbPut', function () {
  it('it requires an options object', function (done) {
    var options = false

    db.put(options, function (err, data) {
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

  it('it requires options.key to exist', function (done) {
    var options = {
      key: false
    }

    db.put(options, function (err, data) {
      assert.throws(function () {
        if (err) {
          throw err
        } else {
          console.log(data)
        }
      }, function (err) {
        if ((err instanceof Error) && /Missing required input: options.key/.test(err)) {
          return true
        }
      },
        'Unexpected error'
      )
      done()
    })
  })

  it('it requires options.value to exist', function (done) {
    var options = {
      key: true,
      value: false
    }

    db.put(options, function (err, data) {
      assert.throws(function () {
        if (err) {
          throw err
        } else {
          console.log(data)
        }
      }, function (err) {
        if ((err instanceof Error) && /Missing required input: options.value/.test(err)) {
          return true
        }
      },
        'Unexpected error'
      )
      done()
    })
  })

  it('it returns a message on success', function (done) {
    var options = {
      key: 'testKey',
      value: 'testValue'
    }

    db.put(options, function (err, data) {
      if (err) {
        console.error(err)
      } else {
        assert.equal(data.message, 'Data saved')
      }
      done()
    })
  })
})
