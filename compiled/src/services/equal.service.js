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
var parameter_service_1 = require("./parameter.service");
var DI = require("./dependency-injection.service");
var EqualService = (function () {
    function EqualService() {
    }
    EqualService.prototype.paramEqualsValue = function (param, paramName, val) {
        if (!this.parameterSrv.isSet(param) || this.parameterSrv.isString(param)
            || this.parameterSrv.isNumber(param) || this.parameterSrv.isBoolean(param)) {
            return this.binaryEquals(param, paramName, val);
        }
        else if (this.parameterSrv.isArray(param)) {
            return this.arrayEquals(param, paramName, val);
        }
        else if (this.parameterSrv.isJson(param)) {
            return this.jsonEquals(param, paramName, val);
        }
        else {
            return new Error('Equal validation can only be used on data types: ' +
                'undefined, null, string, number, boolean, array or json. ' +
                ' The parameter being evaluated is of type: ' +
                this.parameterSrv.getDataTypeAsString(param));
        }
    };
    EqualService.prototype.binaryEquals = function (param, paramName, val) {
        if (param === val)
            return true;
        return new Error('Parameter' + paramName + ' does not equal ' + val);
    };
    EqualService.prototype.arrayEquals = function (param, paramName, val) {
        if (this.parameterSrv.isArray(val) && this.arraysAreEqual(param, val))
            return true;
        return new Error('Parameter' + paramName + ' does not equal the ' +
            'supplied array object');
    };
    EqualService.prototype.arraysAreEqual = function (a, b) {
        if (a.length !== b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            var aDataType = this.parameterSrv.getDataType(a[i]);
            var bDataType = this.parameterSrv.getDataType(b[i]);
            if (aDataType !== bDataType)
                return false;
            switch (aDataType) {
                case parameter_service_1.ParameterDataType.String:
                case parameter_service_1.ParameterDataType.Number:
                case parameter_service_1.ParameterDataType.Boolean:
                case parameter_service_1.ParameterDataType.Null:
                case parameter_service_1.ParameterDataType.Undefined:
                case parameter_service_1.ParameterDataType.Unknown:
                    if (a[i] !== b[i])
                        return false;
                    break;
                case parameter_service_1.ParameterDataType.Array:
                    if (!this.arraysAreEqual(a[i], b[i]))
                        return false;
                    break;
                case parameter_service_1.ParameterDataType.Json:
                    if (JSON.stringify(a[i]) !== JSON.stringify(b[i]))
                        return false;
                    break;
            }
        }
        return true;
    };
    EqualService.prototype.jsonEquals = function (param, paramName, val) {
        if (JSON.stringify(param) === JSON.stringify(val))
            return true;
        return new Error('Parameter' + paramName + ' does not equal the ' +
            'supplied json object');
    };
    EqualService.prototype.paramEqualsMin = function (param, paramName, val) {
        var dataType = this.parameterSrv.getDataType(param);
        if (dataType === parameter_service_1.ParameterDataType.String) {
            return this.stringMin(param, paramName, val);
        }
        else if (dataType === parameter_service_1.ParameterDataType.Array) {
            return this.arrayMin(param, paramName, val);
        }
        else if (dataType === parameter_service_1.ParameterDataType.Number) {
            return this.numberMin(param, paramName, val);
        }
        else {
            return new Error('Parameter' + paramName + ' is not the correct ' +
                'data type for the min() function, only String, Number and Array are ' +
                'supported');
        }
    };
    EqualService.prototype.stringMin = function (param, paramName, val) {
        if (param.length < val)
            return new Error('Parameter' + paramName + ' has a length less ' +
                'than the minimum value required');
        return true;
    };
    EqualService.prototype.arrayMin = function (param, paramName, val) {
        if (param.length < val)
            return new Error('Parameter' + paramName + ' has an array length less ' +
                'than the minimum value required');
        return true;
    };
    EqualService.prototype.numberMin = function (param, paramName, val) {
        if (param < val)
            return new Error('Parameter' + paramName + ' has a value less ' +
                'than the minimum value required');
        return true;
    };
    EqualService.prototype.paramEqualsMax = function (param, paramName, val) {
        var dataType = this.parameterSrv.getDataType(param);
        if (dataType === parameter_service_1.ParameterDataType.String) {
            return this.stringMax(param, paramName, val);
        }
        else if (dataType === parameter_service_1.ParameterDataType.Array) {
            return this.arrayMax(param, paramName, val);
        }
        else if (dataType === parameter_service_1.ParameterDataType.Number) {
            return this.numberMax(param, paramName, val);
        }
        else {
            return new Error('Parameter' + paramName + ' is not the correct ' +
                'data type for the max() function, only String, Number and Array are ' +
                'supported');
        }
    };
    EqualService.prototype.stringMax = function (param, paramName, val) {
        if (param.length > val)
            return new Error('Parameter' + paramName + ' has a length greater ' +
                'than the maximum value allowed');
        return true;
    };
    EqualService.prototype.arrayMax = function (param, paramName, val) {
        if (param.length > val)
            return new Error('Parameter' + paramName + ' has an array length ' +
                'greater than the maximum value allowed');
        return true;
    };
    EqualService.prototype.numberMax = function (param, paramName, val) {
        if (param > val)
            return new Error('Parameter' + paramName + ' has a value greater ' +
                'than the maximum value allowed');
        return true;
    };
    EqualService.prototype.paramLengthEquals = function (param, paramName, val) {
        var dataType = this.parameterSrv.getDataType(param);
        if (dataType === parameter_service_1.ParameterDataType.String
            || dataType === parameter_service_1.ParameterDataType.Array) {
            if (param.length === val)
                return true;
            return new Error('Parameter' + paramName + ' length does not equal '
                + val);
        }
        return new Error('Parameter' + paramName + ' is not the correct ' +
            'data type for the lengthEquals() function, only String and Array are ' +
            'supported');
    };
    __decorate([
        DI.Inject(parameter_service_1.ParameterService, 'ParameterService'),
        __metadata("design:type", parameter_service_1.ParameterService)
    ], EqualService.prototype, "parameterSrv", void 0);
    return EqualService;
}());
exports.EqualService = EqualService;
//# sourceMappingURL=equal.service.js.map