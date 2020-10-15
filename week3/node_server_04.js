var http = require('http');
var fs = require("fs");
const { runInNewContext } = require('vm');

// 웹 서버 객체를 만듭니다.
var server = http.createServer(function (req, res) {
    console.log("Request from client");
    //요청이 들어올 때마다 구글에 요청, 구글에서 준 응답을 사용자에게 보냄.
    var options = {
        host: 'www.google.com',
        port: 80,
        path: '/'
    };
    
    var req2 = http.get(options, function(res2) {
        // 응답 처리
        var resData = '';
        res2.on('data', function(chunk) {
            resData += chunk;
        });
        
        res2.on('end', function() {
            res.write(resData);
            res.end();
        });
    });
});

var host = '211.195.255.147';
var port = 3000;
server.listen(port, host, '511', function() {
    console.log('웹 서버가 시작되었습니다. : %s, %d', host, port);    
});

// var host = '211.195.255.147';
// var port = 3000;
// server.listen(port, host, '511', function() {
//     console.log('웹 서버가 시작되었습니다. : %s, %d', host, port);
//     //서버가 부팅이 완료되는 순간, http 요청을 만들게 된다.    
//     var options = {
//         host: 'www.google.com',
//         port: 80,
//         path: '/'
//     };
    
//     var req = http.get(options, function(res) {
//         // 응답 처리
//         var resData = '';
//         res.on('data', function(chunk) {
//             resData += chunk;
//         });
        
//         res.on('end', function() {
//             console.log(resData);
//         });
//     });
    
// });