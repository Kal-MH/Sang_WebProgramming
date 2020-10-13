var util = require("util");
var EventEmitter = require('events').EventEmitter;

var Calc = function () {
    var add = function (a, b) {
        
    }
    this.on('stop', function () {
        console.log("Calc got stop event.");
    })
}

util.inherits(Calc, EventEmitter);

module.exports = Calc;
module.exports.title = "calculator";