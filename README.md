![Test Coverage-shield-badge-1](https://img.shields.io/badge/Test%20Coverage-100%25-brightgreen.svg)

# Under construction

__THIS MODULE IS UNDER CONSTRUCTION__

TODO:

- How to use with promises


# Verifyjs

A simple way to verify parameters in typescript / javascript. 

## How to use

```typescript
import { verify } from 'verifyjs';

let myAge = 33;
verify(myAge).number().min(18).max(99).isValid();
```

__More examples:__

```typescript
verify({ a: 1 }).equals({ a: 1 }).isValid();

let myAge = 17;
verify(myAge).min(18).isValidOrThrowError('You need to be at least 18 to drink beer');

// throw a custom error
verify(myEmail).email().isValidOrThrowError(new Error('Invalid email'));

verify(myPassword).string().min(8).notEquals('password').isValidOrThrowError();

let name = null;
name = verify(name).isSetOrUseDefault('Unknown');

// specify a parameter name so the error message thrown is useful
let myAge = '33';
verify(myAge, 'age').number().isValidOrThrowError();
// The error that will get thrown will read:
//   Parameter (age) is not a number
// Where as, if you did not pass a parameter name, the error message would read:
//   Parameter is not a number

verify('23').number().isValid(); // will return false
verify('23').number(true).isValid(); // will return true
```

### verify(parameter: any, parameterName?: string)

Everything starts with the verify function. This method accepts two arguments, the first being the parameter you want to verify and the second argument is the name of the parameter, this is optional. This helps with returning useful error messages (check the examples below).

### Chainable validation methods

_The chainable validation methods have to be used with __isValid()__, __isNotValid()__ or __isValidOrThrowError()___

|Method | Description
|-------|-------------|
|string() | verify the parameter is a string |
|number(allowNumberAsString: boolean = false) | verify the parameter is a number |
|int(allowIntAsString: boolean = false) | verify the parameter is an integer |
|array() | verify the parameter is an array |
|json() | verify the parameter is a json object |
|email() | verify the parameter is a valid email address |
|min(value: number) | verify the parameter meets the minimum value required, can only be used with data types: string, number and array |
|max(value: number) | verify the parameter does not exceed the maximum allowed value, can only be used with data types: string, number and array |
|equals(value: any) | verify the parameter eqauls the value |
|notEquals(value: any) | verify the parameter does not equal the value |
|lengthEquals(value: number) | verify the parameter length equals the value, can only be used with data types: string and array |
|empty() | verify the parameter is empty, can only be used with data types: string, array and json |
|notEmpty() | verify the parameter is not empty, can only be used with data types: string, array and json |

### Methods

|Method | Description |
|-------|-------------|
|isValid() | determine if the chainable validation methods evaluate to true |
|isNotValid() | determine if any of the chainable validation methods evaluate to false |
|isNotValidOrThrowError(err?: any) | determine if the chainable validation methods evaluate to true, if not, an error is thrown. |

_The below methods can not be used with the chainable validation methods._

|Method | Description |
|-------|-------------|
|isDefined() | determine if the parameter is defined (not equal to undefined) |
|isDefinedOrThrowError(err?: any) | determine if the parameter is defined (not equal to undefined), otherwise throw an error |
|isNotDefined() | determine if the parameter equals undefined |
|isSet() | determine if the parameter is set (not equal to undefined or null) |
|isSetOrThrowError(err?: any) | determine if the parameter is set (not equal to undefined or null), otherwise throw an error |
|isNotSet() | determine if the parameter is equal to undefined or null |
|isSetOrUseDefault(defaultValue: any) | determine if the parameter is set, if not, set it to the default value |
|isTruthy() | determine if the parameter equals either: "1", >= 1, true, "true" or "yes" |
|isFalsey() | determine if the parameter equals either: "0", "false", "no", false, < 1, "nil" |

## Use cases:

Most of the time you should be validating your parameters in a function, verifyjs allows you to do this in a clean and simple manner.

```typescript
class Person {
  constructor(private name: string, private age: number) {}

  setDetails(name: string, age: number) {
    verify(name, 'name').isSetOrThrowError();
    verify(age, 'age').min(0).max(99).isValidOrThrowError();
    
    this.name = name;
    this.age = age;
  }
}

// somewhere else in your code
try {
  let person = new Person();
  person.setDetails('Nathan', 190);
} catch(err) {
  // handle error
}
```

## Development

``npm run init`` - Setup the module for development (run once after cloning)

``npm run dev`` - Run this command when you want to work on this module. It will compile typescript, run tests and watch for file changes.

## Distribution

``npm run build -- -v <version>`` - Create a distribution build of the module.

__-v (version)__ - _[Optional]_ Either "patch", "minor" or "major". Increase the version number in the package.json file.

The build command creates a _/compiled_ directory which has all the javascript compiled code and typescript definitions. As well, a _/dist_ directory is created that contains a minified javascript file.

## Testing

_Tests are automatically ran when you do a build._

``npm run test`` - Run the tests. The tests will be ran in a nodejs environment. You can run the tests in a browser environment by opening the file  _/spec/in-browser/SpecRunner.html_.


## License

MIT © [Nathan Anderson](https://github.com/nathan-andosen)