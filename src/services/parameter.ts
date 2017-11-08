/**
 * The data type of the parameter being validated.
 * 
 * @export
 * @enum {number}
 */
export enum ParameterDataType {
  Null,
  Undefined,
  String, 
  Number,
  Boolean,
  Array,
  Json,
  Unknown
};


/**
 * Parameter class
 * 
 * @export
 * @class Parameter
 */
export class Parameter {

  /**
   * Get the data type of an object
   * 
   * @private
   * @param {*} param 
   * @returns {ParameterDataType} 
   */
  getDataType(param: any): ParameterDataType {
    if(typeof param === 'undefined') {
      return ParameterDataType.Undefined;
    } else if(param === null) {
      return ParameterDataType.Null;
    } else if(typeof param === "number"){
      return ParameterDataType.Number;
    } else if (typeof param === "string") {
      return ParameterDataType.String;
    } else if(typeof param === "boolean") {
      return ParameterDataType.Boolean;
    } else if(typeof param === "object") {
      // could be an array, regex, json object, function
      if(this.isArray(param)) {
        return ParameterDataType.Array;
      } else if(this.isJson(param)) {
        return ParameterDataType.Json;
      }
    }
    return ParameterDataType.Unknown;
  }


  /**
   * Determine if a parameter is defined
   * 
   * @param {*} param 
   * @returns 
   * @memberof Parameter
   */
  isDefined(param: any) {
    return (typeof param !== 'undefined');
  }


  /**
   * Determine if a parameter is not undefined and not null
   * 
   * @param {*} param 
   * @returns {boolean} 
   * @memberof Parameter
   */
  isSet(param: any): boolean {
    return (typeof param !== 'undefined' && param !== null);
  }


  /**
   * Determine if a parameter is a json object
   * 
   * @param {*} param 
   * @returns {boolean} 
   * @memberof Parameter
   */
  isJson(param: any): boolean {
    if(!this.isSet(param)) { return false; }
    return (param instanceof Object && param.constructor === {}.constructor); 
  }


  /**
   * Determine if a parameter is an array
   * 
   * @param {*} param 
   * @returns {boolean} 
   * @memberof Parameter
   */
  isArray(param: any): boolean {
    if(!this.isSet(param)) { return false; }
    return (Array.isArray(param));
  }


  /**
   * Determine if a parameter is a string
   * 
   * @param {*} param 
   * @returns {boolean} 
   * @memberof Parameter
   */
  isString(param: any): boolean {
    if(!this.isSet(param)) { return false; }
    return (typeof param === 'string' || param instanceof String);
  }


  /**
   * Determine if a parameter is a number. This includes strings that contain
   * numbers, example: '10' but not '10 abc'
   * 
   * TODO: add param that allows you to disable the numbers as a string
   * 
   * @param {*} param 
   * @returns {boolean} 
   * @memberof Parameter
   */
  isNumber(param: any): boolean {
    if(!this.isSet(param)) { return false; }
    return (!(isNaN(parseFloat(param)) || !isFinite(param)));
  }


  /**
   * Determine if a parameter is an integer, this includes strings that contain
   * integers, example: '10' but not '10 abc'
   * 
   * TODO: add param that allows you to disable the integers as a string
   * 
   * @param {*} param 
   * @returns {boolean} 
   * @memberof Parameter
   */
  isInt(param: any): boolean {
    if(!this.isSet(param)) { return false; }
    let x = parseFloat(param);
    return (!(isNaN(param) || !((x | 0) === x)));
  }


  /**
   * Determine if a parameter is a valid email address
   * 
   * @param {*} param 
   * @returns {boolean} 
   * @memberof Parameter
   */
  isEmail(param: any): boolean {
    if(!this.isSet(param)) { return false; }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (re.test(param));
  }
}