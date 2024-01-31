import { describe } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';

chai.use(chaiHttp);

describe('Events API', () => {
  let token: string;
  let organizationId: string;

  before((done) => {
    chai
      .request(app)
      .post('/auth/signup')
      .send({
        firstName: 'EventNewUserFirstName',
        lastName: 'EventNewUserLastName',
        email: 'eventnewuser@email.com',
        password: 'newpassword',
      })
      .end((err, res) => {
        chai
          .request(app)
          .post('/auth/login')
          .send({
            email: 'eventnewuser@email.com',
            password: 'newpassword',
          })
          .end((err, res) => {
            token = res.body.token;
            chai
              .request(app)
              .post('/organization')
              .auth(token, { type: 'bearer' })
              .send({
                name: 'NewOrganization',
              })
              .end((err, res) => {
                chai
                  .request(app)
                  .get('/users/organizations')
                  .auth(token, { type: 'bearer' })
                  .end((err, res) => {
                    organizationId = res.body.organizations[0].id;
                    done();
                  });
              });
          });
      });
  });

  describe('POST /core/:organizationId/events without token', () => {
    it('should return 401', (done) => {
      chai
        .request(app)
        .post(`/core/${organizationId}/events`)
        .send({
          name: 'NewEvent',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('POST /core/:organizationId/events with invalid authentication method', () => {
    it.skip('should return 403', () => {
      // TODO: Try other authentication header formats
    });
  });

  describe('POST /core/:organizationId/events with blank token', () => {
    it('should return 403', (done) => {
      chai
        .request(app)
        .post(`/core/${organizationId}/events`)
        .auth('', { type: 'bearer' })
        .send({
          name: 'NewEvent',
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('POST /core/:organizationId/events with wrong token', () => {
    it('should return 403', (done) => {
      chai
        .request(app)
        .post(`/core/${organizationId}/events`)
        .auth('notAValidToken', { type: 'bearer' })
        .send({
          name: 'NewEvent',
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('GET /core/:organizationId/events', () => {
    it('should return 200 with a success message and a list of events which should be empty', (done) => {
      chai
        .request(app)
        .get(`/core/${organizationId}/events`)
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Successfully retrieved all events');
          expect(res.body).to.have.property('events');
          expect(res.body.events).to.be.an('array');
          expect(res.body.events.length).to.equal(0);
          done();
        });
    });
  });

  describe('POST /core/:organizationId/events', () => {
    it('should return 201 with a success message', (done) => {
      chai
        .request(app)
        .post(`/core/${organizationId}/events`)
        .auth(token, { type: 'bearer' })
        .send({
          name: 'NewEvent',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Successfully created new event');
          done();
        });
    });
  });

  describe('GET /core/:organizationId/events', () => {
    it('should return 200 with a success message and a list of events', (done) => {
      chai
        .request(app)
        .get(`/core/${organizationId}/events`)
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Successfully retrieved all events');
          expect(res.body).to.have.property('events');
          expect(res.body.events).to.be.an('array');
          expect(res.body.events.length).to.equal(1);
          expect(res.body.events[0]).to.have.property('id');
          expect(res.body.events[0].id).to.be.a('string');
          expect(res.body.events[0]).to.have.property('name');
          expect(res.body.events[0].name).to.be.a('string');
          expect(res.body.events[0].name).to.equal('NewEvent');
          done();
        });
    });
  });
});
