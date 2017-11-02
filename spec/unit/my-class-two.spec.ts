import { ClassTwo } from '../../src';

describe('Class One:', () => {

  /**
   * doSomething()
   */
  describe('doSomething()', () => {
    it('should do something', () => {
      let classTwo = new ClassTwo();
      expect(classTwo.doSomething().length).toBeGreaterThan(0);
    });
  });
});

