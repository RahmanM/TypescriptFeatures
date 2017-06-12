
// File import
//import { Worker } from "./worker"

// File lookup import
import WorkerImport = require('./worker');

export module Tests {

    abstract class BaseClass {

    }

    interface Features {
        value: number;
        readonly age: number;
        optional?: string;
        [index: number]: string;
    }

    // Iterators

    interface Iterator<T> {
        next(value?: any): IteratorResult<T>;
        return?(value?: any): IteratorResult<T>;
        throw?(e?: any): IteratorResult<T>;
    }

    interface IteratorResult<T> {
        done: boolean;
        value: T;
    }

    class Component {
        constructor(public name: string) { }
    }

    class Frame implements Iterator<Component> {
        private pointer = 0;
        constructor(public name: string, public components: Component[]) { }
        public next(): IteratorResult<Component> {
            if (this.pointer < this.components.length) {
                return {
                    done: false,
                    value: this.components[this.pointer++]
                }
            } else {
                return {
                    done: true,
                    value: null
                }
            }
        }
    }

    export class Tester {

        // Test with *let* keyword instead of var
        usingLetInsteadOfVar() {
            // using let creates new scope for i so otherwise using var it will be printing 10 all!!!
            console.log("Using let in loop and timeout");
            for (let i = 0; i < 10; i++) {
                setTimeout(function () {
                    console.log(i);
                }, 100 * i);
            }

            console.log("Using var in loop and timeout");
            for (var v = 0; v < 10; v++) {
                setTimeout(function () {
                    console.log(v);
                }, 100 * v);
            }
        }

        // Array destructing
        arrayDestructing() {
            let input = [1, 2];
            let [first, second] = input;
            console.log("first", first); // outputs 1
            console.log("second", second); // outputs 2
        }

        // Object destructing
        objectDestructing() {
            let o = {
                a: "foo",
                b: 12,
                c: "bar"
            };
            let { a, b } = o;
            console.log("a", a); // outputs 1
            console.log("b", b); // outputs 1
        }

        // spreads merges the two objects or arrays
        spreads() {

            // arrays
            let first = [1, 2];
            let second = [3, 4];
            let spreads = [0, ...first, ...second, 5];

            console.log("spreads", spreads)

            // spready object by adding new properties
            const point2d = { x: 1, y: 2 };
            /** Create a new object by using all the point2D props along with z */
            const point3D = { ...point2d, z: 3 };
            console.log("point3D", point3D);
        }

        _a() {
            // Error cannot create instance of the base class!!!
            //var a = new BaseClass();
        }

        resetParameters(...all) {
            for (let ctr = 0; ctr < all.length; ctr++) {
                console.log(all[ctr]);
            }
        }

        forOfSyntax() {
            var someArray = [9, 2, 5];
            for (var item of someArray) {
                console.log(item); // 9,2,5
            }
        }


        iterators() {
            let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
            let iteratorResult1 = frame.next(); //{ done: false, value: Component { name: 'top' } }
            console.log(iteratorResult1);
            let iteratorResult2 = frame.next(); //{ done: false, value: Component { name: 'bottom'
            console.log(iteratorResult2);
            let iteratorResult3 = frame.next(); //{ done: false, value: Component { name: 'left' }
            console.log(iteratorResult3);
            let iteratorResult4 = frame.next(); //{ done: false, value: Component { name: 'right'}}
            console.log(iteratorResult4);
            let iteratorResult5 = frame.next(); //{ done: true }
            console.log(iteratorResult5);
        }

        promises() {

            const promise = new Promise((resolve, reject) => {
                resolve(123);
            });

            promise.then((res) => {
                console.log('I get called:', res === 123); // I get called: true
            });
            promise.catch((err) => {
                // This is never called
            });


            // promise with error
            Promise.reject(new Error('something bad happened'))
                .then((res) => {
                    console.log(res); // not called
                    return 456;
                })
                .then((res) => {
                    console.log(res); // not called
                    return 123;
                })
                .then((res) => {
                    console.log(res); // not called
                    return 123;
                })
                .catch((err) => {
                    console.log(err.message); // something bad happened
                });
        }

        fileLookupImport(){
            var doer = new WorkerImport.Worker.Doer();
            doer.DoIt();
        }

                   
    }
}

let tester = new Tests.Tester();
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