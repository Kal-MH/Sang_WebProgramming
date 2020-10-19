var http = require('http');
var express = require('express')
var Static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var fs = require('fs');


var app = express();
var router = express.Router();



var MongoClient = require('mongodb').MongoClient;

var database;

//함수 정의
//DB서버의 url을 적어둠.(localhost에 쓰는 db를 쓸 것이기 때문에 아이디 패스워드는 생략.)
function connectDB() {
    var databaseUrl = 'mongodb://localhost:27017/';

    //db에 연결 시도.
    MongoClient.connect(databaseUrl, function (err, db) {
        if (err) throw err;

        console.log('DB에 연결되었습니다. : ' + databaseUrl);

        // database 변수에 로컬 데이터베이스 할당.
        database = db.db('locals');
    });
}

var authUser = function (database, id, password, callback) {
    var users = database.collection('users');

    users.find({ 'id': id, 'password': password }).toArray(function (err, docs) {
        if (docs) {//login success.
            callback(docs);
        } else {//login fail
            callback(null); //authUser 호출시, 콜백함수(x) -> x == null/something
        }
    })
}

function addUser(database, id, password, name, callback) {
    var users = database.collection('users');

    users.insertOne({
        id: id,
        password: password,
        name: name
    }, function (err, result) {
        if (err) {

        } else {
            console.log('member is joined.' + id);
            callback(result);
        }
    })
}

//미들웨어 시작.
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: false,
    saveUninitialized: true
}))


app.use('/public', Static(path.join(__dirname, '../public')));
app.use('/uploads', Static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: false }))



//

router.route('/process/product').get(function (req, res) {
    console.log('product')

    if (req.session.user) //
    {
        res.redirect('/public/product.html')
    } else { //
        res.redirect('/public/login2.html')

    }
})

router.route('/process/login').post(function (req, res) {
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    console.log(paramId, paramPassword);
    authUser(database, paramId, paramPassword, function (docs) {
        if (docs.length > 0) {
            console.log('login success!' + docs[0].id);
            //session is made
            req.session.user = {
                id: docs[0].id,
                name: docs[0].name
            }
            console.dir(req.session.user);
            res.redirect("/process/product");
        } else {
            console.log('login fail');
            res.redirect("/public/login.html");
        }
    })
})

router.route('/process/logout').get(function (req, res) {
    if (req.session.user) {
        req.session.destroy(function (err) {
            if (err) { throw err; }

            console.log('session is deleted.');
            res.redirect('/public/login2.html');
        })
    } else {
        res.redirect('/public/login2.html');
    }
})

router.route('/process/login').get(function (req, res) {
    res.send('');
})

router.route('/process/login/:name').post(function (req, res) {
    res.send('welcome, ' + req.params.name + '!');
})

router.route('/process/login/:name').get(function (req, res) {
    res.send('welcome, ' + req.params.name + '!');
})

router.route('/process/register').post(function (req, res) {
    console.log('register try');

    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;

    addUser(database, paramId, paramPassword, paramName, function (result) {
        res.redirect("/public/login.html");
    })
})

app.use('/', router);
// app.all('*', function(req, res){
// 	res.status(404).send('error');
// })
app.use(expressErrorHandler.httpError(404));
var errorHandler = expressErrorHandler({
    static: {
        '404': path.join(__dirname, '../public/404.html')
    }
})

app.use(errorHandler);




//서버를 띄우자 마자 데이터베이스를 연결.
http.createServer(app).listen(3000, function () {
    console.log('Express');
    connectDB();
})
