"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verify_param_1 = require("./verify-param");
exports.verify = function (parameter, parameterName) {
    var verifyParam = new verify_param_1.VerifyParam(parameter, parameterName);
    return verifyParam;
};
//# sourceMappingURL=verify.js.map