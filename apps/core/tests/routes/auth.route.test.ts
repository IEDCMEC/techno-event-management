import { describe } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';

chai.use(chaiHttp);

describe('Authentication API', () => {
  describe('POST /auth/signup', () => {
    it('should return 201 with a success message', (done) => {
      chai
        .request(app)
        .post('/auth/signup')
        .send({
          firstName: 'AuthNewUserFirstName',
          lastName: 'AuthNewUserLastName',
          email: 'authnewuser@email.com',
          password: 'newpassword',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Successfully created new user');
          done();
        });
    });
  });

  describe('POST /auth/signup with an existing email', () => {
    it('should return 409 with a success message', (done) => {
      chai
        .request(app)
        .post('/auth/signup')
        .send({
          firstName: 'AuthNewUserFirstName',
          lastName: 'AuthNewUserLastName',
          email: 'authnewuser@email.com',
          password: 'newpassword',
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('User already exists');
          done();
        });
    });
  });

  describe('POST /auth/login', () => {
    it('should return 200 with a success message and token', (done) => {
      chai
        .request(app)
        .post('/auth/login')
        .send({
          email: 'authnewuser@email.com',
          password: 'newpassword',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Successfully logged in');
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
  });
});
