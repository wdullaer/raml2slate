'use strict'
const expect = require('chai').expect
const fs = require('fs')
const path = require('path')
const tmp = require('../lib/tmp-promise.js')

const getDefaultThemePath = require('../lib').getDefaultThemePath
const render = require('../lib').render

describe('render()', () => {
  it('should return a promise', () => {
    let resp = render({
      input: path.join(__dirname, 'fixtures', 'api.raml'),
      output: tmp.dirSync().name
    })

    expect(resp).to.be.a('Promise')
  })

  it('should render documentation', () => {
    let outputPath

    return tmp.dir()
      .then((result) => {
        outputPath = result.path
        return render({
          input: path.join(__dirname, 'fixtures', 'api.raml'),
          output: outputPath
        })
      })
      .then(() => {
        expect(fs.readdirSync(outputPath)).to.include('index.html')
          .and.include('css')
          .and.include('js')
          .and.include('images')
      })
      .catch((error) => {
        throw error
      })
  })
})

describe('getDefaultThemePath()', () => {
  it('should return the default theme path', () => {
    expect(getDefaultThemePath()).to.be.a('string').that.equals(path.join(__dirname, '../theme/defaults/css/_variables.styl'))
  })
})
