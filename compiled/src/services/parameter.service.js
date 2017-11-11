"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParameterDataType;
(function (ParameterDataType) {
    ParameterDataType[ParameterDataType["Null"] = 0] = "Null";
    ParameterDataType[ParameterDataType["Undefined"] = 1] = "Undefined";
    ParameterDataType[ParameterDataType["String"] = 2] = "String";
    ParameterDataType[ParameterDataType["Number"] = 3] = "Number";
    ParameterDataType[ParameterDataType["Boolean"] = 4] = "Boolean";
    ParameterDataType[ParameterDataType["Array"] = 5] = "Array";
    ParameterDataType[ParameterDataType["Json"] = 6] = "Json";
    ParameterDataType[ParameterDataType["Unknown"] = 7] = "Unknown";
})(ParameterDataType = exports.ParameterDataType || (exports.ParameterDataType = {}));
;
var ParameterService = (function () {
    function ParameterService() {
    }
    ParameterService.prototype.getDataType = function (param) {
        if (!this.isDefined(param)) {
            return ParameterDataType.Undefined;
        }
        else if (param === null) {
            return ParameterDataType.Null;
        }
        else if (this.isNumber(param)) {
            return ParameterDataType.Number;
        }
        else if (this.isString(param)) {
            return ParameterDataType.String;
        }
        else if (this.isBoolean(param)) {
            return ParameterDataType.Boolean;
        }
        else if (typeof param === "object") {
            if (this.isArray(param)) {
                return ParameterDataType.Array;
            }
            else if (this.isJson(param)) {
                return ParameterDataType.Json;
            }
        }
        return ParameterDataType.Unknown;
    };
    ParameterService.prototype.getDataTypeAsString = function (param) {
        switch (this.getDataType(param)) {
            case ParameterDataType.Undefined:
                return 'undefined';
            case ParameterDataType.Null:
                return 'null';
            case ParameterDataType.Number:
                return 'number';
            case ParameterDataType.String:
                return 'string';
            case ParameterDataType.Boolean:
                return 'boolean';
            case ParameterDataType.Array:
                return 'array';
            case ParameterDataType.Json:
                return 'json';
            case ParameterDataType.Unknown:
                return 'unknown';
        }
    };
    ParameterService.prototype.isDefined = function (param) {
        return (typeof param !== 'undefined');
    };
    ParameterService.prototype.isSet = function (param) {
        return (typeof param !== 'undefined' && param !== null);
    };
    ParameterService.prototype.isJson = function (param) {
        if (!this.isSet(param)) {
            return false;
        }
        return (param instanceof Object && param.constructor === {}.constructor);
    };
    ParameterService.prototype.isArray = function (param) {
        if (!this.isSet(param)) {
            return false;
        }
        return (Array.isArray(param));
    };
    ParameterService.prototype.isString = function (param) {
        if (!this.isSet(param)) {
            return false;
        }
        return (typeof param === 'string' || param instanceof String);
    };
    ParameterService.prototype.isNumber = function (param, allowNumbersAsStrings) {
        if (allowNumbersAsStrings === void 0) { allowNumbersAsStrings = false; }
        if (!this.isSet(param) || this.isArray(param)) {
            return false;
        }
        if (this.isString(param) && !allowNumbersAsStrings) {
            return false;
        }
        return (!(isNaN(parseFloat(param)) || !isFinite(param)));
    };
    ParameterService.prototype.isInt = function (param, allowIntAsString) {
        if (allowIntAsString === void 0) { allowIntAsString = false; }
        if (!this.isSet(param)) {
            return false;
        }
        if (this.isString(param) && !allowIntAsString) {
            return false;
        }
        var x = parseFloat(param);
        return (!(isNaN(param) || !((x | 0) === x)));
    };
    ParameterService.prototype.isEmail = function (param) {
        if (!this.isSet(param)) {
            return false;
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (re.test(param));
    };
    ParameterService.prototype.isBoolean = function (param) {
        if (!this.isSet(param)) {
            return false;
        }
        return (typeof param === "boolean");
    };
    ParameterService.prototype.isEmpty = function (param) {
        if (!this.isSet(param)) {
            return false;
        }
        var dataType = this.getDataType(param);
        if (dataType === ParameterDataType.String && param.length === 0) {
            return true;
        }
        else if (dataType === ParameterDataType.Json) {
            return (Object.keys(param).length === 0 &&
                JSON.stringify(param) === JSON.stringify({}));
        }
        else if (dataType === ParameterDataType.Array && param.length === 0) {
            return true;
        }
        return false;
    };
    return ParameterService;
}());
exports.ParameterService = ParameterService;
//# sourceMappingURL=parameter.service.js.map