
'use strict'
const equal = require('assert-dir-equal')
const Metalsmith = require('metalsmith')
const assets = require('../../../plugins/metalsmith-assets.js')

describe('metalsmith-assets', function () {
  it('should copy assets', function (done) {
    Metalsmith('./test/plugins/metalsmith-assets/fixture')
      .use(assets({
        source: './assets',
        destination: './assets'
      }))
      .build(function (err) {
        if (err) return done(err)
        equal('./test/plugins/metalsmith-assets/fixture/expected', './test/plugins/metalsmith-assets/fixture/build')
        done()
      })
  })
})
