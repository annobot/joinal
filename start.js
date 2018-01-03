var fs = require('fs');

var path =require('path');
var express= require('express');
var bodyParser = require('body-parser');
var dir = require('node-dir');
var walk    = require('walk');
var mongoose = require('mongoose');

//var upload = require('express-fileupload');
var files   = [];
var im =[];
var server=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://annobot:badalhr@ds159845.mlab.com:59845/test123',{useMongoClient: true});
//schema
var person= new mongoose.Schema({
  name:String,
  email:String,
  p:String,
  msg:String

});

var Person =mongoose.model('Person',person);


server.set('view engine','ejs');
server.use('/',express.static(__dirname + '/assets'));
/*server.use('/dr',express.static(__dirname + '/assets'));

server.use('/con',express.static(__dirname + '/assets'));
server.use('/about',express.static(__dirname + '/assets'));
server.use('/gal',express.static(__dirname + '/Images'));
server.use('/gal',express.static(__dirname + '/back'));
//server.use(upload());
server.use(bodyParser.json());
/*var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
          console.log(file.originalname);
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

//server.use(bb());
server.post('/dr',urlencodedParser,function(req,res){
  console.log(req.body);
  var dat=req.body;
  var pone=Person({name:dat.name,email:dat.em,p:dat.phone,msg:dat.msg}).save(
  function(err){
    if(err) console.log(err);
    console.log('done');

  }

  );
res.render('res');
});

server.get('/con',function(req,res){
  res.render('contact');

});*/
server.get('/',function(req,res){
  var walker  = walk.walk('./assets/slide/img', { followLinks: false });

  walker.on('file', function(root, stat, next) {
      // Add this file to the list of files

      files.push(stat.name);
      next();
  });

  walker.on('end', function() {

      console.log(files);
      res.render('in',qs={files});

  });


//console.log(qs);
});
/*
server.get('/about',function(req,res){

  res.render('about');
});

server.get('/hid',function(req,res){
  res.render('hide');
var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  console.log(ip);
});

server.get('/a',function(req,res){
var di=Person.find({},function(err,data){
if(err) console.log(err);;
console.log(data);
res.render('adminpanel',b={data});

});
});
/*server.get('/up',function(req,res){

  res.render('contact');
});

server.post('/msg',function (req, res) {
  upload(req, res, function (err) {
          if (err) {
              return res.end("Something went wrong!");
          }
          return res.end("File uploaded sucessfully!.");
      });

});
*/
/*
server.get('/a2',function(req,res){
var di=Person.find({},function(err,data){
if(err) console.log(err);;
console.log(data);
res.render('ad2',b={data});

});
});


server.get('/gal',function(req,res){
  var im =[];
  var walker  = walk.walk('./Images', { followLinks: false });

  walker.on('file', function(root, stat, next) {
      // Add this file to the list of files

      im.push(stat.name);
      next();
  });

  walker.on('end', function() {

      console.log(im);
      res.render('galery',qs={im});
console.log(qs.im);
  });


//console.log(qs);
});

*/
server.listen(process.env.PORT || 3000);
console.log('made it');
