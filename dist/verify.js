/*!
 * verifyjs v0.0.2
 * (c) 2017 Nathan Anderson
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DependencyManager = (function () {
    function DependencyManager() {
        this.services = {};
    }
    DependencyManager.prototype.addByName = function (name, service) {
        this.services[name] = service;
        this.services[name.toLowerCase()] = service;
    };
    DependencyManager.prototype.getByName = function (name) {
        return this.services[name];
    };
    DependencyManager.prototype.add = function () {
        var _this = this;
        var serviceClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            serviceClasses[_i] = arguments[_i];
        }
        serviceClasses.forEach(function (serviceClass) {
            var service = serviceClass.service;
            if (service instanceof Function) {
                service = new serviceClass.service();
            }
            _this.addByName(serviceClass.name, service);
        });
    };
    DependencyManager.prototype.clear = function () {
        this.services = {};
    };
    return DependencyManager;
}());
exports.DependencyManager = DependencyManager;
var dependencyManager = new DependencyManager();
exports.dependencyManager = dependencyManager;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var setup_dependencies_1 = __webpack_require__(3);
setup_dependencies_1.setupDependencies();
__export(__webpack_require__(5));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dependency_manager_1 = __webpack_require__(0);
var parameter_service_1 = __webpack_require__(1);
var equal_service_1 = __webpack_require__(4);
exports.setupDependencies = function () {
    dependency_manager_1.dependencyManager.clear();
    dependency_manager_1.dependencyManager.add({ name: 'ParameterService', service: parameter_service_1.ParameterService }, { name: 'EqualService', service: equal_service_1.EqualService });
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dependency_manager_1 = __webpack_require__(0);
var parameter_service_1 = __webpack_require__(1);
var EqualService = (function () {
    function EqualService() {
        this.parameterSrv = null;
        this.parameterSrv = dependency_manager_1.dependencyManager.getByName('ParameterService');
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
        if (param === val) {
            return true;
        }
        return new Error('Parameter' + paramName + ' does not equal ' + val);
    };
    EqualService.prototype.arrayEquals = function (param, paramName, val) {
        if (this.parameterSrv.isArray(val) && this.arraysAreEqual(param, val)) {
            return true;
        }
        return new Error('Parameter' + paramName + ' does not equal the ' +
            'supplied array object');
    };
    EqualService.prototype.arraysAreEqual = function (a, b) {
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
    EqualService.prototype.jsonEquals = function (param, paramName, val) {
        if (JSON.stringify(param) === JSON.stringify(val)) {
            return true;
        }
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
        if (param.length < val) {
            return new Error('Parameter' + paramName + ' has a length less ' +
                'than the minimum value required');
        }
        return true;
    };
    EqualService.prototype.arrayMin = function (param, paramName, val) {
        if (param.length < val) {
            return new Error('Parameter' + paramName + ' has an array length less ' +
                'than the minimum value required');
        }
        return true;
    };
    EqualService.prototype.numberMin = function (param, paramName, val) {
        if (param < val) {
            return new Error('Parameter' + paramName + ' has a value less ' +
                'than the minimum value required');
        }
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
        if (param.length > val) {
            return new Error('Parameter' + paramName + ' has a length greater ' +
                'than the maximum value allowed');
        }
        return true;
    };
    EqualService.prototype.arrayMax = function (param, paramName, val) {
        if (param.length > val) {
            return new Error('Parameter' + paramName + ' has an array length ' +
                'greater than the maximum value allowed');
        }
        return true;
    };
    EqualService.prototype.numberMax = function (param, paramName, val) {
        if (param > val) {
            return new Error('Parameter' + paramName + ' has a value greater ' +
                'than the maximum value allowed');
        }
        return true;
    };
    EqualService.prototype.paramLengthEquals = function (param, paramName, val) {
        var dataType = this.parameterSrv.getDataType(param);
        if (dataType === parameter_service_1.ParameterDataType.String
            || dataType === parameter_service_1.ParameterDataType.Array) {
            if (param.length === val) {
                return true;
            }
            else {
                return new Error('Parameter' + paramName + ' length does not equal '
                    + val);
            }
        }
        return new Error('Parameter' + paramName + ' is not the correct ' +
            'data type for the lengthEquals() function, only String and Array are ' +
            'supported');
    };
    return EqualService;
}());
exports.EqualService = EqualService;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var verify_param_1 = __webpack_require__(6);
exports.verify = function (parameter, parameterName) {
    var verifyParam = new verify_param_1.VerifyParam(parameter, parameterName);
    return verifyParam;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dependency_manager_1 = __webpack_require__(0);
var VerifyParam = (function () {
    function VerifyParam(parameter, parameterName) {
        this.paramSet = null;
        this.validationErrorMsg = null;
        this.parameterSrv = dependency_manager_1.dependencyManager.getByName('ParameterService');
        this.equalSrv = dependency_manager_1.dependencyManager.getByName('EqualService');
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
    VerifyParam.prototype.isNotSet = function () {
        return (!this.isSet());
    };
    VerifyParam.prototype.isSetOrThrowError = function (err) {
        if (this.isSet()) {
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
    VerifyParam.prototype.isSetOrUseDefault = function (defaultVal) {
        if (!this.paramIsSet()) {
            return defaultVal;
        }
        return this.param;
    };
    VerifyParam.prototype.isTruthy = function () {
        var val = (this.parameterSrv.isString(this.param))
            ? this.param.toLowerCase() : this.param;
        if (val && (val === '1' || val >= 1 || val === true || val === 'true'
            || val === 'yes')) {
            return true;
        }
        return false;
    };
    VerifyParam.prototype.isFalsey = function () {
        if (this.isNotSet()) {
            return true;
        }
        var val = (this.parameterSrv.isString(this.param))
            ? this.param.toLowerCase() : this.param;
        if (val === '0' || val === 'false' || val === 'no' || val === false
            || val < 1 || val === 'nil') {
            return true;
        }
        return false;
    };
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
    return VerifyParam;
}());
exports.VerifyParam = VerifyParam;


/***/ })
/******/ ]);
});