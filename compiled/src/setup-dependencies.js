"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_manager_1 = require("./services/dependency-manager");
var parameter_service_1 = require("./services/parameter.service");
var equal_service_1 = require("./services/equal.service");
exports.setupDependencies = function () {
    dependency_manager_1.dependencyManager.clear();
    dependency_manager_1.dependencyManager.add(parameter_service_1.ParameterService, equal_service_1.EqualService);
};
//# sourceMappingURL=setup-dependencies.js.map