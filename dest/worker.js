"use strict";
exports.__esModule = true;
var Worker;
(function (Worker) {
    var Doer = (function () {
        function Doer() {
        }
        Doer.prototype.DoIt = function () {
            console.log("DoIt was called.");
        };
        return Doer;
    }());
    Worker.Doer = Doer;
})(Worker = exports.Worker || (exports.Worker = {}));
//# sourceMappingURL=worker.js.map