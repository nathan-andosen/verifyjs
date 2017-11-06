import { dependencyManager } from '../../../src/services/dependency-manager';

class DepOne {
  getSomething(): string {
    return 'Got something';
  }
}

class DepTwo {
  doSomething(): string {
    return 'Did something';
  }
}

class DepThree {
  private name: string = '';
  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }
}

/**
 * DependencyManager
 */
describe('DependencyManager', () => {


  /**
   * add() & get()
   */
  describe('add() & get()', () => {
    it('should add and get dependencies', () => {
      let depOneTest = new DepOne();
      let depTwoTest = new DepTwo();
      dependencyManager.add(DepOne, DepTwo, new DepThree('test name'));
      let depOne = dependencyManager.get(DepOne);
      expect(depOne.getSomething()).toEqual(depOneTest.getSomething());
      let depTwo = dependencyManager.get(DepTwo);
      expect(depTwo.doSomething()).toEqual(depTwoTest.doSomething());
      let depThree = dependencyManager.get(DepThree);
      expect(depThree.getName()).toEqual('test name');
      dependencyManager.clear();
    });
  });
  

  /**
   * clear()
   */
  describe('clear()', () => {
    it('should clear all dependencies', () => {
      dependencyManager.add(DepOne, DepTwo);
      let depOne = dependencyManager.get(DepOne);
      expect(depOne).toBeDefined();
      dependencyManager.clear();
      let depOneAgain = dependencyManager.get(DepOne);
      expect(depOneAgain).toBeUndefined();
    });
  });
});