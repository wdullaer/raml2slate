'use strict'
const tmp = require('tmp')

function dir (opts) {
  return new Promise((resolve, reject) => {
    tmp.dir(opts || {}, (err, path, cleanup) => {
      if (err) return reject(err)
      resolve({path, cleanup})
    })
  })
}

module.exports = {
  dir,
  dirSync: tmp.dirSync
}
