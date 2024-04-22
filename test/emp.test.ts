import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from "../src/index";
import { HttpStatusCode } from "../src/controllers/HttpStatusCode";
import dotenv  from 'dotenv';
dotenv.config();

chai.use(chaiHttp);

const username : string = JSON.stringify(process.env.APP_USERNAME).replace(/['"]+/g, '');;
const password : string= JSON.stringify(process.env.APP_PASSWORD).replace(/['"]+/g, '');//replace double quotes

describe("POST request to insertrecord", async () => {
   it("Should return a array of response", (done) => {
       const requestBody = {
           "id" : 999,
           "firstName": "Kunal",
           "lastName": "Bag"
       };
       chai.request(app).post("/insertrecord")
       .send(requestBody)
       .set("username", username)
       .set("password",password)
       .end((err, response) => {
           //expect(response).to.be.json;
           expect(response).have.status(HttpStatusCode.Ok);
           if (err) return done(err);
           done();
       })
   }).timeout(30000)
   it("Should return error message for duplicate", (done) => {
    const requestBody = {
        "id" : 999,
        "firstName": "Kunal",
        "lastName": "Bag"
    };
    chai.request(app).post("/insertrecord").send(requestBody).set("username", username).set("password",password).end((err, response) => {
        expect(response).to.be.json;
        expect(response).have.status(HttpStatusCode.Conflict);
        if (err) return done(err);
        done();
    })
}).timeout(30000);
 it("Should return error message for unknown cloumn", (done) => {
     const testProduct = {
         "firstName": "Kunal",
         "address" : "kolkata"
     };
     chai.request(app).post("/insertrecord").send(testProduct).set("username", username).set("password",password).end((err, response) => {
         expect(response).to.be.json;
         expect(response).have.status(HttpStatusCode.BadRequest);
         if (err) return done(err);
         done();
     })
 }).timeout(30000);
 it("Should return error message of blank data", (done) => {
    const testProduct = "{}";
    chai.request(app).post("/insertrecord").send(testProduct).set("username", username).set("password",password).end((err, response) => {
        expect(response).to.be.json;
        expect(response).have.status(HttpStatusCode.BadRequest);
        if (err) return done(err);
        done();
    })
}).timeout(30000);
});
describe("Get request to /getrecord/:empId", async () => {
    it("Should return a array of one record", (done) => {
        const empId = 999;
        
        chai.request(app).get(`/getrecord/${empId}`).set("username", username).set("password",password).end((err, response) => {
            expect(response).to.be.json;
            expect(response).have.status(HttpStatusCode.Ok);
            if (err) return done(err);
            done();
        })
    }).timeout(10000);
    it("Should return error mesage of emp not found", (done) => {
       const otherEmpId = 9999;
       chai.request(app).get(`/getrecord/${otherEmpId}`).set("username", username).set("password",password).end((err, response) => {
            expect(response).to.be.json;
            expect(response).have.status(HttpStatusCode.NotFound);
            if (err) return done(err);
            done();
        })
    }).timeout(10000);
   });
   
   describe("PUT request to /updaterecord/:empId", async () => {
    it("Should return a array of one produts", (done) => {
        const empId = 999;
        const recordToBeUpdated = {
            "lastName": "Chahal",
        }
        chai.request(app).put(`/updaterecord/${empId}`).set("username", username).set("password",password).send(recordToBeUpdated).end((err, response) => {
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
       chai.request(app).put(`/updaterecord/${empId}`).set("username", username).set("password",password).send(recordToBeUpdated).end((err, response) => {
            expect(response).to.be.json;
            expect(response).have.status(HttpStatusCode.BadRequest);
            if (err) return done(err);
            done();
        })
    }).timeout(10000);
   });
   
   describe("GET request to get all records", async () => {
    it("Should return a array of records", (done) => {
        chai.request(app).get("/getallrecords").set("username", username).set("password",password).end((err, response) => {
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
        
        chai.request(app).delete(`/deleterecord/${empId}`).set("username", username).set("password",password).end((err, response) => {
            expect(response).to.be.json;
            expect(response).have.status(HttpStatusCode.Ok);
            if (err) return done(err);
            done();
        })
    }).timeout(10000);
    it("Should return error mesage", (done) => {
       const empId = 999;
       chai.request(app).delete(`/deleterecord/${empId}`).set("username", username).set("password",password).end((err, response) => {
            expect(response).to.be.json;
            expect(response).have.status(HttpStatusCode.NotFound);
            if (err) return done(err);
            done();
        })
    }).timeout(10000);
   });
   