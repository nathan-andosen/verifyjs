import { verify } from '../../src/verify';

declare var Promise: any;

describe('verify', () => {
  it('should use the VerifyParam class to verify the parameter', () => {
    let myParam = 10;
    expect(verify(myParam).number().isValid()).toEqual(true);
  });


  it('should work inside a promise', (done) => {
    let myFunc = function() {
      return new Promise((resolve, reject) => {
        verify(10).equals(11).isValidOrThrowError();
        // do something here
        let test = 10;
        resolve();
      });
    };

    myFunc().then(() => {
      // should not get called
      expect(true).toEqual(false);
    }).catch((err) => {
      // should get called
      expect(true).toEqual(true);
      done();
    });
  });
});