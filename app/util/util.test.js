const util = require('./util');
const chai = require('chai');
const {expect} = chai;
chai.use(require('chai-as-promised'));

describe('util', () => {
  describe('isAsyncFunction', () => {
    it('should return true if function is async', () => {
      expect(util.isAsyncFunction(async function() {})).to.be.true;
      expect(util.isAsyncFunction(async () => {})).to.be.true;
    });

    it('should return false if function is not async', () => {
      expect(util.isAsyncFunction(function() {})).to.be.false;
      expect(util.isAsyncFunction(() => {})).to.be.false;
    });
  });

  describe('promisifyCallback', () => {
    it('should wraps', () => {
      return new Promise((resolved, rejected) => {
        const testObject = {
          param: 'test',
          testMethod: function(cb) {
            cb.call(this, error => error ? rejected(error) : resolved());
          }
        };

        util.promisifyCallback(testObject, 'testMethod');

        let testCalbackCalled = false;
        const testCalback = async function() {
          expect(this).to.be.equal(testObject);
          testCalbackCalled = true;
        };

        testObject.testMethod(testCalback);

        expect(testCalbackCalled).to.be.true;
      });
    });

    it('should catch errors', () => {
      const promise = new Promise((resolved, rejected) => {
        const testObject = {
          testMethod: function(cb) {
            cb.call(this, error => error ? rejected(error) : resolved());
          }
        };

        util.promisifyCallback(testObject, 'testMethod');

        let testCalbackCalled = false;
        const testCalback = async function() {
          expect(this).to.be.equal(testObject);
          testCalbackCalled = true;
          throw new Error('Test Error');
        };

        testObject.testMethod(testCalback);

        expect(testCalbackCalled).to.be.true;
      });

      return expect(promise).to.be.rejected;
    });
  });
});
