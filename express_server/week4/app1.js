var express = require("express");
var http = require("http");
var Static = require("serve-static");
var path = require("path");

//1. p2
// var app = express();
// app.set('name', 'jongdae');
// console.log(app.get('name'));

//2.p6
var app = express();

app.use("/public", Static(path.join(__dirname, "public"))); 
app.use(function (req, res, next) {
    console.log("First Middleware");

    // res.writeHead("200", {"Content-Type" : "text/html;charset=utf-8"});
    // res.end("<h1> Hello Express!</h1>");
    //res.sendStatus(200);
    // var userAgent = req.header("User-Agent");
    // console.log(userAgent);
    res.send("<h1>Hello "+req.query.name+"</h1>")
    next();
})

http.createServer(app).listen(3000, function () {
    console.log("Server started: 3000");
})