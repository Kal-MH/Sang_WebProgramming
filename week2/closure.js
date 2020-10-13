function add() {
    var count = 0;

    var history = function () {
        count++;
        return count;
    }
    return history;
}

var result = add(); //result = history;

console.log(result());
console.log(result());
console.log(result());

//history가 호출될 때마다 원함수 내부변수의 값을 기억하고 저장할 수 있는 것.
