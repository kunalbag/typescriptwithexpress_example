// tests/calculator.spec.tx
import { assert } from "chai";
import { expect } from 'chai';
import { addition }  from "../src/calculator";
import { after, afterEach, before, describe, it } from 'mocha';


describe("Calculator Tests", () => {
      it("should return 5 when 2 is added to 3", () => {
      const result = addition(2, 3);
      assert.equal(result, 5);
      //expect(result).to.equal(5);
   });
});
console.log("hello test..")