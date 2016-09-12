'use strict'
const {expect} = require('chai')
const fs = require('fs')
const path = require('path')
const tmp = require('tmp')

const copyFile = require('../lib/copy-file')

describe('copy-file', () => {
  it('should return a promise', () => {
    let tmpDir = tmp.dirSync().name
    return expect(copyFile(path.join(tmpDir, 'sourcefile'), path.join(tmpDir, 'destfile'))).to.be.a('promise')
  })

  it('should reject if the source file does not exist', () => {
    let tmpDir = tmp.dirSync().name
    return expect(copyFile('/i/do/not/exist', path.join(tmpDir, 'destfile'))).to.be.rejected
  })

  it('should reject if the destination directory cannot be created', () => {
    let sourceFile = path.join(__dirname, '../README.md')
    return expect(copyFile(sourceFile, '/root/subdir/destfile')).to.be.rejected
  })

  it('should reject if the destination file cannot be created', () => {
    let sourceFile = path.join(__dirname, '../README.md')
    return expect(copyFile(sourceFile, '/root/destfile')).to.be.rejected
  })

  it('should copy the file', () => {
    let tmpDir = tmp.dirSync().name
    let sourceFile = path.join(__dirname, '../README.md')
    let destFile = path.join(tmpDir, 'README.md')
    return copyFile(sourceFile, destFile)
      .then(() => {
        expect(fs.readdirSync(path.dirname(sourceFile))).to.include('README.md')
        expect(fs.readFileSync(destFile, 'utf8')).to.equal(fs.readFileSync(sourceFile, 'utf8'))
      })
      .catch((error) => {
        throw error
      })
  })

  it('should create subdirectories to the destination', () => {
    let tmpDir = tmp.dirSync().name
    let sourceFile = path.join(__dirname, '../README.md')
    let destFile = path.join(tmpDir, 'sub', 'directory', 'README.md')
    return copyFile(sourceFile, destFile)
      .then(() => {
        expect(fs.readdirSync(tmpDir)).to.include('sub')
        expect(fs.readdirSync(path.join(tmpDir, 'sub'))).to.include('directory')
        expect(fs.readdirSync(path.join(tmpDir, 'sub', 'directory'))).to.include('README.md')
      })
      .catch((error) => {
        throw error
      })
  })
})
