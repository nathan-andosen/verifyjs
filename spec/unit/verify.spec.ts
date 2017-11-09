import { verify } from '../../src/verify';
import { TestHelper } from '../support/test-helper';

let testHelper = new TestHelper();

describe('verify', () => {
  beforeAll(() => {
    testHelper.setupDependencyManager();
  });


  it('should use the VerifyParam class to verify the parameter', () => {
    let myParam = 10;
    expect(verify(myParam).number().isValid()).toEqual(true);
  });
});