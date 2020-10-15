var http = require('http');
var fs = require("fs");

// 웹 서버 객체를 만듭니다.
var server = http.createServer(function (req, res) {
    console.log("Request from client");
	
    var filename = "cat.jpg";
    fs.readFile(filename, function (err, data) {
        if (err)
        {
            console.log("file error")
            server.close(function (args) {
                //body
            })
        }
        console.log("file read success.");
        //res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.writeHead(200, {"Content-Type": "image/jpeg"});
        res.write(data);
        res.end();
    })
});

var host = '211.195.255.147';
var port = 3000;
server.listen(port, host, '511', function() {
	console.log('웹 서버가 시작되었습니다. : %s, %d', host, port);
});