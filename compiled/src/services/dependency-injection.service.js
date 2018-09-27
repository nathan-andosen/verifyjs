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
//# sourceMappingURL=dependency-injection.service.js.map