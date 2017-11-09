import { EqualService } from '../../../src/services/equal.service';
import { TestHelper } from '../../support/test-helper';

let testHelper = new TestHelper();
let equalSrv: EqualService = null;

describe('EqualService', () => {
  beforeAll(() => {
    testHelper.setupDependencyManager();
    equalSrv = new EqualService();
  });


  /**
   * paramEqualsValue()
   */
  describe('paramEqualsValue()', () => {
    it('should return true for undefined comparsion', () => {
      let param = undefined, val = undefined;
      expect(equalSrv.paramEqualsValue(param, '', val)).toEqual(true);
    });

    it('should return true for null comparsion', () => {
      let param = null, val = null;
      expect(equalSrv.paramEqualsValue(param, '', val)).toEqual(true);
    });

    it('should return true for string comparsion', () => {
      let param = "test", val = "test";
      expect(equalSrv.paramEqualsValue(param, '', val)).toEqual(true);
    });

    it('should return true for number comparsion', () => {
      let param = 10, val = 10;
      expect(equalSrv.paramEqualsValue(param, '', val)).toEqual(true);
    });

    it('should return Error for string comparsion', () => {
      let param = "test1", val = "test2";
      expect(equalSrv.paramEqualsValue(param, '', val) instanceof Error)
        .toEqual(true);
    });

    it('should return Error for number comparsion', () => {
      let param = 1.1, val = 1.2;
      expect(equalSrv.paramEqualsValue(param, '', val) instanceof Error)
        .toEqual(true);
    });

    it('should return true for array comparsion', () => {
      let param1 = [1,2], val1 = [1,2];
      expect(equalSrv.paramEqualsValue(param1, '', val1)).toEqual(true);
      let param2 = ["one","two"], val2 = ["one","two"];
      expect(equalSrv.paramEqualsValue(param2, '', val2)).toEqual(true);
      let param3 = [{a:1,b:2},{c:{d:3}}], val3 = [{a:1,b:2},{c:{d:3}}];
      expect(equalSrv.paramEqualsValue(param3, '', val3)).toEqual(true);
      let param4 = [null,0,"hi"], val4 = [null,0,"hi"];
      expect(equalSrv.paramEqualsValue(param4, '', val4)).toEqual(true);
      let param5 = [false,1.2], val5 = [false,1.2];
      expect(equalSrv.paramEqualsValue(param5, '', val5)).toEqual(true);
      let param6 = [false,[1,2]], val6 = [false,[1,2]];
      expect(equalSrv.paramEqualsValue(param6, '', val6)).toEqual(true);
      let param7 = [[1,2],"",[1,[0,1]]], val7 = [[1,2],"",[1,[0,1]]];
      expect(equalSrv.paramEqualsValue(param7, '', val7)).toEqual(true);
    });

    it('should return Error for array comparsion', () => {
      let param1 = [1,2,3], val1 = [1,2];
      expect(equalSrv.paramEqualsValue(param1, '', val1) instanceof Error)
        .toEqual(true);
      let param2 = ["one",2], val2 = ["one",3];
      expect(equalSrv.paramEqualsValue(param2, '', val2) instanceof Error)
        .toEqual(true);
      let param3 = [[1,2],[2]], val3 = [[1,2],[2,3]];
      expect(equalSrv.paramEqualsValue(param3, '', val3) instanceof Error)
        .toEqual(true);
      let param4 = [null,{a:1}], val4 = [null,{a:2}];
      expect(equalSrv.paramEqualsValue(param4, '', val4) instanceof Error)
        .toEqual(true);
      let param5 = [null,{a:1}], val5 = [false,{a:2}];
      expect(equalSrv.paramEqualsValue(param5, '', val5) instanceof Error)
        .toEqual(true);
      let param6 = [null,{a:1}], val6 = undefined;
      expect(equalSrv.paramEqualsValue(param6, '', val6) instanceof Error)
        .toEqual(true);
    });

    it('should return true for json comparison', () => {
      let param = {}, val = {};
      expect(equalSrv.paramEqualsValue(param, '', val)).toEqual(true);
      let param1 = {a:{b:1}}, val1 = {a:{b:1}};
      expect(equalSrv.paramEqualsValue(param1, '', val1)).toEqual(true);
      let param2 = {a:[{},1]}, val2 = {a:[{},1]};
      expect(equalSrv.paramEqualsValue(param2, '', val2)).toEqual(true);
    });

    it('should return Error for json comparison', () => {
      let param = {}, val = {a:1};
      expect(equalSrv.paramEqualsValue(param, '', val) instanceof Error)
        .toEqual(true);
      let param1 = {a:{b:2}}, val1 = {a:{b:1}};
      expect(equalSrv.paramEqualsValue(param1, '', val1) instanceof Error)
        .toEqual(true);
      let param2 = {a:[{},1,3]}, val2 = {a:[{},1]};
      expect(equalSrv.paramEqualsValue(param2, '', val2) instanceof Error)
        .toEqual(true);
      let param3 = {}, val3 = undefined;
      expect(equalSrv.paramEqualsValue(param3, '', val3) instanceof Error)
        .toEqual(true);
      let param4 = {}, val4 = null;
      expect(equalSrv.paramEqualsValue(param4, '', val4) instanceof Error)
        .toEqual(true);
    });
  });
});