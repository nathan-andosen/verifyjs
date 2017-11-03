


export class Verify {

  // functions starting with is will return a boolean

  isDefined() {} // parameter is not equal to undefined
  isDefinedOrThrowError(err?: any) {}
  isNotDefined() {}
  isSet() {} // parameter is not equal to undefined or null
  isSetOrThrowError(err?: any) {}
  isNotSet() {}

  isValid() {}
  isNotValid() {}
  isValidOrThrowError(err?: any) {} // err can be string or Error or custom error


  // validate functions will return the verify instance object

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


export let verify = () => {

};