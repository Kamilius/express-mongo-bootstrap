'use strict'

const chai = require('chai')
const mocha = require('mocha')
const sinon = require('sinon')

chai.should()

const sendEmail = require('./sendEmail')

describe('sendEmail:', () => {
  const user = {
    email: 'testemail@gmail.com'
  }
  describe('#sendEmail()', () => {
    let stub
    mocha.before((done) => {
      stub = sinon.stub(sendEmail.client, 'sendEmail').yields(null)
      done()
    })
    mocha.after((done) => {
      stub.restore()
      done()
    })
    it('should return true in Promise', (done) => {
      sendEmail.sendEmail(user).then((data) => {
        data.should.be.equal(true)
        done()
      })
    })
  })
  describe('#sendWelcomeEmail()', () => {
    describe('with success sending', () => {
      let stub
      mocha.beforeEach((done) => {
        stub = sinon.stub(sendEmail.client, 'sendEmail').yields(null)
        done()
      })
      mocha.afterEach((done) => {
        stub.restore()
        done()
      })
      it('should return true', (done) => {
        sendEmail.sendWelcomeEmail(user)
          .then((data) => {
            data.should.be.equal(true)
            done()
          })
      })
      it('should throw an Error', (done) => {
        sendEmail.sendWelcomeEmail()
          .catch((err) => {
            chai.should().exist(err.message)
            err.error.should.be.equal('SERVER_ERROR')
            err.message.should.be.equal('Cannot read property \'email\' of undefined')
            chai.should().exist(err.code)
            err.code.should.be.equal(500)
            done()
          })
      })
    })
    describe('with fail result', () => {
      let stub
      mocha.before((done) => {
        stub = sinon.stub(sendEmail.client, 'sendEmail').yields(new Error())
        done()
      })
      mocha.after((done) => {
        stub.restore()
        done()
      })
      it('should return an Error', (done) => {
        sendEmail.sendWelcomeEmail(user)
          .catch((err) => {
            chai.should().exist(err.error)
            err.error.should.be.equal('SERVER_ERROR')
            chai.should().exist(err.message)
            err.message.should.be.equal('SERVER_ERROR')
            chai.should().exist(err.code)
            err.code.should.be.equal(500)
            done()
          })
      })
    })
  })
})
