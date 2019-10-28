import app from '../../../app';
import chai from 'chai';
import chaiHttp from "chai-http";
const {
  expect
} = chai;
chai.use(chaiHttp);
chai.should();
describe("Auth Controller test", () => {
  it('home route test', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.be.a('object');
        done();
      })
  })
  it('signup route', (done) => {
    chai.request(app)
      .post('/api/v1/register')
      .send({
        firstName: 'ukpai',
        lastName: 'chukwuemeka',
        email: 'speak2c.emeka@gmail.com',
        password: 'trumpet',
        admin: false,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        res.body.should.be.a('object');
        expect(res.body.user).to.have.property('firstName');
        expect(res.body.user).to.have.property('lastName');
        expect(res.body.user).to.have.property('email');
        expect(res.body.user).to.have.property('password').with.length > (5);
        expect(res.body.user).to.have.property('admin').to.be.a('boolean');
        res.body.should.have
          .property('message')
          .eql('successfull');
        done();
      })
  })
  it('user login', (done) => {
    chai.request(app)
      .post('/api/v1/login')
      .send({
        email: 'speak2c.emeka@gmail.com',
        password: 'trumpet'
      }).end((err, res) => {
        expect(res).to.have.status(200);
        done();
      })
  })


});