'use strict'
const fs = require('fs')
const immutable = require('immutable')
const path = require('path')

const FILE = 'file'
const DIRECTORY = 'directory'

const THEME_PATH = path.join('css', '_variables.styl')
const LOGO_PATH = path.join('images', 'logo.png')
const DEFAULT_THEME = path.join(__dirname, '../theme/defaults', THEME_PATH)
const DEFAULT_LOGO = path.join(__dirname, '../theme/defaults', LOGO_PATH)

function validateConfig (options = immutable.Map()) {
  // TODO: do some input validation on the options and fail fast
  let config = immutable.fromJS({
    input: path.join(process.cwd(), 'api.raml'),
    output: path.join(process.cwd(), 'public'),
    logo: DEFAULT_LOGO,
    theme: DEFAULT_THEME
  })

  options = immutable.fromJS(options).filterNot((value) => value === undefined)
  if (options.has('input') && !isValidPath(options.get('input'), FILE, fs.constants.R_OK)) {
    throw new TypeError(`Input should be a readable file. Received: ${options.get('input')}`)
  }

  if (options.has('output') && !isValidPath(options.get('output'), DIRECTORY, fs.constants.W_OK)) {
    throw new TypeError(`Output should be a writable directory. Received: ${options.get('output')}`)
  }

  if (options.has('logo') && !isValidPath(options.get('logo'), FILE, fs.constants.R_OK)) {
    throw new TypeError(`Logo should be a readable png file. Received: ${options.get('logo')}`)
  }

  if (options.has('theme') && !isValidPath(options.get('theme'), FILE, fs.constants.R_OK)) {
    throw new TypeError(`Theme should be a readable file. Received: ${options.get('theme')}`)
  }

  config = config.merge(options)

  return config
}

function isValidPath (testPath, type, permission) {
  testPath = path.resolve(testPath)
  fs.accessSync(testPath, permission)
  let stats = fs.statSync(testPath)
  return (type === FILE ? stats.isFile() : stats.isDirectory())
}

module.exports = validateConfig
