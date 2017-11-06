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
    return Parameter;
}());
exports.Parameter = Parameter;
//# sourceMappingURL=data-type.js.map