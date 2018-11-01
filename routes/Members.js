var express = require('express');
var router = express.Router();
var expressValidator=require('express-validator');
var Member=require('../models/Membersdb');
var Grv=require('../models/grievancedb');
var session=require('express-session');
var bodyParser = require("body-Parser");
console.log('sucessful');
var app = express();
var sess;
function requireLogin(req, res, next) {
  console.log(req.session.active)
    if (req.session.active==1&&req.session.type=='Members') { /*if someone is logged in as cell member*/ 
      next(); // allow the next route to run                   
    } else {
      // require the user to log in
      res.redirect('/'); // or render a form, etc.
    }
  }

  router.get('/Home',requireLogin, function(req, res, next) {
    res.render('gcm-grievances1',{title:'Members',Gtype:sess.grv_type});
  });
  router.get('/err_valid', function(req, res, next) {
    res.render('err_valid',{title:'Faculty_Login'});
  });
  router.get('/logged', function(req, res, next) {
    res.render('logged',{title:'Faculty_Login'});
  });
  router.get('/unknw', function(req, res, next) {
    res.render('unknw',{title:'Faculty_Login'});
  });
  router.get('/password_reset',requireLogin, function(req, res, next) {
    res.render('gcm-password',{title:'Members'});
  });
  
  router.get('/pass', function(req, res, next) {
    res.render('pass',{title:'Faculty_Login'});
  });
  router.get('/my-account', requireLogin,function(req, res, next) {
    sess=req.session;
    id=sess.user;
    console.log('id is '+sess.user);
    Member.getUserByID(id,function(err, user){
     if(err) throw err;
     if(!user){
         console.log("unknown user");
         res.redirect('/unknw');
         return;
     }  
  
   res.render('gcm-myaccount',{
      designation:user.designation,
      name:user.name,
      gtype:user.Gtype,
      email:user.emailid,
      mobile:user.mobileno

    })
 //  res.send(data);
    });
  });
  router.post('/password_reset',function(req,res,next){
    var cpass=req.body.current_password;
    var  npass=req.body.new_password;
    var npass2=req.body.new_password1;
    //console.log(npass);
    //console.log(cpass);

    //req.checkBody('cpass','password field is required').notEmpty();
    //req.checkBody('npass','password field is required').notEmpty();
    //req.checkBody('npass2','password do not match').equals(npass);
  
    /*var errors=req.validationErrors();
    if(errors)
    { console.log(errors);
        res.render('err_valid',{
      errors: errors
    });
      console.log('errors in validation');
      
    }
    else{*/
  
  Member.getUserByID(req.session.user,function(err, user){
    if(err) throw err;
    if(!user){
        console.log("unknown user");
        res.redirect('/faculty/unknw');
        return;
    }
  
          Member.comparePassword(cpass, user.password, function(err, isMatch){
              if(err) throw err;
                if(isMatch){
  
                    var id={ _id:sess.user };
                    //console.log('id is '+sess.user.id);
                    
                  Member.update_password(id,npass,function(err){
                     if(err) throw err;
                   else
                   {
                     console.log(' password updates');
                     res.redirect('/success')
                   }
                  }); 
                  }
  
                  else{
                    console.log('password doesnt match');
                    res.redirect('/failed');
                    return;
                  }
      });
  
      })
      
    })
  router.post('/update',function(req,res,next){
    
    var id={ _id:sess.user};
     var newvalues = {$set: 
       {
        emailid:req.body.emailid,
        mobileno:req.body.mobileno
     }};
   Member.updateuser(id,newvalues,function(err,isUpdate){
      if(err) throw err;
    else
    {
      console.log(' successfuly update ');
      res.redirect('/Members/my-account')
    }
   });
  
   });
  router.get('/Grievances',requireLogin,function(req,res,next){
    
    console.log(req.session.grv_type);

    Grv.grv_findformembers(req.session.grv_type,function(err,result)
    {
        if(err) throw err;
        console.log(result);
        res.render('gcm-grievances1',{
        result:result,
    })
    //res.send(data);
  //)
        }
    
    );
    });
  router.post('/login',function(req,res,next){
    sess=req.session;
    if(!sess.user){
    var id=req.body.id;
    var password=req.body.password;
  
  
    Member.getUserByID(id,function(err, user){
      if(err) throw err;
      if(!user){
          console.log("unknown user");
          res.redirect('/Members/unknw');
          return;
              }
      Member.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
           console.log('login sucsseful');      
           sess.user=user._id;
           sess.grv_type=user.Gtype;
          sess.type='Members';
          sess.active=1;
         
           res.redirect('/Members/Grievances');
         
      
        }
        else{
          console.log('invalid password');
          res.redirect('/Members/pass');
        }
      })
      /*sess.user=user._id;
      sess.type='Members';
      sess.active=1;
    */
        });
    }
    else{
      res.end('someone already logged in');
    }
  });


module.exports = router;
