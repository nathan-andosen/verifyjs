import { dependencyManager } from './services/dependency-manager';
import { 
  ParameterService, 
  ParameterDataType 
} from './services/parameter.service';
import { EqualService } from './services/equal.service';


/**
 * Verify a single parameter
 * 
 * @export
 * @class VerifyParam
 */
export class VerifyParam {
  private parameterSrv: ParameterService;
  private equalSrv: EqualService;
  private param: any;
  private paramName: string;
  private paramSet: boolean = null;
  private validationErrorMsg: string = null;


  /**
   * Creates an instance of VerifyParam.
   * 
   * @param {*} parameter 
   * @param {string} [parameterName] 
   * @memberof VerifyParam
   */
  constructor(parameter: any, parameterName?: string) {
    this.parameterSrv = dependencyManager.get(ParameterService);
    this.equalSrv = dependencyManager.get(EqualService);
    this.param = parameter;
    this.paramName = (parameterName) ? ' (' + parameterName + ')' : '';
  }


  /**
   * Determine if the parameter is set for internal use, different to isSet()
   * public function
   * 
   * @private
   * @returns {boolean} 
   * @memberof VerifyParam
   */
  private paramIsSet(): boolean {
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


  /**
   * Set the validation error
   * 
   * @private
   * @param {string} msg 
   * @memberof VerifyParam
   */
  private setError(msg: string) {
    this.validationErrorMsg = msg;
  }


  /**
   * Determine if the parameter is not equal to undefined
   * 
   * @returns {boolean} 
   * @memberof VerifyParam
   */
  isDefined(): boolean {
    return this.parameterSrv.isDefined(this.param);
  }


  /**
   * Determine if the parameter is not equal to undefined, otherwise throw 
   * an error
   * 
   * @param {*} [err] 
   * @returns {(boolean|Error)} 
   * @memberof VerifyParam
   */
  isDefinedOrThrowError(err?: any): boolean {
    if(this.isDefined()) {
      return true;
    }
    if(err) {
      if(this.parameterSrv.isString(err)) {
        throw new Error(err);
      }
      throw err;
    } else {
      throw new Error('Parameter' + this.paramName + ' is undefined');
    }
  }


  /**
   * Determine if the parameter is not defined
   * 
   * @returns {boolean} 
   * @memberof VerifyParam
   */
  isNotDefined(): boolean {
    return (!this.isDefined());
  }


  /**
   * Determine if the parameter is not set to undefined or null
   * 
   * @returns {boolean} 
   * @memberof VerifyParam
   */
  isSet(): boolean {
    return this.paramIsSet();
  }


  /**
   * Determine if the parameter is not set
   * 
   * @returns {boolean} 
   * @memberof VerifyParam
   */
  isNotSet(): boolean {
    return (!this.isSet());
  }


  /**
   * Determine if the parameter is set or throw an error
   * 
   * @param {*} [err] 
   * @returns {boolean} 
   * @memberof VerifyParam
   */
  isSetOrThrowError(err?: any): boolean {
    if(this.isSet()) {
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


  /**
   * Determine if the parameter is set, if not, set it to the default value
   * 
   * @param {*} defaultVal 
   * @returns {*} 
   * @memberof VerifyParam
   */
  isSetOrUseDefault(defaultVal: any): any {
    if(!this.paramIsSet()) {
      return defaultVal;
    }
    return this.param;
  } 
  

  /**
   * Determine if the paramter is truthy
   * 
   * @returns {boolean} 
   * @memberof VerifyParam
   */
  isTruthy(): boolean {
    let val = (this.parameterSrv.isString(this.param)) 
      ? this.param.toLowerCase() : this.param;
    if(val && (val === '1' || val >= 1 || val === true || val === 'true' 
    || val === 'yes')) {
      return true;
    }
    return false;
  }

  
  /**
   * Determine if the parameter is falsey
   * 
   * @returns {boolean} 
   * @memberof VerifyParam
   */
  isFalsey(): boolean {
    let val = (this.parameterSrv.isString(this.param)) 
      ? this.param.toLowerCase() : this.param;
    if(val === '0' || val === 'false' || val === 'no' || val === false 
    || val < 1 || val === 'nil') {
      return true;
    } 
    return false;
  }


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

  // CHAINABLE FUNCTIONS BELOW /////////////////////////////////////////////////

  /**
   * Determine if the parameter is a string
   * 
   * @returns {VerifyParam} 
   * @memberof VerifyParam
   */
  string(): VerifyParam {
    if(this.paramIsSet() && !this.parameterSrv.isString(this.param)) {
      this.setError('Parameter' + this.paramName + ' is not a string');
    }
    return this;
  }


  /**
   * Determine if the parameter is an array
   * 
   * @returns {VerifyParam} 
   * @memberof VerifyParam
   */
  array(): VerifyParam {
    if(this.paramIsSet() && !this.parameterSrv.isArray(this.param)) {
      this.setError('Parameter' + this.paramName + ' is not an array');
    }
    return this;
  }

  
  /**
   * Determine if the parameter is a number.
   * 
   * @param {boolean} [allowNumberAsString=false] 
   * @returns {VerifyParam} 
   * @memberof VerifyParam
   */
  number(allowNumberAsString: boolean = false): VerifyParam {
    if(this.paramIsSet() 
    && !this.parameterSrv.isNumber(this.param, allowNumberAsString)) {
      this.setError('Parameter' + this.paramName + ' is not a number');
    }
    return this;
  }


  /**
   * Determine if the parameter is an integer
   * 
   * @param {boolean} [allowIntAsString=false] 
   * @returns {VerifyParam} 
   * @memberof VerifyParam
   */
  int(allowIntAsString: boolean = false): VerifyParam {
    if(this.paramIsSet() 
    && !this.parameterSrv.isInt(this.param, allowIntAsString)) {
      this.setError('Parameter' + this.paramName + ' is not an integer');
    }
    return this;
  }


  /**
   * Determine if the parameter is a json object
   * 
   * @returns {VerifyParam} 
   * @memberof VerifyParam
   */
  json(): VerifyParam {
    if(this.paramIsSet() && !this.parameterSrv.isJson(this.param)) {
      this.setError('Parameter' + this.paramName + ' is not a json object');
    } 
    return this;
  }


  /**
   * Determine if the parameter is a valid email address
   * 
   * @returns {VerifyParam} 
   * @memberof VerifyParam
   */
  email(): VerifyParam {
    if(this.paramIsSet() && !this.parameterSrv.isEmail(this.param)) {
      this.setError('Parameter' + this.paramName + ' is not a valid email');
    }
    return this;
  }


  /**
   * Determine if the parameter meets the minimum value
   * 
   * @param {number} val 
   * @returns {VerifyParam} 
   * @memberof VerifyParam
   */
  min(val: number): VerifyParam {
    if(this.paramIsSet()) {
      let result = this.equalSrv.paramEqualsMin(this.param, this.paramName, val);
      if(result instanceof Error) {
        this.setError(result.message);
      }
    }
    return this;
  }


 


  max() {}

  equals(val: any) {} // check if the parameter equals a value
  notEquals(val: any) {}
  lengthEquals(val: number) {} // check if a string or array length eqauls a value

  empty() {}
  notEmpty() {}
}