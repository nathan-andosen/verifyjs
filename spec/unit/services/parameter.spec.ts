import { Parameter, ParameterDataType } from '../../../src/services/parameter';

/**
 * Parameter class specs
 */
describe('Parameter', () => {


  /**
   * getDataType()
   */
  describe('getDataType()', () => {
    it('should return the correct data type', () => {
      let parameter = new Parameter();
      expect(parameter.getDataType(undefined))
        .toEqual(ParameterDataType.Undefined);
      expect(parameter.getDataType(null)).toEqual(ParameterDataType.Null);
      expect(parameter.getDataType(10)).toEqual(ParameterDataType.Number);
      expect(parameter.getDataType(1.6)).toEqual(ParameterDataType.Number);
      expect(parameter.getDataType("")).toEqual(ParameterDataType.String);
      expect(parameter.getDataType("hi")).toEqual(ParameterDataType.String);
      expect(parameter.getDataType('10')).toEqual(ParameterDataType.String);
      expect(parameter.getDataType(true)).toEqual(ParameterDataType.Boolean);
      expect(parameter.getDataType(false)).toEqual(ParameterDataType.Boolean);
      // array type
      expect(parameter.getDataType([])).toEqual(ParameterDataType.Array);
      expect(parameter.getDataType([1, 2])).toEqual(ParameterDataType.Array);
      expect(parameter.getDataType([null])).toEqual(ParameterDataType.Array);
      expect(parameter.getDataType(new Array()))
        .toEqual(ParameterDataType.Array);
      // json object type
      var obj = { test: 123 };
      expect(parameter.getDataType(obj)).toEqual(ParameterDataType.Json);
      obj = JSON.parse(JSON.stringify(obj));
      expect(parameter.getDataType(obj)).toEqual(ParameterDataType.Json);
      // unknown type
      let unknown = new function(){};
      expect(parameter.getDataType(unknown)).toEqual(ParameterDataType.Unknown);
    });
  });


  /**
   * isDefined()
   */
  describe('isDefined()', () => {
    it('should return true', () => {
      let parameter = new Parameter();
      expect(parameter.isDefined(null)).toEqual(true);
      expect(parameter.isDefined([null])).toEqual(true);
      expect(parameter.isDefined(new Array())).toEqual(true);
    });

    it('should return false', () => {
      let parameter = new Parameter();
      expect(parameter.isDefined(undefined)).toEqual(false);
    });
  });


  /**
   * isSet()
   */
  describe('isSet()', () => {
    it('should return true', () => {
      let parameter = new Parameter();
      expect(parameter.isSet(false)).toEqual(true);
      expect(parameter.isSet(0)).toEqual(true);
      expect(parameter.isSet("")).toEqual(true);
      expect(parameter.isSet([])).toEqual(true);
      expect(parameter.isSet({})).toEqual(true);
      expect(parameter.isSet(true)).toEqual(true);
    });

    it('should return false', () => {
      let parameter = new Parameter();
      expect(parameter.isSet(undefined)).toEqual(false);
      expect(parameter.isSet(null)).toEqual(false);
    });
  });


  /**
   * isJson()
   */
  describe('isJson()', () => {
    it('should return true', () => {
      let parameter = new Parameter();
      expect(parameter.isJson({})).toEqual(true);
      expect(parameter.isJson({ "abc": true })).toEqual(true);
    });

    it('should return false', () => {
      let parameter = new Parameter();
      expect(parameter.isJson("{}")).toEqual(false);
      expect(parameter.isJson(null)).toEqual(false);
      expect(parameter.isJson(new function(){})).toEqual(false);
      expect(parameter.isJson(10)).toEqual(false);
      expect(parameter.isJson([])).toEqual(false);
    });
  });


  /**
   * isArray()
   */
  describe('isArray()', () => {
    it('should return true', () => {
      let parameter = new Parameter();
      expect(parameter.isArray([])).toEqual(true);
      expect(parameter.isArray([null])).toEqual(true);
      expect(parameter.isArray(new Array())).toEqual(true);
    });

    it('should return false', () => {
      let parameter = new Parameter();
      expect(parameter.isArray({})).toEqual(false);
      expect(parameter.isArray(null)).toEqual(false);
      expect(parameter.isArray("[]")).toEqual(false);
    });
  });

});