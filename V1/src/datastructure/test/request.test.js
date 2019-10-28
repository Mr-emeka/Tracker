import app from '../../../app';
import chai from 'chai';
import uuid from 'uuid';
import moment from 'moment';
import chaiHttp from "chai-http";
const {
  expect,
} = chai;
chai.use(chaiHttp);
chai.should();

describe("user Request Controller test", () => {
  it('create a request it should return status 200', (done) => {
    chai.request(app)
      .post('/api/v1/user/request')
      .send({
        title: 'request',
        type: 'maintenance',
        description: 'request description'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have
          .property('message')
          .eql('successfull');
        done(err);
      })
  })
  it('create request it should return status 400 if title is not inputted ', done => {
    chai.request(app)
      .post('/api/v1/user/request')
      .send({
        type: 'maintenance',
        description: 'maintenance request to fix my desk'
      }).end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('All fields are required');
        done(err);
      })
  })
  it('create request it should return status 400 if type is not inputted ', done => {
    chai.request(app)
      .post('/api/v1/user/request')
      .send({
        title: 'spoilt ac',
        description: 'maintenance request to fix my desk'
      }).end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('All fields are required');
        done(err);
      })
  })
  it('create request it should return status 400 if description is not inputted ', done => {
    chai.request(app)
      .post('/api/v1/user/request')
      .send({
        title: 'spoilt ac',
        type: 'maintenance'
      }).end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('All fields are required');
        done(err);
      })
  })
  it('get all request', (done) => {
    chai.request(app)
      .get('/api/v1/user/requests')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      })

  })
  it('get request by id', (done) => {
    chai.request(app)
      .get(`/user/request/1`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      })
  })
  it('edit request', (done) => {
    chai.request(app)
      .put(`/user/request/0`).send({
        title: 'Repair my ac',
        type: 'maintenance',
        description: 'faulty ac',
        createdDate: moment.now(),
        modifiedDate: moment.now()
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      })
  })

});