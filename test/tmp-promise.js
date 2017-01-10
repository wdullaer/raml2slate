'use strict'
const expect = require('chai').expect
const tmp = require('../lib/tmp-promise.js')

describe(('tmp-promise'), () => {
  describe('dir()', () => {
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

  describe('file()', () => {
    it('should return a promise', () => {
      expect(tmp.file()).to.be.a('Promise')
    })

    it('should return a promise that resolves to an object', () => {
      let resp = tmp.file()

      return Promise.all([
        expect(resp).to.eventually.have.deep.property('path').that.is.a('string'),
        expect(resp).to.eventually.have.deep.property('fd').that.is.a('number'),
        expect(resp).to.eventually.have.deep.property('cleanup').that.is.a('function')
      ])
    })
  })
})
