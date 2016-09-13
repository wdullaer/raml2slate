#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const program = require('commander')
const getDefaultThemePath = require('./index').getDefaultThemePath
const render = require('./index').render
const pjson = require('../package.json')

const defaultInput = path.resolve(process.cwd(), 'api.raml')
const defaultOutput = path.resolve(process.cwd(), 'public')

program
  .version(pjson.version)
  .option('-i, --input <file>', 'RAML file to render', isValidPath.bind(null, fs.constants.R_OK))
  .option('-o, --output <dir>', 'Directory to output the documentation to', isValidPath.bind(null, fs.constants.W_OK))
  .option('-l, --logo <file>', 'Path to the logo to include in the documentation', isValidPath.bind(null, fs.constants.R_OK))
  .option('-t, --theme <file>', 'Path to a colour theme file', isValidPath.bind(null, fs.constants.R_OK))
  .option('--generate-theme', 'Generates the default colour theme')
  .parse(process.argv)

let options = {
  input: program.input || defaultInput,
  output: program.output || defaultOutput,
  logo: program.logo,
  theme: program.theme
}

if (program.generateTheme) {
  fs.createReadStream(getDefaultThemePath(), {encoding: 'utf8'})
    .pipe(process.stdout)
} else {
  render(options)
}

function isValidPath (access, input) {
  let result = path.resolve(input)
  fs.accessSync(result, access)
  return result
}
