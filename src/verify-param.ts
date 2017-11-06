

export class VerifyParam {
  
    // functions starting with is will return a boolean
  
    isDefined() {} // parameter is not equal to undefined
    isDefinedOrThrowError(err?: any) {}
    isNotDefined() {}
    isSet() {} // parameter is not equal to undefined or null
    isSetOrThrowError(err?: any) {}
    isSetOrUseDefault() {} // myParam = verify(myParam).isSetOrUseDefault(10); // returns the parameter if set, or the default value
    isNotSet() {}
  
  
    // only the valid functions can be used with the chainable functions
    isValid() {}
    isNotValid() {}
    isValidOrThrowError(err?: any) {} // err can be string or Error or custom error
  
  
  
    // validate functions will return the verify instance object so it can be chained
  
    string() {}
    array() {}
    number() {}
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