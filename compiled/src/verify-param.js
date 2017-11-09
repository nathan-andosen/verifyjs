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
    VerifyParam.prototype.isDefined = function () {
        return this.parameterSrv.isDefined(this.param);
    };
    VerifyParam.prototype.isDefinedOrThrowError = function (err) {
        if (this.isDefined()) {
            return true;
        }
        if (err) {
            if (this.parameterSrv.isString(err)) {
                throw new Error(err);
            }
            throw err;
        }
        else {
            throw new Error('Parameter' + this.paramName + ' is undefined');
        }
    };
    VerifyParam.prototype.isNotDefined = function () {
        return (!this.isDefined());
    };
    VerifyParam.prototype.isSet = function () {
        return this.paramIsSet();
    };
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
    VerifyParam.prototype.array = function () {
        if (this.paramIsSet() && !this.parameterSrv.isArray(this.param)) {
            this.setError('Parameter' + this.paramName + ' is not an array');
        }
        return this;
    };
    VerifyParam.prototype.number = function (allowNumberAsString) {
        if (allowNumberAsString === void 0) { allowNumberAsString = false; }
        if (this.paramIsSet()
            && !this.parameterSrv.isNumber(this.param, allowNumberAsString)) {
            this.setError('Parameter' + this.paramName + ' is not a number');
        }
        return this;
    };
    VerifyParam.prototype.int = function (allowIntAsString) {
        if (allowIntAsString === void 0) { allowIntAsString = false; }
        if (this.paramIsSet()
            && !this.parameterSrv.isInt(this.param, allowIntAsString)) {
            this.setError('Parameter' + this.paramName + ' is not an integer');
        }
        return this;
    };
    VerifyParam.prototype.json = function () {
        if (this.paramIsSet() && !this.parameterSrv.isJson(this.param)) {
            this.setError('Parameter' + this.paramName + ' is not a json object');
        }
        return this;
    };
    VerifyParam.prototype.email = function () {
        if (this.paramIsSet() && !this.parameterSrv.isEmail(this.param)) {
            this.setError('Parameter' + this.paramName + ' is not a valid email');
        }
        return this;
    };
    VerifyParam.prototype.min = function () { };
    VerifyParam.prototype.max = function () { };
    VerifyParam.prototype.equals = function (val) { };
    VerifyParam.prototype.notEquals = function (val) { };
    VerifyParam.prototype.lengthEquals = function (val) { };
    VerifyParam.prototype.empty = function () { };
    VerifyParam.prototype.notEmpty = function () { };
    return VerifyParam;
}());
exports.VerifyParam = VerifyParam;
//# sourceMappingURL=verify-param.js.map