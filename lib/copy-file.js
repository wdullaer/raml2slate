'use strict'
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

function copyFile (source, dest) {
  return new Promise((resolve, reject) => {
    mkdirp(path.dirname(dest), (error) => {
      if (error) return reject(error)
      fs.createReadStream(source)
        .on('error', reject)
        .pipe(fs.createWriteStream(dest))
        .on('close', resolve)
        .on('error', reject)
    })
  })
}

module.exports = copyFile
