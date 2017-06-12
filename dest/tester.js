"use strict";
// File import
//import { Worker } from "./worker"
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
// File lookup import
var WorkerImport = require("./worker");
var Tests;
(function (Tests) {
    var BaseClass = (function () {
        function BaseClass() {
        }
        return BaseClass;
    }());
    var Component = (function () {
        function Component(name) {
            this.name = name;
        }
        return Component;
    }());
    var Frame = (function () {
        function Frame(name, components) {
            this.name = name;
            this.components = components;
            this.pointer = 0;
        }
        Frame.prototype.next = function () {
            if (this.pointer < this.components.length) {
                return {
                    done: false,
                    value: this.components[this.pointer++]
                };
            }
            else {
                return {
                    done: true,
                    value: null
                };
            }
        };
        return Frame;
    }());
    var Tester = (function () {
        function Tester() {
        }
        // Test with *let* keyword instead of var
        Tester.prototype.usingLetInsteadOfVar = function () {
            // using let creates new scope for i so otherwise using var it will be printing 10 all!!!
            console.log("Using let in loop and timeout");
            var _loop_1 = function (i) {
                setTimeout(function () {
                    console.log(i);
                }, 100 * i);
            };
            for (var i = 0; i < 10; i++) {
                _loop_1(i);
            }
            console.log("Using var in loop and timeout");
            for (var v = 0; v < 10; v++) {
                setTimeout(function () {
                    console.log(v);
                }, 100 * v);
            }
        };
        // Array destructing
        Tester.prototype.arrayDestructing = function () {
            var input = [1, 2];
            var first = input[0], second = input[1];
            console.log("first", first); // outputs 1
            console.log("second", second); // outputs 2
        };
        // Object destructing
        Tester.prototype.objectDestructing = function () {
            var o = {
                a: "foo",
                b: 12,
                c: "bar"
            };
            var a = o.a, b = o.b;
            console.log("a", a); // outputs 1
            console.log("b", b); // outputs 1
        };
        // spreads merges the two objects or arrays
        Tester.prototype.spreads = function () {
            // arrays
            var first = [1, 2];
            var second = [3, 4];
            var spreads = [0].concat(first, second, [5]);
            console.log("spreads", spreads);
            // spready object by adding new properties
            var point2d = { x: 1, y: 2 };
            /** Create a new object by using all the point2D props along with z */
            var point3D = __assign({}, point2d, { z: 3 });
            console.log("point3D", point3D);
        };
        Tester.prototype._a = function () {
            // Error cannot create instance of the base class!!!
            //var a = new BaseClass();
        };
        Tester.prototype.resetParameters = function () {
            var all = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                all[_i] = arguments[_i];
            }
            for (var ctr = 0; ctr < all.length; ctr++) {
                console.log(all[ctr]);
            }
        };
        Tester.prototype.forOfSyntax = function () {
            var someArray = [9, 2, 5];
            for (var _i = 0, someArray_1 = someArray; _i < someArray_1.length; _i++) {
                var item = someArray_1[_i];
                console.log(item); // 9,2,5
            }
        };
        Tester.prototype.iterators = function () {
            var frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
            var iteratorResult1 = frame.next(); //{ done: false, value: Component { name: 'top' } }
            console.log(iteratorResult1);
            var iteratorResult2 = frame.next(); //{ done: false, value: Component { name: 'bottom'
            console.log(iteratorResult2);
            var iteratorResult3 = frame.next(); //{ done: false, value: Component { name: 'left' }
            console.log(iteratorResult3);
            var iteratorResult4 = frame.next(); //{ done: false, value: Component { name: 'right'}}
            console.log(iteratorResult4);
            var iteratorResult5 = frame.next(); //{ done: true }
            console.log(iteratorResult5);
        };
        Tester.prototype.promises = function () {
            var promise = new Promise(function (resolve, reject) {
                resolve(123);
            });
            promise.then(function (res) {
                console.log('I get called:', res === 123); // I get called: true
            });
            promise["catch"](function (err) {
                // This is never called
            });
            // promise with error
            Promise.reject(new Error('something bad happened'))
                .then(function (res) {
                console.log(res); // not called
                return 456;
            })
                .then(function (res) {
                console.log(res); // not called
                return 123;
            })
                .then(function (res) {
                console.log(res); // not called
                return 123;
            })["catch"](function (err) {
                console.log(err.message); // something bad happened
            });
        };
        Tester.prototype.fileLookupImport = function () {
            var doer = new WorkerImport.Worker.Doer();
            doer.DoIt();
        };
        return Tester;
    }());
    Tests.Tester = Tester;
})(Tests = exports.Tests || (exports.Tests = {}));
var tester = new Tests.Tester();
tester.usingLetInsteadOfVar();
tester.arrayDestructing();
tester.objectDestructing();
tester.spreads();
tester.resetParameters("typescript", "is", "cool!");
tester.forOfSyntax(); // Loop through array items not index
tester.iterators();
tester.promises();
//tester.asynchedWelcome();
tester.fileLookupImport();
//# sourceMappingURL=tester.js.map