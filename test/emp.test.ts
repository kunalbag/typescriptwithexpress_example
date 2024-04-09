import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from "../src/index";
import { HttpStatusCode } from "../src/controllers/HttpStatusCode";
chai.use(chaiHttp);

describe("POST request to insertrecord", async () => {
   it("Should return a array of response", (done) => {
       const requestBody = {
           "id" : 999,
           "firstName": "Kunal",
           "lastName": "Bag"
       };
       chai.request(app).post("/insertrecord").send(requestBody).end((err, response) => {
           expect(response).to.be.json;
           expect(response).have.status(HttpStatusCode.Ok);
           if (err) return done(err);
           done();
       })
   }).timeout(30000);
   it("Should return error message", (done) => {
      const requestBody = {
          "id" : 999,
          "firstName": "Kunal",
          "lastName": "Bag"
      };
      chai.request(app).post("/insertrecord").send(requestBody).end((err, response) => {
          expect(response).to.be.json;
          expect(response).have.status(HttpStatusCode.Conflict);
          if (err) return done(err);
          done();
      })
  }).timeout(30000);
   it("Should return error message", (done) => {
       const testProduct = {
           "firstName": "Kunal",
           "address" : "kolkata"
       };
       chai.request(app).post("/insertrecord").send(testProduct).end((err, response) => {
           expect(response).to.be.json;
           expect(response).have.status(HttpStatusCode.BadRequest);
           if (err) return done(err);
           done();
       })
   }).timeout(30000);
   it("Should return error message", (done) => {
      const testProduct = {};
      chai.request(app).post("/insertrecord").send(testProduct).end((err, response) => {
          expect(response).to.be.json;
          expect(response).have.status(HttpStatusCode.BadRequest);
          if (err) return done(err);
          done();
      })
  }).timeout(30000);
});

describe("Get request to /getrecord/:empId", async () => {
   it("Should return a array of one record", (done) => {
       const empId = "999";
       
       chai.request(app).get(`/getrecord/${empId}`).end((err, response) => {
           expect(response).to.be.json;
           expect(response).have.status(HttpStatusCode.Ok);
           if (err) return done(err);
           done();
       })
   }).timeout(10000);
   it("Should return error mesage", (done) => {
      const empId = 9999;
      chai.request(app).get(`/getrecord/${empId}`).end((err, response) => {
           expect(response).to.be.json;
           expect(response).have.status(HttpStatusCode.NotFound);
           if (err) return done(err);
           done();
       })
   }).timeout(10000);
});

describe("PUT request to /updaterecord/:empId", async () => {
   it("Should return a array of one produts", (done) => {
       const empId = "999";
       const recordToBeUpdated = {
           "lastName": "Chahal",
       }
       chai.request(app).put(`/updaterecord/${empId}`).send(recordToBeUpdated).end((err, response) => {
           expect(response).to.be.json;
           expect(response).have.status(HttpStatusCode.Ok);
           if (err) return done(err);
           done();
       })
   }).timeout(10000);
   it("Should return error mesage", (done) => {
      const empId = 999;
      const recordToBeUpdated = {
          "address": "Kolkata",
      }
      chai.request(app).put(`/updaterecord/${empId}`).send(recordToBeUpdated).end((err, response) => {
           expect(response).to.be.json;
           expect(response).have.status(HttpStatusCode.BadRequest);
           if (err) return done(err);
           done();
       })
   }).timeout(10000);
});

describe("GET request to get all records", async () => {
   it("Should return a array of records", (done) => {
       chai.request(app).get("/getallrecords").end((err, response) => {
           expect(response).to.be.json;
           expect(response).have.status(HttpStatusCode.Ok);
           if (err) return done(err);
           done();
       })
   }).timeout(10000);
});


describe("Delete request to /deleterecord/:empId", async () => {
   it("Should return a array of one produts", (done) => {
       const empId = "999";
       
       chai.request(app).delete(`/deleterecord/${empId}`).end((err, response) => {
           expect(response).to.be.json;
           expect(response).have.status(HttpStatusCode.Ok);
           if (err) return done(err);
           done();
       })
   }).timeout(10000);
   it("Should return error mesage", (done) => {
      const empId = 999;
      chai.request(app).delete(`/deleterecord/${empId}`).end((err, response) => {
           expect(response).to.be.json;
           expect(response).have.status(HttpStatusCode.NotFound);
           if (err) return done(err);
           done();
       })
   }).timeout(10000);
});