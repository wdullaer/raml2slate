
'use strict'
const assertDir = require('assert-dir-equal')
const stylus = require('../../../plugins/metalsmith-stylus.js')
const Metalsmith = require('metalsmith')

describe('metalsmith-stylus', function () {
  it('should convert stylus files to css', function (done) {
    Metalsmith('./test/plugins/metalsmith-stylus/fixtures/basic')
      .use(stylus())
      .build(function (err) {
        if (err) return done(err)
        assertDir('./test/plugins/metalsmith-stylus/fixtures/basic/expected', './test/plugins/metalsmith-stylus/fixtures/basic/build')
        return done(null)
      })
  })
})
