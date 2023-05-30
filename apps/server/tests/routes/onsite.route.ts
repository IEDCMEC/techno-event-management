import { describe } from "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../src/index";

chai.use(chaiHttp);

describe("Participants API", () => {
  describe("GET /onsite/participants", () => {
    it("should return a list of participants", (done) => {
      chai
        .request(app)
        .get("/onsite/participants")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).greaterThan(0);
          done();
        });
    });
  });

  describe("GET /onsite/participants/:id", () => {
    it("should return a participant", (done) => {
      chai
        .request(app)
        .get("/onsite/participants/c599ed75-7300-446f-a1c5-2e52cb4ae41a")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });
});
