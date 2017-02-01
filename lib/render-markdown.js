'use strict'
const fs = require('fs')
const path = require('path')
const raml2md = require('raml2md')

const config = {
  template: path.join(__dirname, '..', 'templates', 'index.nunjucks'),
  templatesPath: path.join(__dirname, '..', 'templates'),
  processOutput (data) {
    return data.replace(/\n{3,}/g, '\n\n')
  }
}

function renderMarkdown (file, outputDir) {
  return raml2md.render(file, config)
    .then((mdFile) => {
      return new Promise((resolve, reject) => {
        let outputPath = path.join(outputDir, 'index.md')
        fs.writeFile(outputPath, mdFile, 'utf8', (err) => {
          if (err) return reject(err)
          return resolve()
        })
      })
    })
}

module.exports = renderMarkdown
