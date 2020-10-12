//exports way 1. make funtions in the same file
var calc = {};
calc.add = function(a, b){
    return a + b;
}
console.log("result : %d", calc.add(10, 10));

//exports way 2. use "exports" object.
calc = require("./calc");
console.log("result : %d", calc.add(20, 20));

//exports way 3.
calc = require("./calc2");
console.log(calc);
console.log("result : %d", calc.mul(30, 30));

var test = {
    "one" : 1,
    "two" : "two",
    "func" : function () {
        console.log("Hello world");
    }
}

var test2 = test;
console.log(test2);