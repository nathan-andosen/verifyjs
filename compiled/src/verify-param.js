"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var parameter_service_1 = require("./services/parameter.service");
var equal_service_1 = require("./services/equal.service");
var DI = require("./services/dependency-injection.service");
var VerifyParam = (function () {
    function VerifyParam(parameter, parameterName) {
        this.paramSet = null;
        this.validationErrorMsg = null;
        this.param = parameter;
        this.paramName = (parameterName) ? ' (' + parameterName + ')' : '';
    }
    VerifyParam.prototype.paramIsSet = function () {
        if (this.paramSet !== null)
            return this.paramSet;
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
        if (this.isDefined())
            return true;
        if (err) {
            if (this.parameterSrv.isString(err))
                throw new Error(err);
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
    VerifyParam.prototype.isNotSet = function () {
        return (!this.isSet());
    };
    VerifyParam.prototype.isSetOrThrowError = function (err) {
        if (this.isSet())
            return true;
        if (err) {
            if (this.parameterSrv.isString(err))
                throw new Error(err);
            throw err;
        }
        else {
            throw new Error(this.validationErrorMsg);
        }
    };
    VerifyParam.prototype.isSetOrUseDefault = function (defaultVal) {
        if (!this.paramIsSet())
            return defaultVal;
        return this.param;
    };
    VerifyParam.prototype.isTruthy = function () {
        var val = (this.parameterSrv.isString(this.param))
            ? this.param.toLowerCase() : this.param;
        if (val && (val === '1' || val >= 1 || val === true || val === 'true'
            || val === 'yes'))
            return true;
        return false;
    };
    VerifyParam.prototype.isFalsey = function () {
        if (this.isNotSet()) {
            return true;
        }
        var val = (this.parameterSrv.isString(this.param))
            ? this.param.toLowerCase() : this.param;
        if (val === '0' || val === 'false' || val === 'no' || val === false
            || val < 1 || val === 'nil')
            return true;
        return false;
    };
    VerifyParam.prototype.isValid = function () {
        return (this.validationErrorMsg === null);
    };
    VerifyParam.prototype.isNotValid = function () {
        return (!this.isValid());
    };
    VerifyParam.prototype.isValidOrThrowError = function (err) {
        if (this.isValid())
            return true;
        if (err) {
            if (this.parameterSrv.isString(err))
                throw new Error(err);
            throw err;
        }
        else {
            throw new Error(this.validationErrorMsg);
        }
    };
    VerifyParam.prototype.type = function (type) {
        if (this.paramIsSet()) {
            if (typeof this[type] !== "function")
                throw new Error('Type: ' + type + ' not supported');
            return this[type]();
        }
        return this;
    };
    VerifyParam.prototype.boolean = function () {
        if (this.paramIsSet() && !this.parameterSrv.isBoolean(this.param)) {
            this.setError('Parameter' + this.paramName + ' is not a boolean');
        }
        return this;
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
    VerifyParam.prototype.min = function (val) {
        if (this.paramIsSet()) {
            var result = this.equalSrv.paramEqualsMin(this.param, this.paramName, val);
            if (result instanceof Error) {
                this.setError(result.message);
            }
        }
        return this;
    };
    VerifyParam.prototype.max = function (val) {
        if (this.paramIsSet()) {
            var result = this.equalSrv.paramEqualsMax(this.param, this.paramName, val);
            if (result instanceof Error) {
                this.setError(result.message);
            }
        }
        return this;
    };
    VerifyParam.prototype.equals = function (val) {
        if (this.paramIsSet()) {
            var result = this.equalSrv.paramEqualsValue(this.param, this.paramName, val);
            if (result instanceof Error) {
                this.setError(result.message);
            }
        }
        return this;
    };
    VerifyParam.prototype.notEquals = function (val) {
        if (this.paramIsSet()) {
            var result = this.equalSrv.paramEqualsValue(this.param, this.paramName, val);
            if (result === true) {
                this.setError('Parameter' + this.paramName + ' is equal to the value');
            }
        }
        return this;
    };
    VerifyParam.prototype.lengthEquals = function (val) {
        if (this.paramIsSet()) {
            var result = this.equalSrv.paramLengthEquals(this.param, this.paramName, val);
            if (result instanceof Error) {
                this.setError(result.message);
            }
        }
        return this;
    };
    VerifyParam.prototype.empty = function () {
        if (this.paramIsSet() && !this.parameterSrv.isEmpty(this.param)) {
            this.setError('Parameter' + this.paramName + ' is not empty');
        }
        return this;
    };
    VerifyParam.prototype.notEmpty = function () {
        if (this.paramIsSet() && this.parameterSrv.isEmpty(this.param)) {
            this.setError('Parameter' + this.paramName + ' is empty');
        }
        return this;
    };
    __decorate([
        DI.Inject(parameter_service_1.ParameterService, 'ParameterService'),
        __metadata("design:type", parameter_service_1.ParameterService)
    ], VerifyParam.prototype, "parameterSrv", void 0);
    __decorate([
        DI.Inject(equal_service_1.EqualService, 'EqualService'),
        __metadata("design:type", equal_service_1.EqualService)
    ], VerifyParam.prototype, "equalSrv", void 0);
    return VerifyParam;
}());
exports.VerifyParam = VerifyParam;
//# sourceMappingURL=verify-param.js.map