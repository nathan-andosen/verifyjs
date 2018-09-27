import { EqualService } from '../../../src/services/equal.service';

let equalSrv: EqualService = null;

describe('EqualService', () => {
  beforeAll(() => {
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

    it('should return true for boolean comparsion', () => {
      let param = false, val = false;
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

    it('should return Error for boolean comparsion', () => {
      let param = true, val = false;
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
      let param8 = [], val8 = [];
      expect(equalSrv.paramEqualsValue(param8, '', val8)).toEqual(true);
      let param9 = new Array(), val9 = new Array();
      expect(equalSrv.paramEqualsValue(param9, '', val9)).toEqual(true);
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

    it('should return error as not supported type', () => {
      let param = new function(){}, val = {a:1};
      expect(equalSrv.paramEqualsValue(param, '', val) instanceof Error)
        .toEqual(true);
    });
  });


  /**
   * paramEqualsMin()
   */
  describe('paramEqualsMin()', () => {
    it('should return true', () => {
      let param = 10, val = 5;
      expect(equalSrv.paramEqualsMin(param, '', val)).toEqual(true);
      let param1 = 'password', val1 = 5;
      expect(equalSrv.paramEqualsMin(param1, '', val1)).toEqual(true);
      let param2 = [1,2,3,4,5,6], val2 = 5;
      expect(equalSrv.paramEqualsMin(param2, '', val2)).toEqual(true);
      let param3 = 5, val3 = 5;
      expect(equalSrv.paramEqualsMin(param3, '', val3)).toEqual(true);
    });

    it('should return error', () => {
      let param = 2, val = 5;
      expect(equalSrv.paramEqualsMin(param, '', val) instanceof Error)
      .toEqual(true);
      let param1 = 'password', val1 = 15;
      expect(equalSrv.paramEqualsMin(param1, '', val1) instanceof Error)
      .toEqual(true);
      let param2 = [1,2], val2 = 5;
      expect(equalSrv.paramEqualsMin(param2, '', val2) instanceof Error)
      .toEqual(true);
      let param3 = null, val3 = 5;
      expect(equalSrv.paramEqualsMin(param3, '', val3) instanceof Error)
      .toEqual(true);
    });
  });


  /**
   * paramEqualsMax()
   */
  describe('paramEqualsMax()', () => {
    it('should return true', () => {
      let param = 10, val = 50;
      expect(equalSrv.paramEqualsMax(param, '', val)).toEqual(true);
      let param1 = 'password', val1 = 50;
      expect(equalSrv.paramEqualsMax(param1, '', val1)).toEqual(true);
      let param2 = [1,2,3,4,5,6], val2 = 50;
      expect(equalSrv.paramEqualsMax(param2, '', val2)).toEqual(true);
      let param3 = 5, val3 = 5;
      expect(equalSrv.paramEqualsMax(param3, '', val3)).toEqual(true);
    });

    it('should return error', () => {
      let param = 20, val = 5;
      expect(equalSrv.paramEqualsMax(param, '', val) instanceof Error)
      .toEqual(true);
      let param1 = 'password', val1 = 5;
      expect(equalSrv.paramEqualsMax(param1, '', val1) instanceof Error)
      .toEqual(true);
      let param2 = [1,2,3,4,5,6], val2 = 5;
      expect(equalSrv.paramEqualsMax(param2, '', val2) instanceof Error)
      .toEqual(true);
      let param3 = null, val3 = 5;
      expect(equalSrv.paramEqualsMax(param3, '', val3) instanceof Error)
      .toEqual(true);
    });
  });


  /**
   * paramLengthEquals()
   */
  describe('paramLengthEquals()', () => {
    it('should return true', () => {
      let param = "hi", val = 2;
      expect(equalSrv.paramLengthEquals(param, '', val)).toEqual(true);
      let param1 = [1,2,3], val1 = 3;
      expect(equalSrv.paramLengthEquals(param1, '', val1)).toEqual(true);
    });

    it('should return error', () => {
      let param = [1,2], val = 5;
      expect(equalSrv.paramLengthEquals(param, '', val) instanceof Error)
      .toEqual(true);
      let param1 = null, val1 = 5;
      expect(equalSrv.paramLengthEquals(param1, '', val1) instanceof Error)
      .toEqual(true);
    });
  });
});