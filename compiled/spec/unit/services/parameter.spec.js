"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parameter_1 = require("../../../src/services/parameter");
describe('Parameter', function () {
    describe('getDataType()', function () {
        it('should return the correct data type', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.getDataType(undefined))
                .toEqual(parameter_1.ParameterDataType.Undefined);
            expect(parameter.getDataType(null)).toEqual(parameter_1.ParameterDataType.Null);
            expect(parameter.getDataType(10)).toEqual(parameter_1.ParameterDataType.Number);
            expect(parameter.getDataType(1.6)).toEqual(parameter_1.ParameterDataType.Number);
            expect(parameter.getDataType("")).toEqual(parameter_1.ParameterDataType.String);
            expect(parameter.getDataType("hi")).toEqual(parameter_1.ParameterDataType.String);
            expect(parameter.getDataType('10')).toEqual(parameter_1.ParameterDataType.String);
            expect(parameter.getDataType(true)).toEqual(parameter_1.ParameterDataType.Boolean);
            expect(parameter.getDataType(false)).toEqual(parameter_1.ParameterDataType.Boolean);
            expect(parameter.getDataType([])).toEqual(parameter_1.ParameterDataType.Array);
            expect(parameter.getDataType([1, 2])).toEqual(parameter_1.ParameterDataType.Array);
            expect(parameter.getDataType([null])).toEqual(parameter_1.ParameterDataType.Array);
            expect(parameter.getDataType(new Array()))
                .toEqual(parameter_1.ParameterDataType.Array);
            var obj = { test: 123 };
            expect(parameter.getDataType(obj)).toEqual(parameter_1.ParameterDataType.Json);
            obj = JSON.parse(JSON.stringify(obj));
            expect(parameter.getDataType(obj)).toEqual(parameter_1.ParameterDataType.Json);
            var unknown = new function () { };
            expect(parameter.getDataType(unknown)).toEqual(parameter_1.ParameterDataType.Unknown);
        });
    });
    describe('isDefined()', function () {
        it('should return true', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isDefined(null)).toEqual(true);
            expect(parameter.isDefined([null])).toEqual(true);
            expect(parameter.isDefined(new Array())).toEqual(true);
        });
        it('should return false', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isDefined(undefined)).toEqual(false);
        });
    });
    describe('isSet()', function () {
        it('should return true', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isSet(false)).toEqual(true);
            expect(parameter.isSet(0)).toEqual(true);
            expect(parameter.isSet("")).toEqual(true);
            expect(parameter.isSet([])).toEqual(true);
            expect(parameter.isSet({})).toEqual(true);
            expect(parameter.isSet(true)).toEqual(true);
        });
        it('should return false', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isSet(undefined)).toEqual(false);
            expect(parameter.isSet(null)).toEqual(false);
        });
    });
    describe('isJson()', function () {
        it('should return true', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isJson({})).toEqual(true);
            expect(parameter.isJson({ "abc": true })).toEqual(true);
        });
        it('should return false', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isJson("{}")).toEqual(false);
            expect(parameter.isJson(null)).toEqual(false);
            expect(parameter.isJson(new function () { })).toEqual(false);
            expect(parameter.isJson(10)).toEqual(false);
            expect(parameter.isJson([])).toEqual(false);
        });
    });
    describe('isArray()', function () {
        it('should return true', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isArray([])).toEqual(true);
            expect(parameter.isArray([null])).toEqual(true);
            expect(parameter.isArray(new Array())).toEqual(true);
        });
        it('should return false', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isArray({})).toEqual(false);
            expect(parameter.isArray(null)).toEqual(false);
            expect(parameter.isArray("[]")).toEqual(false);
        });
    });
    describe('isString()', function () {
        it('should return true', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isString('')).toEqual(true);
            expect(parameter.isString("")).toEqual(true);
            expect(parameter.isString(new String())).toEqual(true);
            expect(parameter.isString("false")).toEqual(true);
        });
        it('should return false', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isString({})).toEqual(false);
            expect(parameter.isString(null)).toEqual(false);
            expect(parameter.isString([""])).toEqual(false);
        });
    });
    describe('isNumber()', function () {
        it('should return true', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isNumber(0)).toEqual(true);
            expect(parameter.isNumber(-1)).toEqual(true);
            expect(parameter.isNumber(-1.5)).toEqual(true);
            expect(parameter.isNumber(0.42)).toEqual(true);
            expect(parameter.isNumber(.42)).toEqual(true);
            expect(parameter.isNumber(8e5)).toEqual(true);
            expect(parameter.isNumber(5)).toEqual(true);
            expect(parameter.isNumber('10')).toEqual(true);
            expect(parameter.isNumber(' 10 ')).toEqual(true);
            expect(parameter.isNumber('.42')).toEqual(true);
        });
        it('should return false', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isNumber(undefined)).toEqual(false);
            expect(parameter.isNumber(null)).toEqual(false);
            expect(parameter.isNumber(true)).toEqual(false);
            expect(parameter.isNumber('0test')).toEqual(false);
            expect(parameter.isNumber('#abc')).toEqual(false);
            expect(parameter.isNumber('1.2.3')).toEqual(false);
            expect(parameter.isNumber('')).toEqual(false);
            expect(parameter.isNumber('ten')).toEqual(false);
        });
    });
    describe('isInt()', function () {
        it('should return true', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isInt(0)).toEqual(true);
            expect(parameter.isInt(-1)).toEqual(true);
            expect(parameter.isInt(8e5)).toEqual(true);
            expect(parameter.isInt(5)).toEqual(true);
            expect(parameter.isInt('10')).toEqual(true);
            expect(parameter.isInt(' 10 ')).toEqual(true);
            expect(parameter.isInt('8e5')).toEqual(true);
        });
        it('should return false', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isInt(undefined)).toEqual(false);
            expect(parameter.isInt(null)).toEqual(false);
            expect(parameter.isInt(true)).toEqual(false);
            expect(parameter.isInt('0test')).toEqual(false);
            expect(parameter.isInt('#abc')).toEqual(false);
            expect(parameter.isInt('1.2.3')).toEqual(false);
            expect(parameter.isInt('')).toEqual(false);
            expect(parameter.isInt('42.1')).toEqual(false);
            expect(parameter.isInt(1.2)).toEqual(false);
        });
    });
    describe('isEmail()', function () {
        it('should return true', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isEmail('test@email.com')).toEqual(true);
            expect(parameter.isEmail('test.test@email.com')).toEqual(true);
            expect(parameter.isEmail('123@email.org')).toEqual(true);
            expect(parameter.isEmail('test@123.org')).toEqual(true);
            expect(parameter.isEmail('test@test-test.org')).toEqual(true);
            expect(parameter.isEmail('!#$%&`*+/=?^`{|}~@test.org')).toEqual(true);
            expect(parameter.isEmail('test@email.com.au')).toEqual(true);
        });
        it('should return false', function () {
            var parameter = new parameter_1.Parameter();
            expect(parameter.isEmail(undefined)).toEqual(false);
            expect(parameter.isEmail(null)).toEqual(false);
            expect(parameter.isEmail(true)).toEqual(false);
            expect(parameter.isEmail('.test@email.com')).toEqual(false);
            expect(parameter.isEmail('test.@email.com')).toEqual(false);
            expect(parameter.isEmail('test..test@email.com')).toEqual(false);
            expect(parameter.isEmail('testemail.com')).toEqual(false);
            expect(parameter.isEmail('test\@test@iana.org')).toEqual(false);
            expect(parameter.isEmail('test@test.org.')).toEqual(false);
            expect(parameter.isEmail('test@email..com')).toEqual(false);
        });
    });
});
//# sourceMappingURL=parameter.spec.js.map