"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_manager_1 = require("./dependency-manager");
var parameter_service_1 = require("./parameter.service");
var EqualService = (function () {
    function EqualService() {
        this.parameterSrv = dependency_manager_1.dependencyManager.get(parameter_service_1.ParameterService);
    }
    EqualService.prototype.paramEqualsValue = function (param, val) {
        if (!this.parameterSrv.isSet(param) || this.parameterSrv.isString(param)
            || this.parameterSrv.isNumber(param)) {
        }
        else if (this.parameterSrv.isArray(param)) {
        }
        else if (this.parameterSrv.isJson(param)) {
        }
        else {
            return new Error('Equal validation can only be used on data types: ' +
                'undefined, null, string, number, array or json. The parameter being ' +
                'evaluated is of type: ' + this.parameterSrv.getDataTypeAsString(param));
        }
    };
    return EqualService;
}());
exports.EqualService = EqualService;
//# sourceMappingURL=equal.service.js.map