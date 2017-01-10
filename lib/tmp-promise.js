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

function file (opts) {
  return new Promise((resolve, reject) => {
    tmp.file(opts || {}, (err, path, fd, cleanup) => {
      if (err) return reject(err)
      resolve({path, fd, cleanup})
    })
  })
}

module.exports = {
  dir,
  dirSync: tmp.dirSync,
  file,
  fileSync: tmp.fileSync
}
