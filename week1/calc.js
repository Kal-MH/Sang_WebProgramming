exports.add = function (a, b) {
    return a + b;
}

//No exports. So you can not use "sum" at export.js
//if you use exports, you can not use "sum" at this file.
var sum = function (a, b) {
    return a + b;
}