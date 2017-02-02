'use strict'
const fs = require('fs')
const path = require('path')
const readdir = require('recursive-readdir')
const Mode = require('stat-mode')

/**
 * Expose `assets`.
 */

module.exports = assets

/**
 * Default plugin options
 */
const defaults = {
  source: './public',
  destination: '.'
}

/**
 * Metalsmith plugin to include static assets.
 *
 * @param {Object} options (optional)
 *   @property {String} source Path to copy static assets from (relative to working directory). Defaults to './public'
 *   @property {String} destination Path to copy static assets to (relative to destination directory). Defaults to '.'
 * @return {Function}
 */
function assets (options) {
  options.source = options.source ? options.source : defaults.source
  options.destination = options.destination ? options.destination : defaults.destination

  return function (files, metalsmith, done) {
    const src = metalsmith.path(options.source)
    const dest = options.destination

    // copied almost line for line from https://github.com/segmentio/metalsmith/blob/master/lib/index.js
    readdir(src, function (err, arr) {
      if (err) return done(err)

      Promise.all(arr.map(read))
        .then((result) => {
          result = result.reduce((output, item, index) => {
            const name = path.join(dest, path.relative(src, arr[index]))
            output[name] = item
            return output
          }, files)
          done(undefined, result)
        })
        .catch(done)
    })
  }
}

function read (file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, function (err, stats) {
      if (err) return reject(err)
      fs.readFile(file, function (err, buffer) {
        if (err) return reject(err)
        let file = {}

        file.contents = buffer

        file.mode = Mode(stats).toOctal()
        resolve(file)
      })
    })
  })
}
