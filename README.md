# raml2slate [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Render the RAML API spec in the slate documentation layout

This package is meant to render nice looking documentation for your REST API, based on a RAML file.
It is inspired by [slate](https://github.com/lord/slate) and [raml2html](https://github.com/raml2html/raml2html).

The package is usable, but the API and templates might still change based upon feedback.

![Example](https://raw.github.com/example-image)

## Installation

```sh
$ npm install --save raml2slate
```

## Usage
In javascript:
```js
var raml2slate = require('raml2slate');

raml2slate.render({
  input: 'path/to/raml/file',
  output: 'path/to/output/directory',
  theme: 'path/to/optional/theme/file',
  logo: 'path/to/optional/png/logo'
});
```

On the command line:
```bash
raml2slate \
-i 'path/to/raml/file' \
-o 'path/to/output/directory' \
-t 'path/to/optional/theme/file' \
-l 'path/to/optional/png/logo'
```

You can generate a theme file to tweak using:
```bash
raml2slate --generate-theme > theme.styl
```

## TODO
* Add schema definitions to the template
* Convert render-markdown.js into a metalsmith plugin
* Investigate making this fully compatible with raml2html

## License

Apache-2.0 © [Wouter Dullaert](https://wdullaer.com)


[npm-image]: https://badge.fury.io/js/raml2slate.svg
[npm-url]: https://npmjs.org/package/raml2slate
[travis-image]: https://travis-ci.org/wdullaer/raml2slate.svg?branch=master
[travis-url]: https://travis-ci.org/wdullaer/raml2slate
[daviddm-image]: https://david-dm.org/wdullaer/raml2slate.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/wdullaer/raml2slate
