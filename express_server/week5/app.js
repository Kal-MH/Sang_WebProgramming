var express = require("express");
var http = require("http");
var Static = require("serve-static");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser")
var expressSession = require("express-session");
var multer = require("multer");
var fs = require("fs");
var cors = require("cors");
var mime = require("mime");
var expressErrorHandler = require("express-error-handler");

var app = express();

app.use("/public", Static(path.join(__dirname, "../public")));
app.use("/uploads", Static(path.join(__dirname, "../uploads")));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads");
    },
    filename : function (req, file, callback) {
        callback(null, file.originalname + Date.now());
    }
})
var upload = multer({
    storage: storage,
    limits: {
        files : 1,
        fileSize : 1024 * 1024 * 1024 //1GB
    }
})
app.use(cookieParser());
app.use(expressSession({
    secret:"my key",
    resave:false,
    saveUninitialized:true
}))

var router = express.Router();

router.route("/process/photo").post(upload.array('photo', 1), function (req, res) {
    var files = req.files[0];
    
    var mimetype = files.mimetype;
    var oriname = files.originalname;
    var size = files.size;

    res.send("file uploaded successfully. name : " +  oriname);
})
router.route("/process/download").get(function (req, res) {
    console.log('downloading file');
	console.log(req.query.filename);

	var uploadpath = path.join(__dirname,'../uploads')
	var filepath = path.join(uploadpath,req.query.filename);

	// console.log(mime.lookup(filepath));

	res.setHeader('Content-disposition', 'attachment; filename="'+req.query.filename+'"');
	// res.setHeader('Content-type', mime.lookup(filepath))

	var filestream = fs.createReadStream(filepath);
	filestream.pipe(res);
})
router.route("/process/product").get(function (req, res) {
    console.log("/process/product");
    if (req.session.user){ //로그인 성공했다 가정.
        res.redirect("/public/product.html");
    } else {
        res.redirect("/public/login2.html");
    }
})
router.route("/process/login").post(function(req, res){
    console.log("login success : " + req.body.id);
    req.session.user = {
        id : req.body.id,
        name : 'Mike',
        authorized: true
    }
    if (req.session.user)
        res.redirect("/public/product.html");
    //res.send("id: " + req.body.id + "password : " + req.body.password);
})
router.route("/process/logout").get(function (req,res) {
    if (req.session.user){
        console.log("logout");
        req.session.destroy(function (err) {
            if (err) {throw err;}
            res.redirect("/public/login2.html");
        })
    } else {
        res.redirect("/public/login2.html");
    }
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