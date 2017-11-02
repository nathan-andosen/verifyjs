import { ClassOne } from '../../src';

describe('Class One:', () => {

  /**
   * doSomething()
   */
  describe('doSomething()', () => {
    it('should do something', () => {
      let classOne = new ClassOne();
      expect(classOne.doSomething()).toEqual('Something was done...');
    });
  });
});