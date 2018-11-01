var express = require('express');
var router = express.Router();
var bodyParser = require("body-Parser");
var session = require('express-session');
var nodemailer = require("nodemailer");
var app=express();

var sess;
function requireLogin(req, res, next) {
console.log(req.session.active)
  if (req.session.active) {
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.redirect("/s1"); // or render a form, etc.
  }
}
app.all("/*", requireLogin, function(req, res, next) {
  next(); // if the middleware allowed us to get here,
          // just move on to the next route handler
});
router.get('/', function(req, res, next) {
 sess=req.session;
 
 if(sess.active)
 {
console.log('someone logged in  '+sess.type);
res.redirect('/'+sess.type+'/Home#!/');
  
  }
  else
  {
    res.render('view3');
  } 
  
 
 // res.render('view', { title: 'Members' });
  
});

router.get('/logout', function(req, res, next) {
 sess=req.session;
  console.log(sess.user+' is logged out');
  req.session.destroy(function(err)
{

  if(err) throw err;
});
console.log(sess.user+' is logged out');
  res.render('view2', { title: 'Members' });
})
/*router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});*/
router.get('/al', function(req, res, next) {
  res.render('al',{title:'Faculty_Login'});
});
router.get('/success', function(req, res, next) {
  res.render('success',{title:'Faculty_Login'});
});
router.get('/failed', function(req, res, next) {
  res.render('failed',{title:'Faculty_Login'});
});
router.get('/pass', function(req, res, next) {
  res.render('pass',{title:'Faculty_Login'});
});
router.get('/unknw', function(req, res, next) {
  res.render('unknw',{title:'Faculty_Login'});
});

  
router.get('/logged', function(req, res, next) {
  res.render('logged',{title:'Faculty_Login'});
});
router.get('/updated', function(req, res, next) {
  res.render('udone',{title:'Faculty_Login'});
});

function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/Admin/Welcome');
}

module.exports = router;
