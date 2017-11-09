import { dependencyManager } from './services/dependency-manager';
import { ParameterService } from './services/parameter.service';

export class VerifyParam {
  private parameterSrv: ParameterService;
  private param: any;
  private paramName: string;
  private paramSet: boolean = null;
  private validationErrorMsg: string = null;


  constructor(parameter: any, parameterName?: string) {
    this.parameterSrv = dependencyManager.get(ParameterService);
    this.param = parameter;
    this.paramName = (parameterName) ? ' (' + parameterName + ')' : '';
  }


  /**
   * Determine if the parameter is set for internal use, different to isSet()
   * public function
   * 
   * @private
   * @returns 
   * @memberof VerifyParam
   */
  private paramIsSet() {
    if(this.paramSet !== null) {
      return this.paramSet;
    }
    if(this.parameterSrv.isSet(this.param)) {
      this.paramSet = true;
      return true;
    }
    this.paramSet = false;
    this.setError('Parameter ' + this.paramName + ' is not set');
    return false;
  }


  private setError(msg: string) {
    this.validationErrorMsg = msg;
  }




  // functions starting with is will return a boolean

  isDefined() {} // parameter is not equal to undefined
  isDefinedOrThrowError(err?: any) {}
  isNotDefined() {}
  isSet() {} // parameter is not equal to undefined or null
  isSetOrThrowError(err?: any) {}
  isSetOrUseDefault() {} // myParam = verify(myParam).isSetOrUseDefault(10); // returns the parameter if set, or the default value
  isNotSet() {}

  // Returns true for:
  // true, "true", "yes", 1 (or greater), "1" (or greater), 
  isTruthy() {}

  // Returns true for:
  // false, "false", "no", 0, "0", "nil", undefined, null
  isFalsey() {}







  
  /**
   * Determine if the parameter is valid after the chainable functions have
   * been called
   * 
   * @returns {boolean} 
   * @memberof VerifyParam
   */
  isValid(): boolean {
    return (this.validationErrorMsg === null);
  }


  /**
   * Determine if the parameter is not valid after the chainable functions 
   * have been called
   * 
   * @returns {boolean} 
   * @memberof VerifyParam
   */
  isNotValid(): boolean {
    return (!this.isValid());
  }


  /**
   * Determine if the parameter is valid after the chainable functions have 
   * been called or if not valid, throw an error.
   * 
   * @param {*} [err] 
   * @returns {boolean} 
   * @memberof VerifyParam
   */
  isValidOrThrowError(err?: any): boolean {
    if(this.isValid()) {
      return true;
    }
    if(err) {
      if(this.parameterSrv.isString(err)) {
        throw new Error(err);
      }
      throw err;
    } else {
      throw new Error(this.validationErrorMsg);
    }
  } 



  // validate functions will return the verify instance object so it can be chained

  string(): VerifyParam {
    if(this.paramIsSet() && !this.parameterSrv.isString(this.param)) {
      this.setError('Parameter' + this.paramName + ' is not a string');
    }
    return this;
  }
  
  array() {}


  
  /**
   * Determine if the parameter is a number.
   * 
   * @param {boolean} [allowNumbersAsStrings=false] 
   * @returns {VerifyParam} 
   * @memberof VerifyParam
   */
  number(allowNumbersAsStrings: boolean = false): VerifyParam {
    if(this.paramIsSet() 
    && !this.parameterSrv.isNumber(this.param, allowNumbersAsStrings)) {
      this.setError('Parameter' + this.paramName + ' is not a number');
    }
    return this;
  }
  int() {}
  json() {}

  min() {}
  max() {}

  email() {}

  equals(val: any) {} // check if the parameter equals a value
  notEquals(val: any) {}
  lengthEquals(val: number) {} // check if a string or array length eqauls a value

  empty() {}
  notEmpty() {}
}