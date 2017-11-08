import { dependencyManager } from './dependency-manager';
import { ParameterService } from './parameter.service';

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


  paramEqualsValue(param: any, val: any): boolean|Error {
    if(!this.parameterSrv.isSet(param) || this.parameterSrv.isString(param)
    || this.parameterSrv.isNumber(param)) {
      
    } else if(this.parameterSrv.isArray(param)) {

    } else if(this.parameterSrv.isJson(param)) {

    } else {
      return new Error('Equal validation can only be used on data types: ' +
      'undefined, null, string, number, array or json. The parameter being ' +
      'evaluated is of type: ' + this.parameterSrv.getDataTypeAsString(param));
    }
  }



}