/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
        if (!this.isSet(param))
            return false;
        return (param instanceof Object && param.constructor === {}.constructor);
    };
    ParameterService.prototype.isArray = function (param) {
        if (!this.isSet(param))
            return false;
        return (Array.isArray(param));
    };
    ParameterService.prototype.isString = function (param) {
        if (!this.isSet(param))
            return false;
        return (typeof param === 'string' || param instanceof String);
    };
    ParameterService.prototype.isNumber = function (param, allowNumbersAsStrings) {
        if (allowNumbersAsStrings === void 0) { allowNumbersAsStrings = false; }
        if (!this.isSet(param) || this.isArray(param))
            return false;
        if (this.isString(param) && !allowNumbersAsStrings)
            return false;
        return (!(isNaN(parseFloat(param)) || !isFinite(param)));
    };
    ParameterService.prototype.isInt = function (param, allowIntAsString) {
        if (allowIntAsString === void 0) { allowIntAsString = false; }
        if (!this.isSet(param))
            return false;
        if (this.isString(param) && !allowIntAsString)
            return false;
        var x = parseFloat(param);
        return (!(isNaN(param) || !((x | 0) === x)));
    };
    ParameterService.prototype.isEmail = function (param) {
        if (!this.isSet(param))
            return false;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (re.test(param));
    };
    ParameterService.prototype.isBoolean = function (param) {
        if (!this.isSet(param))
            return false;
        return (typeof param === "boolean");
    };
    ParameterService.prototype.isEmpty = function (param) {
        if (!this.isSet(param))
            return false;
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
var parameter_service_1 = __webpack_require__(0);
var DI = __webpack_require__(2);
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dependencyContainer = {};
function Inject(service, serviceName) {
    return function (target, propName) {
        Object.defineProperty(target, propName, {
            get: function () {
                var name = (serviceName) ? serviceName : service.name;
                if (!dependencyContainer[name]) {
                    dependencyContainer[name] = new service();
                }
                return dependencyContainer[name];
            }
        });
    };
}
exports.Inject = Inject;
function override(serviceName, dependencyInstance) {
    dependencyContainer[serviceName] = dependencyInstance;
}
exports.override = override;
function getService(service, serviceName) {
    var name = (serviceName) ? serviceName : service.name;
    if (!dependencyContainer[name] && service) {
        dependencyContainer[name] = new service();
    }
    return dependencyContainer[name];
}
exports.getService = getService;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
var parameter_service_1 = __webpack_require__(0);
var equal_service_1 = __webpack_require__(1);
var DI = __webpack_require__(2);
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


// Our webpack.unit.tests.config.js file uses this to require all unit test files
// so they can be tested in a browser for debugging

// require all test files
var testsContext = __webpack_require__(5);
testsContext.keys().forEach(testsContext);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./services/dependency-manager.spec": 6,
	"./services/equal.service.spec": 7,
	"./services/parameter.service.spec": 8,
	"./verify-param.spec": 9,
	"./verify.spec": 10
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 5;

/***/ }),
/* 6 */
/***/ (function(module, exports) {



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var equal_service_1 = __webpack_require__(1);
var equalSrv = null;
describe('EqualService', function () {
    beforeAll(function () {
        equalSrv = new equal_service_1.EqualService();
    });
    describe('paramEqualsValue()', function () {
        it('should return true for undefined comparsion', function () {
            var param = undefined, val = undefined;
            expect(equalSrv.paramEqualsValue(param, '', val)).toEqual(true);
        });
        it('should return true for null comparsion', function () {
            var param = null, val = null;
            expect(equalSrv.paramEqualsValue(param, '', val)).toEqual(true);
        });
        it('should return true for boolean comparsion', function () {
            var param = false, val = false;
            expect(equalSrv.paramEqualsValue(param, '', val)).toEqual(true);
        });
        it('should return true for string comparsion', function () {
            var param = "test", val = "test";
            expect(equalSrv.paramEqualsValue(param, '', val)).toEqual(true);
        });
        it('should return true for number comparsion', function () {
            var param = 10, val = 10;
            expect(equalSrv.paramEqualsValue(param, '', val)).toEqual(true);
        });
        it('should return Error for string comparsion', function () {
            var param = "test1", val = "test2";
            expect(equalSrv.paramEqualsValue(param, '', val) instanceof Error)
                .toEqual(true);
        });
        it('should return Error for number comparsion', function () {
            var param = 1.1, val = 1.2;
            expect(equalSrv.paramEqualsValue(param, '', val) instanceof Error)
                .toEqual(true);
        });
        it('should return Error for boolean comparsion', function () {
            var param = true, val = false;
            expect(equalSrv.paramEqualsValue(param, '', val) instanceof Error)
                .toEqual(true);
        });
        it('should return true for array comparsion', function () {
            var param1 = [1, 2], val1 = [1, 2];
            expect(equalSrv.paramEqualsValue(param1, '', val1)).toEqual(true);
            var param2 = ["one", "two"], val2 = ["one", "two"];
            expect(equalSrv.paramEqualsValue(param2, '', val2)).toEqual(true);
            var param3 = [{ a: 1, b: 2 }, { c: { d: 3 } }], val3 = [{ a: 1, b: 2 }, { c: { d: 3 } }];
            expect(equalSrv.paramEqualsValue(param3, '', val3)).toEqual(true);
            var param4 = [null, 0, "hi"], val4 = [null, 0, "hi"];
            expect(equalSrv.paramEqualsValue(param4, '', val4)).toEqual(true);
            var param5 = [false, 1.2], val5 = [false, 1.2];
            expect(equalSrv.paramEqualsValue(param5, '', val5)).toEqual(true);
            var param6 = [false, [1, 2]], val6 = [false, [1, 2]];
            expect(equalSrv.paramEqualsValue(param6, '', val6)).toEqual(true);
            var param7 = [[1, 2], "", [1, [0, 1]]], val7 = [[1, 2], "", [1, [0, 1]]];
            expect(equalSrv.paramEqualsValue(param7, '', val7)).toEqual(true);
            var param8 = [], val8 = [];
            expect(equalSrv.paramEqualsValue(param8, '', val8)).toEqual(true);
            var param9 = new Array(), val9 = new Array();
            expect(equalSrv.paramEqualsValue(param9, '', val9)).toEqual(true);
        });
        it('should return Error for array comparsion', function () {
            var param1 = [1, 2, 3], val1 = [1, 2];
            expect(equalSrv.paramEqualsValue(param1, '', val1) instanceof Error)
                .toEqual(true);
            var param2 = ["one", 2], val2 = ["one", 3];
            expect(equalSrv.paramEqualsValue(param2, '', val2) instanceof Error)
                .toEqual(true);
            var param3 = [[1, 2], [2]], val3 = [[1, 2], [2, 3]];
            expect(equalSrv.paramEqualsValue(param3, '', val3) instanceof Error)
                .toEqual(true);
            var param4 = [null, { a: 1 }], val4 = [null, { a: 2 }];
            expect(equalSrv.paramEqualsValue(param4, '', val4) instanceof Error)
                .toEqual(true);
            var param5 = [null, { a: 1 }], val5 = [false, { a: 2 }];
            expect(equalSrv.paramEqualsValue(param5, '', val5) instanceof Error)
                .toEqual(true);
            var param6 = [null, { a: 1 }], val6 = undefined;
            expect(equalSrv.paramEqualsValue(param6, '', val6) instanceof Error)
                .toEqual(true);
        });
        it('should return true for json comparison', function () {
            var param = {}, val = {};
            expect(equalSrv.paramEqualsValue(param, '', val)).toEqual(true);
            var param1 = { a: { b: 1 } }, val1 = { a: { b: 1 } };
            expect(equalSrv.paramEqualsValue(param1, '', val1)).toEqual(true);
            var param2 = { a: [{}, 1] }, val2 = { a: [{}, 1] };
            expect(equalSrv.paramEqualsValue(param2, '', val2)).toEqual(true);
        });
        it('should return Error for json comparison', function () {
            var param = {}, val = { a: 1 };
            expect(equalSrv.paramEqualsValue(param, '', val) instanceof Error)
                .toEqual(true);
            var param1 = { a: { b: 2 } }, val1 = { a: { b: 1 } };
            expect(equalSrv.paramEqualsValue(param1, '', val1) instanceof Error)
                .toEqual(true);
            var param2 = { a: [{}, 1, 3] }, val2 = { a: [{}, 1] };
            expect(equalSrv.paramEqualsValue(param2, '', val2) instanceof Error)
                .toEqual(true);
            var param3 = {}, val3 = undefined;
            expect(equalSrv.paramEqualsValue(param3, '', val3) instanceof Error)
                .toEqual(true);
            var param4 = {}, val4 = null;
            expect(equalSrv.paramEqualsValue(param4, '', val4) instanceof Error)
                .toEqual(true);
        });
        it('should return error as not supported type', function () {
            var param = new function () { }, val = { a: 1 };
            expect(equalSrv.paramEqualsValue(param, '', val) instanceof Error)
                .toEqual(true);
        });
    });
    describe('paramEqualsMin()', function () {
        it('should return true', function () {
            var param = 10, val = 5;
            expect(equalSrv.paramEqualsMin(param, '', val)).toEqual(true);
            var param1 = 'password', val1 = 5;
            expect(equalSrv.paramEqualsMin(param1, '', val1)).toEqual(true);
            var param2 = [1, 2, 3, 4, 5, 6], val2 = 5;
            expect(equalSrv.paramEqualsMin(param2, '', val2)).toEqual(true);
            var param3 = 5, val3 = 5;
            expect(equalSrv.paramEqualsMin(param3, '', val3)).toEqual(true);
        });
        it('should return error', function () {
            var param = 2, val = 5;
            expect(equalSrv.paramEqualsMin(param, '', val) instanceof Error)
                .toEqual(true);
            var param1 = 'password', val1 = 15;
            expect(equalSrv.paramEqualsMin(param1, '', val1) instanceof Error)
                .toEqual(true);
            var param2 = [1, 2], val2 = 5;
            expect(equalSrv.paramEqualsMin(param2, '', val2) instanceof Error)
                .toEqual(true);
            var param3 = null, val3 = 5;
            expect(equalSrv.paramEqualsMin(param3, '', val3) instanceof Error)
                .toEqual(true);
        });
    });
    describe('paramEqualsMax()', function () {
        it('should return true', function () {
            var param = 10, val = 50;
            expect(equalSrv.paramEqualsMax(param, '', val)).toEqual(true);
            var param1 = 'password', val1 = 50;
            expect(equalSrv.paramEqualsMax(param1, '', val1)).toEqual(true);
            var param2 = [1, 2, 3, 4, 5, 6], val2 = 50;
            expect(equalSrv.paramEqualsMax(param2, '', val2)).toEqual(true);
            var param3 = 5, val3 = 5;
            expect(equalSrv.paramEqualsMax(param3, '', val3)).toEqual(true);
        });
        it('should return error', function () {
            var param = 20, val = 5;
            expect(equalSrv.paramEqualsMax(param, '', val) instanceof Error)
                .toEqual(true);
            var param1 = 'password', val1 = 5;
            expect(equalSrv.paramEqualsMax(param1, '', val1) instanceof Error)
                .toEqual(true);
            var param2 = [1, 2, 3, 4, 5, 6], val2 = 5;
            expect(equalSrv.paramEqualsMax(param2, '', val2) instanceof Error)
                .toEqual(true);
            var param3 = null, val3 = 5;
            expect(equalSrv.paramEqualsMax(param3, '', val3) instanceof Error)
                .toEqual(true);
        });
    });
    describe('paramLengthEquals()', function () {
        it('should return true', function () {
            var param = "hi", val = 2;
            expect(equalSrv.paramLengthEquals(param, '', val)).toEqual(true);
            var param1 = [1, 2, 3], val1 = 3;
            expect(equalSrv.paramLengthEquals(param1, '', val1)).toEqual(true);
        });
        it('should return error', function () {
            var param = [1, 2], val = 5;
            expect(equalSrv.paramLengthEquals(param, '', val) instanceof Error)
                .toEqual(true);
            var param1 = null, val1 = 5;
            expect(equalSrv.paramLengthEquals(param1, '', val1) instanceof Error)
                .toEqual(true);
        });
    });
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parameter_service_1 = __webpack_require__(0);
describe('Parameter', function () {
    describe('getDataType()', function () {
        it('should return the correct data type', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.getDataType(undefined))
                .toEqual(parameter_service_1.ParameterDataType.Undefined);
            expect(parameterSrv.getDataType(null)).toEqual(parameter_service_1.ParameterDataType.Null);
            expect(parameterSrv.getDataType(10)).toEqual(parameter_service_1.ParameterDataType.Number);
            expect(parameterSrv.getDataType(1.6)).toEqual(parameter_service_1.ParameterDataType.Number);
            expect(parameterSrv.getDataType("")).toEqual(parameter_service_1.ParameterDataType.String);
            expect(parameterSrv.getDataType("hi")).toEqual(parameter_service_1.ParameterDataType.String);
            expect(parameterSrv.getDataType('10')).toEqual(parameter_service_1.ParameterDataType.String);
            expect(parameterSrv.getDataType(true)).toEqual(parameter_service_1.ParameterDataType.Boolean);
            expect(parameterSrv.getDataType(false)).toEqual(parameter_service_1.ParameterDataType.Boolean);
            expect(parameterSrv.getDataType([])).toEqual(parameter_service_1.ParameterDataType.Array);
            expect(parameterSrv.getDataType([1, 2])).toEqual(parameter_service_1.ParameterDataType.Array);
            expect(parameterSrv.getDataType([null])).toEqual(parameter_service_1.ParameterDataType.Array);
            expect(parameterSrv.getDataType(new Array()))
                .toEqual(parameter_service_1.ParameterDataType.Array);
            var obj = { test: 123 };
            expect(parameterSrv.getDataType(obj)).toEqual(parameter_service_1.ParameterDataType.Json);
            obj = JSON.parse(JSON.stringify(obj));
            expect(parameterSrv.getDataType(obj)).toEqual(parameter_service_1.ParameterDataType.Json);
            var unknown = new function () { };
            expect(parameterSrv.getDataType(unknown)).toEqual(parameter_service_1.ParameterDataType.Unknown);
        });
    });
    describe('getDataTypeAsString()', function () {
        it('should return correct data type as a string', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.getDataTypeAsString(undefined)).toEqual('undefined');
            expect(parameterSrv.getDataTypeAsString(null)).toEqual('null');
            expect(parameterSrv.getDataTypeAsString(10)).toEqual('number');
            expect(parameterSrv.getDataTypeAsString("hi")).toEqual('string');
            expect(parameterSrv.getDataTypeAsString(true)).toEqual('boolean');
            expect(parameterSrv.getDataTypeAsString([1])).toEqual('array');
            expect(parameterSrv.getDataTypeAsString({ "test": 1 })).toEqual('json');
            expect(parameterSrv.getDataTypeAsString(new function () { }))
                .toEqual('unknown');
        });
    });
    describe('isDefined()', function () {
        it('should return true', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isDefined(null)).toEqual(true);
            expect(parameterSrv.isDefined([null])).toEqual(true);
            expect(parameterSrv.isDefined(new Array())).toEqual(true);
        });
        it('should return false', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isDefined(undefined)).toEqual(false);
        });
    });
    describe('isSet()', function () {
        it('should return true', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isSet(false)).toEqual(true);
            expect(parameterSrv.isSet(0)).toEqual(true);
            expect(parameterSrv.isSet("")).toEqual(true);
            expect(parameterSrv.isSet([])).toEqual(true);
            expect(parameterSrv.isSet({})).toEqual(true);
            expect(parameterSrv.isSet(true)).toEqual(true);
        });
        it('should return false', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isSet(undefined)).toEqual(false);
            expect(parameterSrv.isSet(null)).toEqual(false);
        });
    });
    describe('isJson()', function () {
        it('should return true', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isJson({})).toEqual(true);
            expect(parameterSrv.isJson({ "abc": true })).toEqual(true);
        });
        it('should return false', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isJson("{}")).toEqual(false);
            expect(parameterSrv.isJson(null)).toEqual(false);
            expect(parameterSrv.isJson(new function () { })).toEqual(false);
            expect(parameterSrv.isJson(10)).toEqual(false);
            expect(parameterSrv.isJson([])).toEqual(false);
        });
    });
    describe('isArray()', function () {
        it('should return true', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isArray([])).toEqual(true);
            expect(parameterSrv.isArray([null])).toEqual(true);
            expect(parameterSrv.isArray(new Array())).toEqual(true);
        });
        it('should return false', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isArray({})).toEqual(false);
            expect(parameterSrv.isArray(null)).toEqual(false);
            expect(parameterSrv.isArray("[]")).toEqual(false);
        });
    });
    describe('isString()', function () {
        it('should return true', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isString('')).toEqual(true);
            expect(parameterSrv.isString("")).toEqual(true);
            expect(parameterSrv.isString(new String())).toEqual(true);
            expect(parameterSrv.isString("false")).toEqual(true);
        });
        it('should return false', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isString({})).toEqual(false);
            expect(parameterSrv.isString(null)).toEqual(false);
            expect(parameterSrv.isString([""])).toEqual(false);
        });
    });
    describe('isNumber()', function () {
        it('should return true', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isNumber(0)).toEqual(true);
            expect(parameterSrv.isNumber(-1)).toEqual(true);
            expect(parameterSrv.isNumber(-1.5)).toEqual(true);
            expect(parameterSrv.isNumber(0.42)).toEqual(true);
            expect(parameterSrv.isNumber(.42)).toEqual(true);
            expect(parameterSrv.isNumber(8e5)).toEqual(true);
            expect(parameterSrv.isNumber(5)).toEqual(true);
            expect(parameterSrv.isNumber('10', true)).toEqual(true);
            expect(parameterSrv.isNumber(' 10 ', true)).toEqual(true);
            expect(parameterSrv.isNumber('.42', true)).toEqual(true);
        });
        it('should return false', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isNumber(undefined)).toEqual(false);
            expect(parameterSrv.isNumber(null)).toEqual(false);
            expect(parameterSrv.isNumber(true)).toEqual(false);
            expect(parameterSrv.isNumber([1])).toEqual(false);
            expect(parameterSrv.isNumber('0test')).toEqual(false);
            expect(parameterSrv.isNumber('#abc')).toEqual(false);
            expect(parameterSrv.isNumber('1.2.3')).toEqual(false);
            expect(parameterSrv.isNumber('')).toEqual(false);
            expect(parameterSrv.isNumber('ten')).toEqual(false);
        });
    });
    describe('isInt()', function () {
        it('should return true', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isInt(0)).toEqual(true);
            expect(parameterSrv.isInt(-1)).toEqual(true);
            expect(parameterSrv.isInt(8e5)).toEqual(true);
            expect(parameterSrv.isInt(5)).toEqual(true);
            expect(parameterSrv.isInt('10', true)).toEqual(true);
            expect(parameterSrv.isInt(' 10 ', true)).toEqual(true);
            expect(parameterSrv.isInt('8e5', true)).toEqual(true);
        });
        it('should return false', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isInt(undefined)).toEqual(false);
            expect(parameterSrv.isInt(null)).toEqual(false);
            expect(parameterSrv.isInt(true)).toEqual(false);
            expect(parameterSrv.isInt('0test')).toEqual(false);
            expect(parameterSrv.isInt('#abc')).toEqual(false);
            expect(parameterSrv.isInt('1.2.3')).toEqual(false);
            expect(parameterSrv.isInt('')).toEqual(false);
            expect(parameterSrv.isInt('42.1')).toEqual(false);
            expect(parameterSrv.isInt(1.2)).toEqual(false);
        });
    });
    describe('isEmail()', function () {
        it('should return true', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isEmail('test@email.com')).toEqual(true);
            expect(parameterSrv.isEmail('test.test@email.com')).toEqual(true);
            expect(parameterSrv.isEmail('123@email.org')).toEqual(true);
            expect(parameterSrv.isEmail('test@123.org')).toEqual(true);
            expect(parameterSrv.isEmail('test@test-test.org')).toEqual(true);
            expect(parameterSrv.isEmail('!#$%&`*+/=?^`{|}~@test.org')).toEqual(true);
            expect(parameterSrv.isEmail('test@email.com.au')).toEqual(true);
        });
        it('should return false', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isEmail(undefined)).toEqual(false);
            expect(parameterSrv.isEmail(null)).toEqual(false);
            expect(parameterSrv.isEmail(true)).toEqual(false);
            expect(parameterSrv.isEmail('.test@email.com')).toEqual(false);
            expect(parameterSrv.isEmail('test.@email.com')).toEqual(false);
            expect(parameterSrv.isEmail('test..test@email.com')).toEqual(false);
            expect(parameterSrv.isEmail('testemail.com')).toEqual(false);
            expect(parameterSrv.isEmail('test\@test@iana.org')).toEqual(false);
            expect(parameterSrv.isEmail('test@test.org.')).toEqual(false);
            expect(parameterSrv.isEmail('test@email..com')).toEqual(false);
        });
    });
    describe('isBoolean()', function () {
        it('should return true', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isBoolean(true)).toEqual(true);
            expect(parameterSrv.isBoolean(false)).toEqual(true);
        });
        it('should return false', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isBoolean(undefined)).toEqual(false);
            expect(parameterSrv.isBoolean(null)).toEqual(false);
            expect(parameterSrv.isBoolean('true')).toEqual(false);
            expect(parameterSrv.isBoolean(1)).toEqual(false);
        });
    });
    describe('isEmpty()', function () {
        it('should return true', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isEmpty("")).toEqual(true);
            expect(parameterSrv.isEmpty([])).toEqual(true);
            expect(parameterSrv.isEmpty({})).toEqual(true);
        });
        it('should return false', function () {
            var parameterSrv = new parameter_service_1.ParameterService();
            expect(parameterSrv.isEmpty("abc")).toEqual(false);
            expect(parameterSrv.isEmpty([1, 2])).toEqual(false);
            expect(parameterSrv.isEmpty({ a: 1 })).toEqual(false);
            expect(parameterSrv.isEmpty(null)).toEqual(false);
            expect(parameterSrv.isEmpty(undefined)).toEqual(false);
            expect(parameterSrv.isEmpty(false)).toEqual(false);
            expect(parameterSrv.isEmpty(true)).toEqual(false);
            expect(parameterSrv.isEmpty(new function () { })).toEqual(false);
        });
    });
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var verify_param_1 = __webpack_require__(3);
describe('VerifyParam', function () {
    describe('constructor()', function () {
        it('should set variables', function () {
            var verifyParam = new verify_param_1.VerifyParam(33, 'age');
            expect(verifyParam['paramName'].length).toBeGreaterThan(0);
            expect(verifyParam['parameterSrv']).toBeDefined();
            expect(verifyParam['equalSrv']).toBeDefined();
            expect(verifyParam['param']).toBeDefined();
        });
    });
    describe('isDefined()', function () {
        it('should return true as the parameter is not equal to undefined', function () {
            var verifyParam = new verify_param_1.VerifyParam(true);
            expect(verifyParam.isDefined()).toEqual(true);
        });
        it('should return false as the parameter is undefined', function () {
            var verifyParam = new verify_param_1.VerifyParam(undefined);
            expect(verifyParam.isDefined()).toEqual(false);
        });
    });
    describe('isDefinedOrThrowError()', function () {
        it('should return true as the parameter is not equal to undefined', function () {
            var verifyParam = new verify_param_1.VerifyParam(true);
            expect(verifyParam.isDefinedOrThrowError()).toEqual(true);
        });
        it('should throw error as the parameter is undefined', function () {
            var verifyParam = new verify_param_1.VerifyParam(undefined);
            expect(function () { verifyParam.isDefinedOrThrowError(); }).toThrowError();
            var verifyParam2 = new verify_param_1.VerifyParam(undefined);
            try {
                verifyParam2.isDefinedOrThrowError('testing');
            }
            catch (e) {
                expect(e.message).toEqual('testing');
            }
            var verifyParam3 = new verify_param_1.VerifyParam(undefined);
            try {
                verifyParam2.isDefinedOrThrowError(new Error('test'));
            }
            catch (e) {
                expect(e.message).toEqual('test');
            }
        });
    });
    describe('isNotDefined()', function () {
        it('should return true as the parameter is set to undefined', function () {
            var verifyParam = new verify_param_1.VerifyParam(undefined);
            expect(verifyParam.isNotDefined()).toEqual(true);
        });
        it('should return false as the parameter is not equal to undefined', function () {
            var verifyParam = new verify_param_1.VerifyParam(null);
            expect(verifyParam.isNotDefined()).toEqual(false);
        });
    });
    describe('isSet()', function () {
        it('should return true as the parameter is set', function () {
            var verifyParam = new verify_param_1.VerifyParam(true);
            expect(verifyParam.isSet()).toEqual(true);
        });
        it('should return false as the parameter is not set', function () {
            var verifyParam = new verify_param_1.VerifyParam(null);
            expect(verifyParam.isSet()).toEqual(false);
        });
    });
    describe('isNotSet()', function () {
        it('should return true as the parameter is not set', function () {
            var verifyParam = new verify_param_1.VerifyParam(null);
            expect(verifyParam.isNotSet()).toEqual(true);
        });
        it('should return false as the parameter is set', function () {
            var verifyParam = new verify_param_1.VerifyParam(true);
            expect(verifyParam.isNotSet()).toEqual(false);
        });
    });
    describe('isSetOrThrowError()', function () {
        it('should return true as the parameter is set', function () {
            var verifyParam = new verify_param_1.VerifyParam(true);
            expect(verifyParam.isSetOrThrowError()).toEqual(true);
        });
        it('should throw error as the parameter is not set', function () {
            var verifyParam = new verify_param_1.VerifyParam(undefined);
            expect(function () { verifyParam.isSetOrThrowError(); }).toThrowError();
            var verifyParam2 = new verify_param_1.VerifyParam(null);
            try {
                verifyParam2.isSetOrThrowError('testing');
            }
            catch (e) {
                expect(e.message).toEqual('testing');
            }
            var verifyParam3 = new verify_param_1.VerifyParam(undefined);
            try {
                verifyParam2.isSetOrThrowError(new Error('test'));
            }
            catch (e) {
                expect(e.message).toEqual('test');
            }
        });
    });
    describe('isSetOrUseDefault()', function () {
        it('should return the original parameter as its already set', function () {
            var verifyParam = new verify_param_1.VerifyParam(10);
            expect(verifyParam.isSetOrUseDefault(0)).toEqual(10);
        });
        it('should return the default value as the parameter is not set', function () {
            var verifyParam = new verify_param_1.VerifyParam(null);
            expect(verifyParam.isSetOrUseDefault(0)).toEqual(0);
        });
    });
    describe('isTruthy()', function () {
        it('should return true', function () {
            var verifyParam = new verify_param_1.VerifyParam('1');
            expect(verifyParam.isTruthy()).toEqual(true);
            var verifyParam1 = new verify_param_1.VerifyParam(1);
            expect(verifyParam1.isTruthy()).toEqual(true);
            var verifyParam2 = new verify_param_1.VerifyParam(true);
            expect(verifyParam2.isTruthy()).toEqual(true);
            var verifyParam3 = new verify_param_1.VerifyParam('true');
            expect(verifyParam3.isTruthy()).toEqual(true);
            var verifyParam4 = new verify_param_1.VerifyParam('yes');
            expect(verifyParam4.isTruthy()).toEqual(true);
            var verifyParam5 = new verify_param_1.VerifyParam('Yes');
            expect(verifyParam5.isTruthy()).toEqual(true);
            var verifyParam6 = new verify_param_1.VerifyParam(100);
            expect(verifyParam6.isTruthy()).toEqual(true);
        });
        it('should return false', function () {
            var verifyParam = new verify_param_1.VerifyParam('0');
            expect(verifyParam.isTruthy()).toEqual(false);
            var verifyParam1 = new verify_param_1.VerifyParam(null);
            expect(verifyParam1.isTruthy()).toEqual(false);
        });
    });
    describe('isFalsey()', function () {
        it('should return true', function () {
            var verifyParam = new verify_param_1.VerifyParam('0');
            expect(verifyParam.isFalsey()).toEqual(true);
            var verifyParam1 = new verify_param_1.VerifyParam('false');
            expect(verifyParam1.isFalsey()).toEqual(true);
            var verifyParam2 = new verify_param_1.VerifyParam('no');
            expect(verifyParam2.isFalsey()).toEqual(true);
            var verifyParam3 = new verify_param_1.VerifyParam(false);
            expect(verifyParam3.isFalsey()).toEqual(true);
            var verifyParam4 = new verify_param_1.VerifyParam(0);
            expect(verifyParam4.isFalsey()).toEqual(true);
            var verifyParam5 = new verify_param_1.VerifyParam(-1);
            expect(verifyParam5.isFalsey()).toEqual(true);
            var verifyParam6 = new verify_param_1.VerifyParam('nil');
            expect(verifyParam6.isFalsey()).toEqual(true);
            var verifyParam7 = new verify_param_1.VerifyParam(null);
            expect(verifyParam7.isFalsey()).toEqual(true);
            var verifyParam8 = new verify_param_1.VerifyParam(undefined);
            expect(verifyParam8.isFalsey()).toEqual(true);
        });
        it('should return false', function () {
            var verifyParam = new verify_param_1.VerifyParam('1');
            expect(verifyParam.isFalsey()).toEqual(false);
            var verifyParam1 = new verify_param_1.VerifyParam(true);
            expect(verifyParam1.isFalsey()).toEqual(false);
        });
    });
    describe('isValid()', function () {
        it('should return true if error message is not set', function () {
            var verifyParam = new verify_param_1.VerifyParam("test");
            expect(verifyParam.string().isValid()).toEqual(true);
        });
        it('should return false if error message is set', function () {
            var verifyParam = new verify_param_1.VerifyParam(null);
            expect(verifyParam.string().isValid()).toEqual(false);
        });
    });
    describe('isNotValid()', function () {
        it('should return true if error message is set', function () {
            var verifyParam = new verify_param_1.VerifyParam(null);
            expect(verifyParam.string().isNotValid()).toEqual(true);
        });
        it('should return false if error message is not set', function () {
            var verifyParam = new verify_param_1.VerifyParam("test");
            expect(verifyParam.string().isNotValid()).toEqual(false);
        });
    });
    describe('isValidOrThrowError()', function () {
        it('should not throw error as parameter is valid', function () {
            var verifyParam = new verify_param_1.VerifyParam(10);
            expect(verifyParam.number().isValidOrThrowError()).toEqual(true);
        });
        it('should throw error as parameter is not valid', function () {
            var verifyParam = new verify_param_1.VerifyParam(10);
            expect(function () { verifyParam.string().isValidOrThrowError(); })
                .toThrowError();
        });
        it('should throw custom error', function () {
            var verifyParam = new verify_param_1.VerifyParam(10);
            var err = new Error('test');
            try {
                verifyParam.string().isValidOrThrowError(err);
            }
            catch (e) {
                expect(e.message).toEqual('test');
            }
        });
        it('should throw error message from string', function () {
            var verifyParam = new verify_param_1.VerifyParam(10);
            var err = 'testing';
            try {
                verifyParam.string().isValidOrThrowError(err);
            }
            catch (e) {
                expect(e.message).toEqual('testing');
            }
        });
    });
    describe('string()', function () {
        it('should return true as the parameter is a string', function () {
            var verifyParam = new verify_param_1.VerifyParam("test");
            expect(verifyParam.string().isValid()).toEqual(true);
        });
        it('should return false as the parameter is not a string', function () {
            var verifyParam = new verify_param_1.VerifyParam(1.2);
            expect(verifyParam.string().isValid()).toEqual(false);
        });
    });
    describe('array()', function () {
        it('should return true as the parameter is an array', function () {
            var verifyParam = new verify_param_1.VerifyParam([1, 2]);
            expect(verifyParam.array().isValid()).toEqual(true);
        });
        it('should return false as the parameter is not an array', function () {
            var verifyParam = new verify_param_1.VerifyParam(1.2);
            expect(verifyParam.array().isValid()).toEqual(false);
        });
    });
    describe('number()', function () {
        it('should return true as the parameter is a number', function () {
            var verifyParam = new verify_param_1.VerifyParam(10);
            expect(verifyParam.number().isValid()).toEqual(true);
            var verifyParam2 = new verify_param_1.VerifyParam('10');
            expect(verifyParam2.number(true).isValid()).toEqual(true);
        });
        it('should return false as the parameter is not a number', function () {
            var verifyParam = new verify_param_1.VerifyParam("df");
            expect(verifyParam.number().isValid()).toEqual(false);
            var verifyParam2 = new verify_param_1.VerifyParam("8");
            expect(verifyParam2.number().isValid()).toEqual(false);
        });
    });
    describe('int()', function () {
        it('should return true as the parameter is an integer', function () {
            var verifyParam = new verify_param_1.VerifyParam(10);
            expect(verifyParam.int().isValid()).toEqual(true);
            var verifyParam2 = new verify_param_1.VerifyParam('10');
            expect(verifyParam2.int(true).isValid()).toEqual(true);
        });
        it('should return false as the parameter is not an integer', function () {
            var verifyParam = new verify_param_1.VerifyParam("df");
            expect(verifyParam.int().isValid()).toEqual(false);
            var verifyParam2 = new verify_param_1.VerifyParam("3");
            expect(verifyParam2.int().isValid()).toEqual(false);
        });
    });
    describe('json()', function () {
        it('should return true as the parameter is a json object', function () {
            var verifyParam = new verify_param_1.VerifyParam({ a: 2 });
            expect(verifyParam.json().isValid()).toEqual(true);
        });
        it('should return false as the parameter is not a json object', function () {
            var verifyParam = new verify_param_1.VerifyParam([1]);
            expect(verifyParam.json().isValid()).toEqual(false);
        });
    });
    describe('email()', function () {
        it('should return true as the parameter is a valid email', function () {
            var verifyParam = new verify_param_1.VerifyParam("test@gmail.com");
            expect(verifyParam.email().isValid()).toEqual(true);
        });
        it('should return false as the parameter is not a json object', function () {
            var verifyParam = new verify_param_1.VerifyParam("test@");
            expect(verifyParam.email().isValid()).toEqual(false);
        });
    });
    describe('min()', function () {
        it('should return true as the parameter meets the minimum value', function () {
            var verifyParam = new verify_param_1.VerifyParam("password");
            expect(verifyParam.min(5).isValid()).toEqual(true);
        });
        it('should return false as the parameter does not meet the minimum value', function () {
            var verifyParam = new verify_param_1.VerifyParam("password");
            expect(verifyParam.min(15).isValid()).toEqual(false);
            var verifyParam1 = new verify_param_1.VerifyParam(null);
            expect(verifyParam1.min(15).isValid()).toEqual(false);
        });
    });
    describe('max()', function () {
        it('should return true as the parameter does not exceed the max value', function () {
            var verifyParam = new verify_param_1.VerifyParam("password");
            expect(verifyParam.max(15).isValid()).toEqual(true);
        });
        it('should return false as the parameter exceeds the max value', function () {
            var verifyParam = new verify_param_1.VerifyParam("password");
            expect(verifyParam.max(5).isValid()).toEqual(false);
            var verifyParam1 = new verify_param_1.VerifyParam(null);
            expect(verifyParam1.max(5).isValid()).toEqual(false);
        });
    });
    describe('equals()', function () {
        it('should return true as the parameter and value are equal', function () {
            var verifyParam = new verify_param_1.VerifyParam("password");
            expect(verifyParam.equals('password').isValid()).toEqual(true);
        });
        it('should return false as the parameter and value are not equal', function () {
            var verifyParam = new verify_param_1.VerifyParam("passworda1");
            expect(verifyParam.equals('password').isValid()).toEqual(false);
            var verifyParam1 = new verify_param_1.VerifyParam(null);
            expect(verifyParam1.equals('password').isValid()).toEqual(false);
        });
    });
    describe('notEquals()', function () {
        it('should return true as the parameter and value are not equal', function () {
            var verifyParam = new verify_param_1.VerifyParam("password");
            expect(verifyParam.notEquals('password12').isValid()).toEqual(true);
        });
        it('should return false as the parameter and value are equal', function () {
            var verifyParam = new verify_param_1.VerifyParam("password");
            expect(verifyParam.notEquals('password').isValid()).toEqual(false);
            var verifyParam1 = new verify_param_1.VerifyParam(undefined);
            expect(verifyParam1.notEquals('password').isValid()).toEqual(false);
        });
    });
    describe('lengthEquals()', function () {
        it('should return true', function () {
            var verifyParam = new verify_param_1.VerifyParam("password");
            expect(verifyParam.lengthEquals(8).isValid()).toEqual(true);
        });
        it('should return false', function () {
            var verifyParam = new verify_param_1.VerifyParam("password");
            expect(verifyParam.lengthEquals(10).isValid()).toEqual(false);
            var verifyParam1 = new verify_param_1.VerifyParam(null);
            expect(verifyParam1.lengthEquals(10).isValid()).toEqual(false);
        });
    });
    describe('empty()', function () {
        it('should return true', function () {
            var verifyParam = new verify_param_1.VerifyParam([]);
            expect(verifyParam.empty().isValid()).toEqual(true);
        });
        it('should return false', function () {
            var verifyParam = new verify_param_1.VerifyParam("df");
            expect(verifyParam.empty().isValid()).toEqual(false);
        });
    });
    describe('notEmpty()', function () {
        it('should return true', function () {
            var verifyParam = new verify_param_1.VerifyParam([1, 2]);
            expect(verifyParam.notEmpty().isValid()).toEqual(true);
            var verifyParam1 = new verify_param_1.VerifyParam("12");
            expect(verifyParam1.notEmpty().isValid()).toEqual(true);
            var verifyParam2 = new verify_param_1.VerifyParam({ a: 2 });
            expect(verifyParam2.notEmpty().isValid()).toEqual(true);
        });
        it('should return false', function () {
            var verifyParam = new verify_param_1.VerifyParam("");
            expect(verifyParam.notEmpty().isValid()).toEqual(false);
            var verifyParam1 = new verify_param_1.VerifyParam([]);
            expect(verifyParam1.notEmpty().isValid()).toEqual(false);
            var verifyParam2 = new verify_param_1.VerifyParam({});
            expect(verifyParam2.notEmpty().isValid()).toEqual(false);
            var verifyParam3 = new verify_param_1.VerifyParam("");
            expect(verifyParam3.string().notEmpty().isValid()).toEqual(false);
        });
    });
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var verify_1 = __webpack_require__(11);
describe('verify', function () {
    it('should use the VerifyParam class to verify the parameter', function () {
        var myParam = 10;
        expect(verify_1.verify(myParam).number().isValid()).toEqual(true);
    });
    it('should work inside a promise', function (done) {
        var myFunc = function () {
            return new Promise(function (resolve, reject) {
                verify_1.verify(10).equals(11).isValidOrThrowError();
                var test = 10;
                resolve();
            });
        };
        myFunc().then(function () {
            expect(true).toEqual(false);
        }).catch(function (err) {
            expect(true).toEqual(true);
            done();
        });
    });
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var verify_param_1 = __webpack_require__(3);
exports.verify = function (parameter, parameterName) {
    return new verify_param_1.VerifyParam(parameter, parameterName);
};


/***/ })
/******/ ]);
//# sourceMappingURL=spec.js.map