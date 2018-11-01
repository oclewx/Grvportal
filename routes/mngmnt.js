var express = require('express');
var router = express.Router();
var expressValidator=require('express-validator');
var mngmnt=require('../models/mngmntdb')
var bodyParser = require("body-Parser");
var session=require('express-session');
console.log('sucessful');
var app = express();
var sess;

  router.get('/Home', function(req, res, next) {
    res.render('Home1',{title:'Management'});
  });
  router.get('/err_valid', function(req, res, next) {
    res.render('err_valid');
  });
  router.get('/logged', function(req, res, next) {
    res.render('logged');
  });
  router.get('/unknw', function(req, res, next) {
    res.render('unknw');
  });
  router.get('/pass', function(req, res, next) {
    res.render('pass');
  });
  router.post('/login',function(req,res,next){
sess=req.session;
if(!sess.user){  
var id=req.body.id;
    var password=req.body.password;
  
  
    mngmnt.getUserByID(id,function(err, user){
      if(err) throw err;
      if(!user){
          console.log("unknown user");
          res.redirect('/mngmnt/unknw');
          return;
      }
      mngmnt.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
           console.log('login successful');      
           sess.user=user._id;
           sess.type='mngmnt';
           sess.active=1;
           res.redirect('/mngmnt/Home');
          
       
        }
        else{
          console.log('invalid password');
          res.redirect('/mngmnt/pass');
        }
      })
     /* sess.user=user._id;
      sess.type='mngmnt';
      sess.active=1;
    */
      });
    }
    else{
      res.end('someone already logged in');
    }
    });


module.exports = router;