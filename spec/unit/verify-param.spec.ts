import { VerifyParam } from '../../src/verify-param';
import { TestHelper } from '../support/test-helper';

let testHelper = new TestHelper();

describe('VerifyParam', () => {
  beforeAll(() => {
    testHelper.setupDependencyManager();
  });


  /**
   * isDefined()
   */
  describe('isDefined()', () => {
    it('should return true as the parameter is not equal to undefined', () => {
      let verifyParam = new VerifyParam(true);
      expect(verifyParam.isDefined()).toEqual(true);
    });

    it('should return false as the parameter is undefined', () => {
      let verifyParam = new VerifyParam(undefined);
      expect(verifyParam.isDefined()).toEqual(false);
    });
  });


  /**
   * isDefinedOrThrowError()
   */
  describe('isDefinedOrThrowError()', () => {
    it('should return true as the parameter is not equal to undefined', () => {
      let verifyParam = new VerifyParam(true);
      expect(verifyParam.isDefinedOrThrowError()).toEqual(true);
    });

    it('should throw error as the parameter is undefined', () => {
      let verifyParam = new VerifyParam(undefined);
      expect(() => { verifyParam.isDefinedOrThrowError(); }).toThrowError();
      let verifyParam2 = new VerifyParam(undefined);
      try {
        verifyParam2.isDefinedOrThrowError('testing');
      } catch(e) {
        expect(e.message).toEqual('testing');
      }
      let verifyParam3 = new VerifyParam(undefined);
      try {
        verifyParam2.isDefinedOrThrowError(new Error('test'));
      } catch(e) {
        expect(e.message).toEqual('test');
      }
    });
  });


  /**
   * isNotDefined()
   */
  describe('isNotDefined()', () => {
    it('should return true as the parameter is set to undefined', () => {
      let verifyParam = new VerifyParam(undefined);
      expect(verifyParam.isNotDefined()).toEqual(true);
    });

    it('should return false as the parameter is not equal to undefined', () => {
      let verifyParam = new VerifyParam(null);
      expect(verifyParam.isNotDefined()).toEqual(false);
    });
  });


  /**
   * isSet()
   */
  describe('isSet()', () => {
    it('should return true as the parameter is set', () => {
      let verifyParam = new VerifyParam(true);
      expect(verifyParam.isSet()).toEqual(true);
    });

    it('should return false as the parameter is not set', () => {
      let verifyParam = new VerifyParam(null);
      expect(verifyParam.isSet()).toEqual(false);
    });
  });


  /**
   * isValid()
   */
  describe('isValid()', () => {
    it('should return true if error message is not set', () => {
      let verifyParam = new VerifyParam("test");
      expect(verifyParam.string().isValid()).toEqual(true);
    });

    it('should return false if error message is set', () => {
      let verifyParam = new VerifyParam(null);
      expect(verifyParam.string().isValid()).toEqual(false);
    });
  });


  /**
   * isNotValid()
   */
  describe('isNotValid()', () => {
    it('should return true if error message is set', () => {
      let verifyParam = new VerifyParam(null);
      expect(verifyParam.string().isNotValid()).toEqual(true);
    });

    it('should return false if error message is not set', () => {
      let verifyParam = new VerifyParam("test");
      expect(verifyParam.string().isNotValid()).toEqual(false);
    });
  });


  /**
   * isValidOrThrowError()
   */
  describe('isValidOrThrowError()', () => {
    it('should not throw error as parameter is valid', () => {
      let verifyParam = new VerifyParam(10);
      expect(verifyParam.number().isValidOrThrowError()).toEqual(true);
    });

    it('should throw error as parameter is not valid', () => {
      let verifyParam = new VerifyParam(10);
      expect(() => { verifyParam.string().isValidOrThrowError(); })
        .toThrowError();
    });

    it('should throw custom error', () => {
      let verifyParam = new VerifyParam(10);
      let err = new Error('test');
      try {
        verifyParam.string().isValidOrThrowError(err);
      } catch(e) {
        expect(e.message).toEqual('test');
      }
    });

    it('should throw error message from string', () => {
      let verifyParam = new VerifyParam(10);
      let err = 'testing';
      try {
        verifyParam.string().isValidOrThrowError(err);
      } catch(e) {
        expect(e.message).toEqual('testing');
      }
    });
  });


  /**
   * string()
   */
  describe('string()', () => {
    it('should return true as the parameter is a string', () => {
      let verifyParam = new VerifyParam("test");
      expect(verifyParam.string().isValid()).toEqual(true);
    });

    it('should return false as the parameter is not a string', () => {
      let verifyParam = new VerifyParam(1.2);
      expect(verifyParam.string().isValid()).toEqual(false);
    });
  });


  /**
   * array()
   */
  describe('array()', () => {
    it('should return true as the parameter is an array', () => {
      let verifyParam = new VerifyParam([1,2]);
      expect(verifyParam.array().isValid()).toEqual(true);
    });

    it('should return false as the parameter is not an array', () => {
      let verifyParam = new VerifyParam(1.2);
      expect(verifyParam.array().isValid()).toEqual(false);
    });
  });


  /**
   * number()
   */
  describe('number()', () => {
    it('should return true as the parameter is a number', () => {
      let verifyParam = new VerifyParam(10);
      expect(verifyParam.number().isValid()).toEqual(true);
      let verifyParam2 = new VerifyParam('10');
      expect(verifyParam2.number(true).isValid()).toEqual(true);
    });

    it('should return false as the parameter is not a number', () => {
      let verifyParam = new VerifyParam("df");
      expect(verifyParam.number().isValid()).toEqual(false);
      let verifyParam2 = new VerifyParam("8");
      expect(verifyParam2.number().isValid()).toEqual(false);
    });
  });


  /**
   * int()
   */
  describe('int()', () => {
    it('should return true as the parameter is an integer', () => {
      let verifyParam = new VerifyParam(10);
      expect(verifyParam.int().isValid()).toEqual(true);
      let verifyParam2 = new VerifyParam('10');
      expect(verifyParam2.int(true).isValid()).toEqual(true);
    });

    it('should return false as the parameter is not an integer', () => {
      let verifyParam = new VerifyParam("df");
      expect(verifyParam.int().isValid()).toEqual(false);
      let verifyParam2 = new VerifyParam("3");
      expect(verifyParam2.int().isValid()).toEqual(false);
    });
  });


  /**
   * json()
   */
  describe('json()', () => {
    it('should return true as the parameter is a json object', () => {
      let verifyParam = new VerifyParam({a:2});
      expect(verifyParam.json().isValid()).toEqual(true);
    });

    it('should return false as the parameter is not a json object', () => {
      let verifyParam = new VerifyParam([1]);
      expect(verifyParam.json().isValid()).toEqual(false);
    });
  });


  /**
   * email()
   */
  describe('email()', () => {
    it('should return true as the parameter is a valid email', () => {
      let verifyParam = new VerifyParam("test@gmail.com");
      expect(verifyParam.email().isValid()).toEqual(true);
    });

    it('should return false as the parameter is not a json object', () => {
      let verifyParam = new VerifyParam("test@");
      expect(verifyParam.email().isValid()).toEqual(false);
    });
  });

});