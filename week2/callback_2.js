var callback1 = function(result){
    console.log(result);
}

var callback2 = function(result){
    console.log("result is : ", result);
}

var add = function (a, b, callback) {
    var result = a + b;
    callback(result);

    var history = function () {
        return a + "+" + b + '=' + result;
    }
    return history;
}

//var r = add(1, 2, callback1);
//console.log(r());

console.log(add(1, 2, function (result) {
    result += 2;
    console.log(result); 
})())