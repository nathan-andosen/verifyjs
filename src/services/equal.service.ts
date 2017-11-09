import { dependencyManager } from './dependency-manager';
import { ParameterService, ParameterDataType } from './parameter.service';

/**
 * A service to determine if things are equal
 * 
 * @export
 * @class EqualService
 */
export class EqualService {
  private parameterSrv: ParameterService;


  /**
   * Creates an instance of EqualService.
   * 
   * @memberof EqualService
   */
  constructor() {
    this.parameterSrv = dependencyManager.get(ParameterService);
  }


  paramEqualsValue(param: any, paramName: string, val: any): boolean|Error {
    if(!this.parameterSrv.isSet(param) || this.parameterSrv.isString(param)
    || this.parameterSrv.isNumber(param)) {
      return this.binaryEquals(param, paramName, val);
    } else if(this.parameterSrv.isArray(param)) {
      return this.arrayEquals(param, paramName, val);
    } else if(this.parameterSrv.isJson(param)) {
      return this.jsonEquals(param, paramName, val);
    } else {
      return new Error('Equal validation can only be used on data types: ' +
      'undefined, null, string, number, array or json. The parameter being ' +
      'evaluated is of type: ' + this.parameterSrv.getDataTypeAsString(param));
    }
  }


  private binaryEquals(param: any, paramName: string, val: any): boolean|Error {
    if(param === val) {
      return true;
    }
    return new Error('Parameter ' + paramName + ' does not equal ' + val);
  }


  private arrayEquals(param: any, paramName: string, val: any): boolean|Error {
    if(this.arraysAreEqual(param, val)) {
      return true;
    }
    return new Error('Parameter ' + paramName + ' does not equal the ' +
    'supplied array object');
  }


  private arraysAreEqual(a: any[], b: any[]): boolean {
    if(a === b) { return true; }
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


  private jsonEquals(param: any, paramName: string, val: any): boolean|Error {
    if(JSON.stringify(param) === JSON.stringify(val)) {
      return true;
    }
    return new Error('Parameter ' + paramName + ' does not equal the ' +
    'supplied json object');
  }

}