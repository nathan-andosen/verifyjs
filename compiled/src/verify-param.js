"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_manager_1 = require("./services/dependency-manager");
var parameter_service_1 = require("./services/parameter.service");
var VerifyParam = (function () {
    function VerifyParam(parameter, parameterName) {
        this.paramSet = null;
        this.validationErrorMsg = null;
        this.parameterSrv = dependency_manager_1.dependencyManager.get(parameter_service_1.ParameterService);
        this.param = parameter;
        this.paramName = (parameterName) ? ' (' + parameterName + ')' : '';
    }
    VerifyParam.prototype.paramIsSet = function () {
        if (this.paramSet !== null) {
            return this.paramSet;
        }
        if (this.parameterSrv.isSet(this.param)) {
            this.paramSet = true;
            return true;
        }
        this.paramSet = false;
        this.setError('Parameter ' + this.paramName + ' is not set');
        return false;
    };
    VerifyParam.prototype.setError = function (msg) {
        this.validationErrorMsg = msg;
    };
    VerifyParam.prototype.isDefined = function () { };
    VerifyParam.prototype.isDefinedOrThrowError = function (err) { };
    VerifyParam.prototype.isNotDefined = function () { };
    VerifyParam.prototype.isSet = function () { };
    VerifyParam.prototype.isSetOrThrowError = function (err) { };
    VerifyParam.prototype.isSetOrUseDefault = function () { };
    VerifyParam.prototype.isNotSet = function () { };
    VerifyParam.prototype.isTruthy = function () { };
    VerifyParam.prototype.isFalsey = function () { };
    VerifyParam.prototype.isValid = function () {
        return (this.validationErrorMsg === null);
    };
    VerifyParam.prototype.isNotValid = function () {
        return (!this.isValid());
    };
    VerifyParam.prototype.isValidOrThrowError = function (err) {
        if (this.isValid()) {
            return true;
        }
        if (err) {
            if (this.parameterSrv.isString(err)) {
                throw new Error(err);
            }
            throw err;
        }
        else {
            throw new Error(this.validationErrorMsg);
        }
    };
    VerifyParam.prototype.string = function () {
        if (this.paramIsSet() && !this.parameterSrv.isString(this.param)) {
            this.setError('Parameter' + this.paramName + ' is not a string');
        }
        return this;
    };
    VerifyParam.prototype.array = function () { };
    VerifyParam.prototype.number = function (allowNumbersAsStrings) {
        if (allowNumbersAsStrings === void 0) { allowNumbersAsStrings = false; }
        if (this.paramIsSet()
            && !this.parameterSrv.isNumber(this.param, allowNumbersAsStrings)) {
            this.setError('Parameter' + this.paramName + ' is not a number');
        }
        return this;
    };
    VerifyParam.prototype.int = function () { };
    VerifyParam.prototype.json = function () { };
    VerifyParam.prototype.min = function () { };
    VerifyParam.prototype.max = function () { };
    VerifyParam.prototype.email = function () { };
    VerifyParam.prototype.equals = function (val) { };
    VerifyParam.prototype.notEquals = function (val) { };
    VerifyParam.prototype.lengthEquals = function (val) { };
    VerifyParam.prototype.empty = function () { };
    VerifyParam.prototype.notEmpty = function () { };
    return VerifyParam;
}());
exports.VerifyParam = VerifyParam;
//# sourceMappingURL=verify-param.js.map