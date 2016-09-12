'use strict'
const {expect} = require('chai')
const tmp = require('../lib/tmp-promise.js')

describe(('tmp-promise'), () => {
  it('should return a promise', () => {
    expect(tmp.dir()).to.be.a('Promise')
  })

  it('should return a promise that resolves to an object', () => {
    let resp = tmp.dir()

    return Promise.all([
      expect(resp).to.eventually.have.deep.property('path').that.is.a('string'),
      expect(resp).to.eventually.have.deep.property('cleanup').that.is.a('function')
    ])
  })
})
