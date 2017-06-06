'use strict'

const server = require('../../../index')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe('AUTH API v1', () => {
  describe('POST /v1/auth', () => {
    it('should list user on /v1/auth POST', (done) => {
      chai.request(server)
        .post('/v1/auth')
        .send({email: 'john.doe1@awesome.com', password: 'qwerty'})
        .end((err, res) => {
          chai.should().not.exist(err)
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('email')
          res.body.email.should.be.equal('john.doe1@awesome.com')
          chai.should().not.exist(res.body.password)
          done()
        })
    })
    it('should list en error BAD_REQUEST on /v1/auth POST: wrong password', (done) => {
      chai.request(server)
        .post('/v1/auth')
        .send({email: 'john.doe1@awesome.com', password: 'qwerty1'})
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(400)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('BAD_REQUEST')
          done()
        })
    })
    it('should list en error BAD_REQUEST on /v1/auth POST: wrong email', (done) => {
      chai.request(server)
        .post('/v1/auth')
        .send({email: 'john.doe0@awesome.com', password: 'qwerty'})
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(400)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('BAD_REQUEST')
          done()
        })
    })
    it('should list en error SERVER_ERROR on /v1/auth POST: email is object', (done) => {
      chai.request(server)
        .post('/v1/auth')
        .send({email: {email: 'john.doe0@awesome.com'}, password: 'qwerty'})
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(500)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('SERVER_ERROR')
          done()
        })
    })
    it('should list en error SERVER_ERROR on /v1/auth POST: password is object', (done) => {
      chai.request(server)
        .post('/v1/auth')
        .send({email: 'john.doe1@awesome.com', password: {password: 'qwerty'}})
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(500)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('SERVER_ERROR')
          done()
        })
    })
  })
})
