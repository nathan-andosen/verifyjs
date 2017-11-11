import { 
  ParameterService, 
  ParameterDataType 
} from '../../../src/services/parameter.service';

/**
 * Parameter class specs
 */
describe('Parameter', () => {


  /**
   * getDataType()
   */
  describe('getDataType()', () => {
    it('should return the correct data type', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.getDataType(undefined))
        .toEqual(ParameterDataType.Undefined);
      expect(parameterSrv.getDataType(null)).toEqual(ParameterDataType.Null);
      expect(parameterSrv.getDataType(10)).toEqual(ParameterDataType.Number);
      expect(parameterSrv.getDataType(1.6)).toEqual(ParameterDataType.Number);
      expect(parameterSrv.getDataType("")).toEqual(ParameterDataType.String);
      expect(parameterSrv.getDataType("hi")).toEqual(ParameterDataType.String);
      expect(parameterSrv.getDataType('10')).toEqual(ParameterDataType.String);
      expect(parameterSrv.getDataType(true)).toEqual(ParameterDataType.Boolean);
      expect(parameterSrv.getDataType(false)).toEqual(ParameterDataType.Boolean);
      // array type
      expect(parameterSrv.getDataType([])).toEqual(ParameterDataType.Array);
      expect(parameterSrv.getDataType([1, 2])).toEqual(ParameterDataType.Array);
      expect(parameterSrv.getDataType([null])).toEqual(ParameterDataType.Array);
      expect(parameterSrv.getDataType(new Array()))
        .toEqual(ParameterDataType.Array);
      // json object type
      var obj = { test: 123 };
      expect(parameterSrv.getDataType(obj)).toEqual(ParameterDataType.Json);
      obj = JSON.parse(JSON.stringify(obj));
      expect(parameterSrv.getDataType(obj)).toEqual(ParameterDataType.Json);
      // unknown type
      let unknown = new function(){};
      expect(parameterSrv.getDataType(unknown)).toEqual(ParameterDataType.Unknown);
    });
  });


  /**
   * getDataTypeAsString()
   */
  describe('getDataTypeAsString()', () => {
    it('should return correct data type as a string', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.getDataTypeAsString(undefined)).toEqual('undefined');
      expect(parameterSrv.getDataTypeAsString(null)).toEqual('null');
      expect(parameterSrv.getDataTypeAsString(10)).toEqual('number');
      expect(parameterSrv.getDataTypeAsString("hi")).toEqual('string');
      expect(parameterSrv.getDataTypeAsString(true)).toEqual('boolean');
      expect(parameterSrv.getDataTypeAsString([1])).toEqual('array');
      expect(parameterSrv.getDataTypeAsString({ "test": 1 })).toEqual('json');
      expect(parameterSrv.getDataTypeAsString(new function(){}))
        .toEqual('unknown');
    });
  });


  /**
   * isDefined()
   */
  describe('isDefined()', () => {
    it('should return true', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isDefined(null)).toEqual(true);
      expect(parameterSrv.isDefined([null])).toEqual(true);
      expect(parameterSrv.isDefined(new Array())).toEqual(true);
    });

    it('should return false', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isDefined(undefined)).toEqual(false);
    });
  });


  /**
   * isSet()
   */
  describe('isSet()', () => {
    it('should return true', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isSet(false)).toEqual(true);
      expect(parameterSrv.isSet(0)).toEqual(true);
      expect(parameterSrv.isSet("")).toEqual(true);
      expect(parameterSrv.isSet([])).toEqual(true);
      expect(parameterSrv.isSet({})).toEqual(true);
      expect(parameterSrv.isSet(true)).toEqual(true);
    });

    it('should return false', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isSet(undefined)).toEqual(false);
      expect(parameterSrv.isSet(null)).toEqual(false);
    });
  });


  /**
   * isJson()
   */
  describe('isJson()', () => {
    it('should return true', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isJson({})).toEqual(true);
      expect(parameterSrv.isJson({ "abc": true })).toEqual(true);
    });

    it('should return false', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isJson("{}")).toEqual(false);
      expect(parameterSrv.isJson(null)).toEqual(false);
      expect(parameterSrv.isJson(new function(){})).toEqual(false);
      expect(parameterSrv.isJson(10)).toEqual(false);
      expect(parameterSrv.isJson([])).toEqual(false);
    });
  });


  /**
   * isArray()
   */
  describe('isArray()', () => {
    it('should return true', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isArray([])).toEqual(true);
      expect(parameterSrv.isArray([null])).toEqual(true);
      expect(parameterSrv.isArray(new Array())).toEqual(true);
    });

    it('should return false', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isArray({})).toEqual(false);
      expect(parameterSrv.isArray(null)).toEqual(false);
      expect(parameterSrv.isArray("[]")).toEqual(false);
    });
  });


  /**
   * isString()
   */
  describe('isString()', () => {
    it('should return true', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isString('')).toEqual(true);
      expect(parameterSrv.isString("")).toEqual(true);
      expect(parameterSrv.isString(new String())).toEqual(true);
      expect(parameterSrv.isString("false")).toEqual(true);
    });

    it('should return false', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isString({})).toEqual(false);
      expect(parameterSrv.isString(null)).toEqual(false);
      expect(parameterSrv.isString([""])).toEqual(false);
    });
  });


  /**
   * isNumber()
   */
  describe('isNumber()', () => {
    it('should return true', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isNumber(0)).toEqual(true);
      expect(parameterSrv.isNumber(-1)).toEqual(true);
      expect(parameterSrv.isNumber(-1.5)).toEqual(true);
      expect(parameterSrv.isNumber(0.42)).toEqual(true);
      expect(parameterSrv.isNumber(.42)).toEqual(true);
      expect(parameterSrv.isNumber(8e5)).toEqual(true);
      expect(parameterSrv.isNumber(5)).toEqual(true);
      expect(parameterSrv.isNumber('10', true)).toEqual(true);
      expect(parameterSrv.isNumber(' 10 ', true)).toEqual(true);
      expect(parameterSrv.isNumber('.42', true)).toEqual(true);
    });

    it('should return false', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isNumber(undefined)).toEqual(false);
      expect(parameterSrv.isNumber(null)).toEqual(false);
      expect(parameterSrv.isNumber(true)).toEqual(false);
      expect(parameterSrv.isNumber([1])).toEqual(false);
      expect(parameterSrv.isNumber('0test')).toEqual(false);
      expect(parameterSrv.isNumber('#abc')).toEqual(false);
      expect(parameterSrv.isNumber('1.2.3')).toEqual(false);
      expect(parameterSrv.isNumber('')).toEqual(false);
      expect(parameterSrv.isNumber('ten')).toEqual(false);
    });
  });


  /**
   * isInt()
   */
  describe('isInt()', () => {
    it('should return true', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isInt(0)).toEqual(true);
      expect(parameterSrv.isInt(-1)).toEqual(true);
      expect(parameterSrv.isInt(8e5)).toEqual(true);
      expect(parameterSrv.isInt(5)).toEqual(true);
      expect(parameterSrv.isInt('10', true)).toEqual(true);
      expect(parameterSrv.isInt(' 10 ', true)).toEqual(true);
      expect(parameterSrv.isInt('8e5', true)).toEqual(true);
    });

    it('should return false', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isInt(undefined)).toEqual(false);
      expect(parameterSrv.isInt(null)).toEqual(false);
      expect(parameterSrv.isInt(true)).toEqual(false);
      expect(parameterSrv.isInt('0test')).toEqual(false);
      expect(parameterSrv.isInt('#abc')).toEqual(false);
      expect(parameterSrv.isInt('1.2.3')).toEqual(false);
      expect(parameterSrv.isInt('')).toEqual(false);
      expect(parameterSrv.isInt('42.1')).toEqual(false);
      expect(parameterSrv.isInt(1.2)).toEqual(false);
    });
  });


  /**
   * isEmail()
   */
  describe('isEmail()', () => {
    it('should return true', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isEmail('test@email.com')).toEqual(true);
      expect(parameterSrv.isEmail('test.test@email.com')).toEqual(true);
      expect(parameterSrv.isEmail('123@email.org')).toEqual(true);
      expect(parameterSrv.isEmail('test@123.org')).toEqual(true);
      expect(parameterSrv.isEmail('test@test-test.org')).toEqual(true);
      expect(parameterSrv.isEmail('!#$%&`*+/=?^`{|}~@test.org')).toEqual(true);
      expect(parameterSrv.isEmail('test@email.com.au')).toEqual(true);
    });

    it('should return false', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isEmail(undefined)).toEqual(false);
      expect(parameterSrv.isEmail(null)).toEqual(false);
      expect(parameterSrv.isEmail(true)).toEqual(false);
      expect(parameterSrv.isEmail('.test@email.com')).toEqual(false);
      expect(parameterSrv.isEmail('test.@email.com')).toEqual(false);
      expect(parameterSrv.isEmail('test..test@email.com')).toEqual(false);
      expect(parameterSrv.isEmail('testemail.com')).toEqual(false);
      expect(parameterSrv.isEmail('test\@test@iana.org')).toEqual(false);
      expect(parameterSrv.isEmail('test@test.org.')).toEqual(false);
      expect(parameterSrv.isEmail('test@email..com')).toEqual(false);
    });
  });


  /**
   * isBoolean()
   */
  describe('isBoolean()', () => {
    it('should return true', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isBoolean(true)).toEqual(true);
      expect(parameterSrv.isBoolean(false)).toEqual(true);
    });

    it('should return false', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isBoolean(undefined)).toEqual(false);
      expect(parameterSrv.isBoolean(null)).toEqual(false);
      expect(parameterSrv.isBoolean('true')).toEqual(false);
      expect(parameterSrv.isBoolean(1)).toEqual(false);
    });
  });


  /**
   * isEmpty()
   */
  describe('isEmpty()', () => {
    it('should return true', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isEmpty("")).toEqual(true);
      expect(parameterSrv.isEmpty([])).toEqual(true);
      expect(parameterSrv.isEmpty({})).toEqual(true);
    });

    it('should return false', () => {
      let parameterSrv = new ParameterService();
      expect(parameterSrv.isEmpty("abc")).toEqual(false);
      expect(parameterSrv.isEmpty([1,2])).toEqual(false);
      expect(parameterSrv.isEmpty({ a: 1 })).toEqual(false);
      expect(parameterSrv.isEmpty(null)).toEqual(false);
      expect(parameterSrv.isEmpty(undefined)).toEqual(false);
      expect(parameterSrv.isEmpty(false)).toEqual(false);
      expect(parameterSrv.isEmpty(true)).toEqual(false);
      expect(parameterSrv.isEmpty(new function(){})).toEqual(false);
    });
  }); 

});