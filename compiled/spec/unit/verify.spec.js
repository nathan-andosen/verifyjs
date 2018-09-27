"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verify_1 = require("../../src/verify");
describe('verify', function () {
    it('should use the VerifyParam class to verify the parameter', function () {
        var myParam = 10;
        expect(verify_1.verify(myParam).number().isValid()).toEqual(true);
    });
    it('should work inside a promise', function (done) {
        var myFunc = function () {
            return new Promise(function (resolve, reject) {
                verify_1.verify(10).equals(11).isValidOrThrowError();
                var test = 10;
                resolve();
            });
        };
        myFunc().then(function () {
            expect(true).toEqual(false);
        }).catch(function (err) {
            expect(true).toEqual(true);
            done();
        });
    });
});
//# sourceMappingURL=verify.spec.js.map