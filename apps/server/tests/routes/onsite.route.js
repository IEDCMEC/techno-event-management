"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var chai_1 = require("chai");
var chai_http_1 = require("chai-http");
var index_1 = require("../../src/index");
chai_1.default.use(chai_http_1.default);
(0, mocha_1.describe)("Participants API", function () {
    (0, mocha_1.describe)("GET /onsite/participants", function () {
        it("should return a list of participants", function (done) {
            chai_1.default
                .request(index_1.default)
                .get("/onsite/participants")
                .end(function (err, res) {
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.be.an("array");
                (0, chai_1.expect)(res.body.length).greaterThan(0);
                done();
            });
        });
    });
    (0, mocha_1.describe)("GET /onsite/participants/:id", function () {
        it("should return a participant", function (done) {
            chai_1.default
                .request(index_1.default)
                .get("/onsite/participants/c599ed75-7300-446f-a1c5-2e52cb4ae41a")
                .end(function (err, res) {
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.be.an("object");
                done();
            });
        });
    });
});
