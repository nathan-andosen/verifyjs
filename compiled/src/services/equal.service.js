"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_manager_1 = require("./dependency-manager");
var parameter_service_1 = require("./parameter.service");
var EqualService = (function () {
    function EqualService() {
        this.parameterSrv = dependency_manager_1.dependencyManager.get(parameter_service_1.ParameterService);
    }
    EqualService.prototype.paramEqualsValue = function (param, paramName, val) {
        if (!this.parameterSrv.isSet(param) || this.parameterSrv.isString(param)
            || this.parameterSrv.isNumber(param)) {
            return this.binaryEquals(param, paramName, val);
        }
        else if (this.parameterSrv.isArray(param)) {
            return this.arrayEquals(param, paramName, val);
        }
        else if (this.parameterSrv.isJson(param)) {
        }
        else {
            return new Error('Equal validation can only be used on data types: ' +
                'undefined, null, string, number, array or json. The parameter being ' +
                'evaluated is of type: ' + this.parameterSrv.getDataTypeAsString(param));
        }
    };
    EqualService.prototype.binaryEquals = function (param, paramName, val) {
        if (param === val) {
            return true;
        }
        return new Error('Parameter ' + paramName + ' does not equal ' + val);
    };
    EqualService.prototype.arrayEquals = function (param, paramName, val) {
        if (this.arraysAreEqual(param, val)) {
            return true;
        }
        return new Error('Parameter ' + paramName + ' does not equal the ' +
            'supplied array object');
    };
    EqualService.prototype.arraysAreEqual = function (a, b) {
        if (a === b) {
            return true;
        }
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0; i < a.length; ++i) {
            var aDataType = this.parameterSrv.getDataType(a[i]);
            var bDataType = this.parameterSrv.getDataType(b[i]);
            if (aDataType !== bDataType) {
                return false;
            }
            switch (aDataType) {
                case parameter_service_1.ParameterDataType.String:
                case parameter_service_1.ParameterDataType.Number:
                case parameter_service_1.ParameterDataType.Boolean:
                case parameter_service_1.ParameterDataType.Null:
                case parameter_service_1.ParameterDataType.Undefined:
                case parameter_service_1.ParameterDataType.Unknown:
                    if (a[i] !== b[i]) {
                        return false;
                    }
                    break;
                case parameter_service_1.ParameterDataType.Array:
                    if (!this.arraysAreEqual(a[i], b[i])) {
                        return false;
                    }
                    break;
                case parameter_service_1.ParameterDataType.Json:
                    if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) {
                        return false;
                    }
                    break;
            }
        }
        return true;
    };
    return EqualService;
}());
exports.EqualService = EqualService;
//# sourceMappingURL=equal.service.js.map