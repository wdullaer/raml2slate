'use strict'
const {expect} = require('chai')
const fs = require('fs')
const renderMarkdown = require('../lib/render-markdown.js')
const tmp = require('../lib/tmp-promise.js')

const RAML = '#%RAML 0.8\ntitle: TME Customer REST API\nbaseUri: https://consumer.toyota-europe.com/\nprotocols: [HTTPS]\nversion: 1.0.0\nmediaType: application/json'

describe(('render-markdown'), () => {
  it('should return a promise', () => {
    expect(renderMarkdown()).to.be.a('Promise')
  })

  it('should reject if the RAML file is not valid', () => {
    return expect(renderMarkdown('nofile', './')).to.be.rejected
  })

  it('should reject if the target folder is not writable', () => {
    return expect(renderMarkdown(RAML, 'nodir')).to.be.rejected
  })

  it('should fulfill if the file and target folder are valid', () => {
    let resp = tmp.dir()
      .then((result) => renderMarkdown(RAML, result.path))

    return expect(resp).to.be.fulfilled
  })

  it('should write a file called index.md in the targetDir', () => {
    let path
    return tmp.dir()
      .then((result) => {
        path = result.path
        return renderMarkdown(RAML, result.path)
      })
      .then(() => {
        expect(fs.readdirSync(path)).to.include('index.md')
      })
      .catch((error) => {
        throw error
      })
  })
})
