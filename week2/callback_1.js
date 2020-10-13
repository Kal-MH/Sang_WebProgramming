var callback1 = function(result){
    console.log(result);
}

var callback2 = function(result){
    console.log("result is : ", result);
}

var add = function (a, b, callback) {
    var result = a + b;
    callback(result);
}

add(1, 2, function (result) {
    result += 2;
    console.log("anonymous function with %d", result);
});