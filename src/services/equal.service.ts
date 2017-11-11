import { dependencyManager } from './dependency-manager';
import { ParameterService, ParameterDataType } from './parameter.service';

/**
 * A service to determine if things are equal
 * 
 * @export
 * @class EqualService
 */
export class EqualService {
  private parameterSrv: ParameterService = null;


  /**
   * Creates an instance of EqualService.
   * 
   * @memberof EqualService
   */
  constructor() {
    this.parameterSrv = dependencyManager.getByName('ParameterService');
  }


  /**
   * Check if a parameter equals a value, if it does not equal, it returns an
   * error
   * 
   * @param {*} param 
   * @param {string} paramName 
   * @param {*} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  paramEqualsValue(param: any, paramName: string, val: any): boolean|Error {
    if(!this.parameterSrv.isSet(param) || this.parameterSrv.isString(param)
    || this.parameterSrv.isNumber(param) || this.parameterSrv.isBoolean(param)) {
      return this.binaryEquals(param, paramName, val);
    } else if(this.parameterSrv.isArray(param)) {
      return this.arrayEquals(param, paramName, val);
    } else if(this.parameterSrv.isJson(param)) {
      return this.jsonEquals(param, paramName, val);
    } else {
      return new Error('Equal validation can only be used on data types: ' +
      'undefined, null, string, number, boolean, array or json. ' +
      ' The parameter being evaluated is of type: ' + 
      this.parameterSrv.getDataTypeAsString(param));
    }
  }


  /**
   * Check if a parameter and value are equal by using the === operator
   * 
   * @private
   * @param {*} param 
   * @param {string} paramName 
   * @param {*} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  private binaryEquals(param: any, paramName: string, val: any): boolean|Error {
    if(param === val) {
      return true;
    }
    return new Error('Parameter' + paramName + ' does not equal ' + val);
  }


  /**
   * Check if two arrays are equal
   * 
   * @private
   * @param {*} param 
   * @param {string} paramName 
   * @param {*} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  private arrayEquals(param: any, paramName: string, val: any): boolean|Error {
    if(this.parameterSrv.isArray(val) && this.arraysAreEqual(param, val)) {
      return true;
    }
    return new Error('Parameter' + paramName + ' does not equal the ' +
    'supplied array object');
  }


  /**
   * Check if two arrays are equal
   * 
   * @private
   * @param {any[]} a 
   * @param {any[]} b 
   * @returns {boolean} 
   * @memberof EqualService
   */
  private arraysAreEqual(a: any[], b: any[]): boolean {
    if(a.length !== b.length) { return false; }
    for(let i = 0; i < a.length; ++i) {
      let aDataType = this.parameterSrv.getDataType(a[i]);
      let bDataType = this.parameterSrv.getDataType(b[i]);
      if(aDataType !== bDataType) { return false; }
      switch(aDataType) {
        case ParameterDataType.String:
        case ParameterDataType.Number:
        case ParameterDataType.Boolean:
        case ParameterDataType.Null:
        case ParameterDataType.Undefined:
        case ParameterDataType.Unknown:
          if(a[i] !== b[i]) { return false; }
          break;
        case ParameterDataType.Array:
          if(!this.arraysAreEqual(a[i], b[i])) { return false; }
          break;
        case ParameterDataType.Json:
          if(JSON.stringify(a[i]) !== JSON.stringify(b[i])) { return false; }
          break;
      }
    }
    return true;
  }


  /**
   * Check if two json objects are equal
   * 
   * @private
   * @param {*} param 
   * @param {string} paramName 
   * @param {*} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  private jsonEquals(param: any, paramName: string, val: any): boolean|Error {
    if(JSON.stringify(param) === JSON.stringify(val)) {
      return true;
    }
    return new Error('Parameter' + paramName + ' does not equal the ' +
    'supplied json object');
  }


  /**
   * Determine if the parameter equals a minimum value. Can only be used 
   * with String, Number and Array data types
   * 
   * @param {*} param 
   * @param {string} paramName 
   * @param {number} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  paramEqualsMin(param: any, paramName: string, 
  val: number): boolean|Error {
    let dataType = this.parameterSrv.getDataType(param);
    if(dataType === ParameterDataType.String) {
      return this.stringMin(param, paramName, val);
    } else if(dataType === ParameterDataType.Array) {
      return this.arrayMin(param, paramName, val);
    } else if(dataType === ParameterDataType.Number) {
      return this.numberMin(param, paramName, val);
    } else {
      return new Error('Parameter' + paramName + ' is not the correct ' +
      'data type for the min() function, only String, Number and Array are ' +
      'supported');
    }
  }


  /**
   * Determine if the parameters string length meets the minimum value
   * 
   * @private
   * @param {*} param 
   * @param {string} paramName 
   * @param {number} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  private stringMin(param: any, paramName: string, val: number): boolean|Error {
    if(param.length < val) {
      return new Error('Parameter' + paramName + ' has a length less ' +
      'than the minimum value required');
    }
    return true;
  }


  /**
   * Determine if the parameters array length meets the minimum value
   * 
   * @private
   * @param {*} param 
   * @param {string} paramName 
   * @param {number} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  private arrayMin(param: any, paramName: string, val: number): boolean|Error {
    if(param.length < val) {
      return new Error('Parameter' + paramName + ' has an array length less ' +
      'than the minimum value required');
    }
    return true;
  }


  /**
   * Determine if the parameters value meets the minimum value
   * 
   * @private
   * @param {*} param 
   * @param {string} paramName 
   * @param {number} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  private numberMin(param: any, paramName: string, val: number): boolean|Error {
    if(param < val) {
      return new Error('Parameter' + paramName + ' has a value less ' +
      'than the minimum value required');
    }
    return true;
  }


  /**
   * Determine that a parameter does not exceed a maximum value. Can only be 
   * used with String, Number and Array data types
   * 
   * @param {*} param 
   * @param {string} paramName 
   * @param {number} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  paramEqualsMax(param: any, paramName: string, 
  val: number): boolean|Error {
    let dataType = this.parameterSrv.getDataType(param);
    if(dataType === ParameterDataType.String) {
      return this.stringMax(param, paramName, val);
    } else if(dataType === ParameterDataType.Array) {
      return this.arrayMax(param, paramName, val);
    } else if(dataType === ParameterDataType.Number) {
      return this.numberMax(param, paramName, val);
    } else {
      return new Error('Parameter' + paramName + ' is not the correct ' +
      'data type for the max() function, only String, Number and Array are ' +
      'supported');
    }
  }


  /**
   * Determine that a parameter does not exceed a mximum length
   * 
   * @private
   * @param {*} param 
   * @param {string} paramName 
   * @param {number} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  private stringMax(param: any, paramName: string, val: number): boolean|Error {
    if(param.length > val) {
      return new Error('Parameter' + paramName + ' has a length greater ' +
      'than the maximum value allowed');
    }
    return true;
  }


  /**
   * Determine that an array does not have more elements than a max value
   * 
   * @private
   * @param {*} param 
   * @param {string} paramName 
   * @param {number} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  private arrayMax(param: any, paramName: string, val: number): boolean|Error {
    if(param.length > val) {
      return new Error('Parameter' + paramName + ' has an array length ' +
      'greater than the maximum value allowed');
    }
    return true;
  }


  /**
   * Determine that a parameter does not exceed a maximum value
   * 
   * @private
   * @param {*} param 
   * @param {string} paramName 
   * @param {number} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  private numberMax(param: any, paramName: string, val: number): boolean|Error {
    if(param > val) {
      return new Error('Parameter' + paramName + ' has a value greater ' +
      'than the maximum value allowed');
    }
    return true;
  }


  /**
   * Determine if the parameter length equals a value
   * 
   * @param {*} param 
   * @param {string} paramName 
   * @param {number} val 
   * @returns {(boolean|Error)} 
   * @memberof EqualService
   */
  paramLengthEquals(param: any, paramName: string, val: number): boolean|Error {
    let dataType = this.parameterSrv.getDataType(param);
    if(dataType === ParameterDataType.String 
    || dataType === ParameterDataType.Array) {
      if(param.length === val) {
        return true;
      } else {
        return new Error('Parameter' + paramName + ' length does not equal '
        + val);
      }
    }
    return new Error('Parameter' + paramName + ' is not the correct ' +
    'data type for the lengthEquals() function, only String and Array are ' +
    'supported');
  }
}