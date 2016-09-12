'use strict'
const {expect} = require('chai')
const immutable = require('immutable')
const path = require('path')
const validateConfig = require('../lib/validate-config.js')

describe('validate-config', function () {
  it('should throw if the input does not exist', () => {
    let func = validateConfig.bind(null, {input: 'notafile'})
    expect(func).to.throw(Error)
  })

  it('should throw if the input is not a file', () => {
    let func = validateConfig.bind(null, {input: './test'})
    expect(func).to.throw(TypeError)
  })

  it('should throw if the output does not exist', () => {
    let func = validateConfig.bind(null, {output: 'notafolder'})
    expect(func).to.throw(Error)
  })

  it('should throw if the output is a file', () => {
    let func = validateConfig.bind(null, {output: 'README.md'})
    expect(func).to.throw(TypeError)
  })

  it('should throw if the logo does not exist', () => {
    let func = validateConfig.bind(null, {logo: 'notafile'})
    expect(func).to.throw(Error)
  })

  it('should throw if the logo is not a file', () => {
    let func = validateConfig.bind(null, {logo: './test'})
    expect(func).to.throw(TypeError)
  })

  it('should throw if the theme does not exist', () => {
    let func = validateConfig.bind(null, {theme: 'notafile'})
    expect(func).to.throw(Error)
  })

  it('should throw if the theme is not a file', () => {
    let func = validateConfig.bind(null, {theme: './test'})
    expect(func).to.throw(TypeError)
  })

  it('should return the right default values', () => {
    const expectedInput = path.join(process.cwd(), 'api.raml')
    const expectedOutput = path.join(process.cwd(), 'public')
    const expectedLogo = path.join(__dirname, '../theme/defaults/images/logo.png')
    const expectedTheme = path.join(__dirname, '../theme/defaults/css/_variables.styl')

    const result = validateConfig()

    expect(result).to.be.an.instanceOf(immutable.Map)
      .and.to.have.property('input', expectedInput)
    expect(result).to.have.property('output', expectedOutput)
    expect(result).to.have.property('logo', expectedLogo)
    expect(result).to.have.property('theme', expectedTheme)
  })

  it('should set the input', () => {
    const input = 'README.md'

    expect(validateConfig({input})).to.have.property('input', input)
  })

  it('should set the output', () => {
    const output = 'lib'

    expect(validateConfig({output})).to.have.property('output', output)
  })

  it('should set the logo', () => {
    const logo = 'README.md'

    expect(validateConfig({logo})).to.have.property('logo', logo)
  })

  it('should set the theme', () => {
    const theme = 'README.md'

    expect(validateConfig({theme})).to.have.property('theme', theme)
  })
})
