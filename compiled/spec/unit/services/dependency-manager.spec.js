"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_manager_1 = require("../../../src/services/dependency-manager");
var DepOne = (function () {
    function DepOne() {
    }
    DepOne.prototype.getSomething = function () {
        return 'Got something';
    };
    return DepOne;
}());
var DepTwo = (function () {
    function DepTwo() {
    }
    DepTwo.prototype.doSomething = function () {
        return 'Did something';
    };
    return DepTwo;
}());
var DepThree = (function () {
    function DepThree(name) {
        this.name = '';
        this.name = name;
    }
    DepThree.prototype.getName = function () {
        return this.name;
    };
    return DepThree;
}());
describe('DependencyManager', function () {
    describe('add() & get()', function () {
        it('should add and get dependencies', function () {
            var depOneTest = new DepOne();
            var depTwoTest = new DepTwo();
            dependency_manager_1.dependencyManager.add({ name: 'DepOne', service: DepOne }, { name: 'DepTwo', service: DepTwo }, { name: 'DepThree', service: new DepThree('test name') });
            var depOne = dependency_manager_1.dependencyManager.getByName('DepOne');
            expect(depOne.getSomething()).toEqual(depOneTest.getSomething());
            var depTwo = dependency_manager_1.dependencyManager.getByName('DepTwo');
            expect(depTwo.doSomething()).toEqual(depTwoTest.doSomething());
            var depThree = dependency_manager_1.dependencyManager.getByName('DepThree');
            expect(depThree.getName()).toEqual('test name');
            dependency_manager_1.dependencyManager.clear();
        });
    });
    describe('clear()', function () {
        it('should clear all dependencies', function () {
            dependency_manager_1.dependencyManager.add({ name: 'DepOne', service: DepOne }, { name: 'DepTwo', service: DepTwo });
            var depOne = dependency_manager_1.dependencyManager.getByName('DepOne');
            expect(depOne).toBeDefined();
            dependency_manager_1.dependencyManager.clear();
            var depOneAgain = dependency_manager_1.dependencyManager.getByName('DepOne');
            expect(depOneAgain).toBeUndefined();
        });
    });
});
//# sourceMappingURL=dependency-manager.spec.js.map