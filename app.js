var express = require("express");
var morgan = require("morgan");
var multer = require("multer");
var ejs = require("ejs");

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//omit the options object, the files will be kept in memory and never written to disk.
var upload = multer();

var port = process.env.PORT || 3000;
var host = process.env.IP || 'localhost';

app.use(morgan('dev'));

app.get("/", function(req,res){
    res.render("form");
});

//Accept a single file with the name fieldname, specified in the form. The single file will be stored in req.file.
app.post("/filesize", upload.single("fileInput") ,function(req,res){
    res.json({
        fileName: req.file.originalname,
        fileSize: req.file.size + ' bytes'
    });
});


app.listen(port, host, function(){
    console.log(`https://${host}:${port}/`);
})