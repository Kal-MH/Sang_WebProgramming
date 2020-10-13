var Calc = require("./calc");

var calc = new Calc();
calc.emit('stop');


console.log(Calc.title + " to stop event");
