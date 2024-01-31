import { describe } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';

chai.use(chaiHttp);

describe('Organizations API', () => {
  let token: string;

  before((done) => {
    chai
      .request(app)
      .post('/auth/signup')
      .send({
        firstName: 'OrganizationNewUserFirstName',
        lastName: 'OrganizationNewUserLastName',
        email: 'organizationnewuser@email.com',
        password: 'newpassword',
      })
      .end((err, res) => {
        chai
          .request(app)
          .post('/auth/login')
          .send({
            email: 'organizationnewuser@email.com',
            password: 'newpassword',
          })
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      });
  });

  describe('POST /organization without token', () => {
    it('should return 401', (done) => {
      chai
        .request(app)
        .post('/organization')
        .send({
          name: 'NewOrganization',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('POST /organization with invalid authentication method', () => {
    it.skip('should return 403', () => {
      // TODO: Try other authentication header formats
    });
  });

  describe('POST /organization with blank token', () => {
    it('should return 403', (done) => {
      chai
        .request(app)
        .post('/organization')
        .auth('', { type: 'bearer' })
        .send({
          name: 'NewOrganization',
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('POST /organization with wrong token', () => {
    it('should return 403', (done) => {
      chai
        .request(app)
        .post('/organization')
        .auth('notAValidToken', { type: 'bearer' })
        .send({
          name: 'NewOrganization',
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('GET /users/organizations', () => {
    it("should return 200 with a success message and a list of user's organizations which should be empty", (done) => {
      chai
        .request(app)
        .get('/users/organizations')
        .auth(token, { type: 'bearer' })

        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal("Successfully retrieved user's organizations");
          expect(res.body).to.have.property('organizations');
          expect(res.body.organizations).to.be.an('array');
          expect(res.body.organizations.length).to.equal(0);
          done();
        });
    });
  });

  describe('POST /organization', () => {
    it('should return 201 with a success message', (done) => {
      chai
        .request(app)
        .post('/organization')
        .auth(token, { type: 'bearer' })
        .send({
          name: 'NewOrganization',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Successfully created new organization');
          done();
        });
    });
  });

  describe('GET /users/organizations', () => {
    it("should return 200 with a success message and a list of user's organizations", (done) => {
      chai
        .request(app)
        .get('/users/organizations')
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal("Successfully retrieved user's organizations");
          expect(res.body).to.have.property('organizations');
          expect(res.body.organizations).to.be.an('array');
          expect(res.body.organizations.length).to.equal(1);
          expect(res.body.organizations[0]).to.have.property('id');
          expect(res.body.organizations[0].id).to.be.a('string');
          expect(res.body.organizations[0]).to.have.property('name');
          expect(res.body.organizations[0].name).to.be.a('string');
          expect(res.body.organizations[0].name).to.equal('NewOrganization');
          expect(res.body.organizations[0]).to.have.property('role');
          expect(res.body.organizations[0].role).to.be.a('string');
          done();
        });
    });
  });
});
