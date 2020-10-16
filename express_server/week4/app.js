var express = require("express");
var http = require("http");
var Static = require("serve-static");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser")

var expressErrorHandler = require("express-error-handler");

var app = express();



app.use("/public", Static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

var router = express.Router();
router.route("/process/login").post(function(req, res){
    res.send("id: " + req.body.id + "password : " + req.body.password);
})
router.route("/process/login").get(function(req, res){
    res.send("id, password please.");
})
router.route("/process/login/:name").post(function(req, res){
    console.log(req.params.name)
    res.send("id: " + req.body.id + "password : " + req.body.password);
})
router.route("/process/login/:name").get(function(req, res){
    res.send("login please, " + req.params.name)
})
// app.post("/public/login.html", function (req, res) {
//     console.log(req.body.id, req.body.password);
//     res.send("<h1> id : " + req.body.id + "</h1>");
// })

router.route('/process/setUserCookie').get(function (req, res) {
    res.cookie('user', {
        id:'mike',
        name:'소녀시대',
        age:22
    })
    res.redirect('/process/showCookie');
})
router.route('/process/showCookie').get(function (req, res) {
    res.send(req.cookies);
})

app.use('/', router)
var errorHandler = expressErrorHandler({
    statid: {
        "404":'./public/404.html'
    }
})
app.use(expressErrorHandler.httpError(404))
app.use(errorHandler);
// app.all("*", function (req, res) {
//     res.status(404).send("Error");
// })
http.createServer(app).listen(3000, function () {
    console.log("Server started: 3000");
})