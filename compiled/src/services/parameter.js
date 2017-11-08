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
var Parameter = (function () {
    function Parameter() {
    }
    Parameter.prototype.getDataType = function (param) {
        if (typeof param === 'undefined') {
            return ParameterDataType.Undefined;
        }
        else if (param === null) {
            return ParameterDataType.Null;
        }
        else if (typeof param === "number") {
            return ParameterDataType.Number;
        }
        else if (typeof param === "string") {
            return ParameterDataType.String;
        }
        else if (typeof param === "boolean") {
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
    Parameter.prototype.isDefined = function (param) {
        return (typeof param !== 'undefined');
    };
    Parameter.prototype.isSet = function (param) {
        return (typeof param !== 'undefined' && param !== null);
    };
    Parameter.prototype.isJson = function (param) {
        if (!this.isSet(param)) {
            return false;
        }
        return (param instanceof Object && param.constructor === {}.constructor);
    };
    Parameter.prototype.isArray = function (param) {
        if (!this.isSet(param)) {
            return false;
        }
        return (Array.isArray(param));
    };
    Parameter.prototype.isString = function (param) {
        if (!this.isSet(param)) {
            return false;
        }
        return (typeof param === 'string' || param instanceof String);
    };
    Parameter.prototype.isNumber = function (param) {
        if (!this.isSet(param)) {
            return false;
        }
        return (!(isNaN(parseFloat(param)) || !isFinite(param)));
    };
    Parameter.prototype.isInt = function (param) {
        if (!this.isSet(param)) {
            return false;
        }
        var x = parseFloat(param);
        return (!(isNaN(param) || !((x | 0) === x)));
    };
    Parameter.prototype.isEmail = function (param) {
        if (!this.isSet(param)) {
            return false;
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (re.test(param));
    };
    return Parameter;
}());
exports.Parameter = Parameter;
//# sourceMappingURL=parameter.js.map