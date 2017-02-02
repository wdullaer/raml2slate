'use strict'
const copyFile = require('./copy-file')
const renderMarkdown = require('./render-markdown')
const validateConfig = require('./validate-config')

const path = require('path')
const tmp = require('./tmp-promise')

const MetalSmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const assets = require('../plugins/metalsmith-assets')
const stylus = require('../plugins/metalsmith-stylus')
const metallic = require('metalsmith-metallic')

const THEME_PATH = path.join('css', '_variables.styl')
const LOGO_PATH = path.join('images', 'logo.png')

function render (options) {
  options = validateConfig(options)

  let sourceDir
  let cleanup

  return tmp.dir({unsafeCleanup: true})
    .then((tmpDir) => {
      sourceDir = tmpDir.path
      cleanup = tmpDir.cleanup
      let prom1 = renderMarkdown(options.get('input'), sourceDir)
      let prom2 = copyFile(options.get('logo'), path.join(sourceDir, LOGO_PATH))
      let prom3 = copyFile(options.get('theme'), path.join(sourceDir, THEME_PATH))
      return Promise.all([prom1, prom2, prom3])
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        new MetalSmith(path.resolve(__dirname, '../theme'))
          .source(sourceDir)
          .destination(options.get('output'))
          .use(metallic())
          .use(markdown({
            gfm: true
          }))
          .use(layouts({
            engine: 'ejs',
            directory: './layouts',
            default: 'index.ejs',
            pattern: '**/*.html'
          }))
          .use(assets({
            source: './assets'
          }))
          .use(stylus({
            paths: [path.join(__dirname, '..', '/theme/assets/css')]
          }))
          .build((error, files) => {
            if (error) return reject(error)
            return resolve(files)
          })
      })
    })
    .then(() => {
      cleanup()
    })
    .catch((error) => {
      console.error('Something went wrong rendering the documentation')
      console.error(error)
      cleanup()
    })
}

function getDefaultThemePath () {
  return validateConfig().get('theme')
}

module.exports = {
  getDefaultThemePath,
  render
}
