var result = 0;

console.time("duration_sum");

for(var i = 1; i <= 10000; i++)
{
    result += i;
}

console.timeEnd("duration_sum");

console.log("sum of 1 to 10000: %d", result);
console.log("filename: %s ", __filename);
console.log("path: %s", __dirname);