var fs = require("fs");
var data = fs.readFileSync("./a.txt", 'utf-8');

//console.log(data);

fs.readFile("./b.txt", 'utf-8', (err, data)=>{
    if (err)
        console.log("error occur");
    console.log(data);
})

console.log("request to read a.txt");