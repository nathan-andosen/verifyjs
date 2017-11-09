"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verify_1 = require("../../src/verify");
var test_helper_1 = require("../support/test-helper");
var testHelper = new test_helper_1.TestHelper();
describe('verify', function () {
    beforeAll(function () {
        testHelper.setupDependencyManager();
    });
    it('should use the VerifyParam class to verify the parameter', function () {
        var myParam = 10;
        expect(verify_1.verify(myParam).number().isValid()).toEqual(true);
    });
});
//# sourceMappingURL=verify.spec.js.map