'use strict'
const stylus = require('stylus')
const minimatch = require('minimatch')
const resolve = require('path').resolve

function plugin (opts) {
  opts = opts || {}
  opts.paths = (opts.paths || []).map((item) => resolve(item))

  return function (files, metalsmith, done) {
    const source = metalsmith.source()
    const styles = Object.keys(files).filter(minimatch.filter('*.+(styl|stylus)', {matchBase: true}))

    const paths = styles.map(function (path) {
      const ret = path.split('/')
      ret.pop()
      return source + '/' + ret.join('/')
    })

    opts.paths = paths.concat(opts.paths)

    styles.forEach(function (file, index, arr) {
      let out = file.split('.')
      out.pop()
      out = out.join('.') + '.css'
      let s = stylus(files[file].contents.toString())
        .set('filename', file)

      for (let o in opts) {
        if (o === 'use' || o === 'define') { continue }
        s.set(o, opts[o])
      }
      if (opts.use) opts.use.forEach((fn) => s.use(fn))
      if (opts.define) {
        for (let d in opts.define) {
          s.define(d, opts.define[d])
        }
      }

      s.render(function (err, css) {
        if (err) throw err
        delete files[file]
        files[out] = { contents: new Buffer(css) }
        if (opts.sourcemap) {
          files[out + '.map'] = { contents: new Buffer(JSON.stringify(s.sourcemap)) }
        }
      })
    })
    done()
  }
}

module.exports = plugin
