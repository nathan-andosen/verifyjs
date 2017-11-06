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
            var service = serviceClass;
            if (service instanceof Function) {
                service = new serviceClass();
            }
            _this.addByName(service.constructor.name, service);
        });
    };
    DependencyManager.prototype.get = function (c) {
        return this.getByName(c['name'].toLowerCase());
    };
    DependencyManager.prototype.clear = function () {
        this.services = {};
    };
    return DependencyManager;
}());
exports.DependencyManager = DependencyManager;
var dependencyManager = new DependencyManager();
exports.dependencyManager = dependencyManager;
//# sourceMappingURL=dependency-manager.js.map