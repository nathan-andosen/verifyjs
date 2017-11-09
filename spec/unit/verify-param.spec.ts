import { VerifyParam } from '../../src/verify-param';
import { TestHelper } from '../support/test-helper';

let testHelper = new TestHelper();

describe('VerifyParam', () => {
  beforeAll(() => {
    testHelper.setupDependencyManager();
  });


  describe('isValid()', () => {

  });

  describe('isNotValid()', () => {

  });

  describe('isValidOrThrowError()', () => {

  });

  describe('string()', () => {
    it('should return true as parameter is a string', () => {
      let verifyParam = new VerifyParam("test");
      expect(verifyParam.string().isValid()).toEqual(true);
    });
  });

  describe('number()', () => {

  });

});