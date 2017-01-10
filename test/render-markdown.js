'use strict'
const expect = require('chai').expect
const fs = require('fs')
const renderMarkdown = require('../lib/render-markdown.js')
const tmp = require('../lib/tmp-promise.js')

const RAML = '#%RAML 1.0\ntitle: TME Customer REST API\nbaseUri: https://consumer.toyota-europe.com/\nprotocols: [HTTPS]\nversion: 1.0.0\nmediaType: application/json'
const RAML08 = '#%RAML 0.8\ntitle: TME Customer REST API\nbaseUri: https://consumer.toyota-europe.com/\nprotocols: [HTTPS]\nversion: 1.0.0\nmediaType: application/json'

describe(('render-markdown'), () => {
  it('should return a promise', () => {
    expect(renderMarkdown()).to.be.a('Promise')
  })

  it('should reject if the RAML file is not valid', () => {
    let tmpFile = tmp.fileSync()
    return expect(renderMarkdown(tmpFile.name, './')).to.be.rejected
  })

  it('should reject if the target folder is not writable', () => {
    let tmpFile = tmp.fileSync()
    fs.writeSync(tmpFile.fd, RAML)
    return expect(renderMarkdown(tmpFile.name, 'nodir')).to.be.rejected
  })

  it('should reject if the file is a RAML 0.8 document', () => {
    let tmpFile = tmp.fileSync()
    fs.writeSync(tmpFile.fd, RAML08)
    let resp = tmp.dir()
      .then((result) => renderMarkdown(tmpFile.name, result.path))

    return expect(resp).to.be.rejectedWith('_sourceToRamlObj: only RAML 1.0 is supported!')
  })

  it('should fulfill if the file and target folder are valid', () => {
    let tmpFile = tmp.fileSync()
    fs.writeSync(tmpFile.fd, RAML)
    let resp = tmp.dir()
      .then((result) => renderMarkdown(tmpFile.name, result.path))

    return expect(resp).to.be.fulfilled
  })

  it('should write a file called index.md in the targetDir', () => {
    let tmpFile = tmp.fileSync()
    fs.writeSync(tmpFile.fd, RAML)
    let path
    return tmp.dir()
      .then((result) => {
        path = result.path
        return renderMarkdown(tmpFile.name, result.path)
      })
      .then(() => {
        expect(fs.readdirSync(path)).to.include('index.md')
      })
      .catch((error) => {
        throw error
      })
  })
})
