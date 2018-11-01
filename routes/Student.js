var express = require('express');
var router = express.Router();
var expressValidator=require('express-validator');
var Student=require('../models/Studentdb');
var Grvtype=require('../models/grvtypedb');
var Grv=require('../models/grievancedb');
var bodyParser = require("body-Parser");
var session = require('express-session'); 
var nodemailer = require("nodemailer");
var sess;
var bcrypt = require('bcryptjs');
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  //secure: false,
  auth: {
      user: "gportal33@gmail.com",
      pass: "grievance001"
  }
});
var rand,mailOptions,host,link;
host='localhost:3000'
function requireLogin(req, res, next) {
  console.log(req.session.active)
    if (req.session.active==1&&req.session.type=='Student') { /*if someone is logged in as Student*/ 
      next(); // allow the next route to run                   
    } else {
      // require the user to log in
      res.redirect('/'); // or render a form, etc.
    }
  }
  
  router.get('/my-account',requireLogin, function(req, res, next) {
    sess=req.session;
    id=sess.user;
    console.log('id is '+sess.user);
    Student.getinfobyID(id,function(err, user){
     if(err) throw err;
     if(!user){
         console.log("unknown user");
         res.redirect('/unknw');
         return;
     }
     //res.render('newdash',
     var data={
       title:"Student",
      email:user.emailid,
      name: user.name,
      id:user.id,
      gender:user.gender,
      dep:user.dep,
      Batch:user.Batch,
      cdate:user.Cdate,
      mobile:user.mobileno
       }
       res.send(data);
       //);
    });  
   });
   router.get('/My_Grievances',requireLogin,function(req,res,next){
    console.log('hii'); 
    console.log(req.session.email)
      //console.log(req.query.id)
        Grv.grv_findbyuser(req.session.email,function(err,result)
    {
        if(err) throw err;
        console.log(result);
        //res.render('grievances',
        var data={
        info:result
    }
    res.send(data);
    //)
        }
    
    );
    });
   router.get('/post',requireLogin, function(req, res, next) {
    res.render('post',{title:'Student'});
  });
  router.get('/reports',requireLogin, function(req, res, next) {
    res.render('reports',{title:'Student'});
  });
   router.get('/Home',requireLogin, function(req, res, next) {
    res.render('Student_dash',{title:'Student',verify:sess.ver});
  });
   router.get('/logged', function(req, res, next) {
    res.render('logged',{title:'Faculty_Login'});
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
  router.get('/pass', function(req, res, next) {
    res.render('pass',{title:'Faculty_Login'});
  });
  router.get('/al', function(req, res, next) {
    res.render('al',{title:'Faculty_Login'});
  });
  /*router.get('/update', function(req, res, next) {
    res.render('Supdt',{title:'Student'});
  });*/
  router.get('/password_reset',requireLogin, function(req, res, next) {
    res.render('password_reset',{title:'Student'});
  });
  router.post('/password_reset',function(req,res,next){
  var cpass=req.body.current_password;
  var  npass=req.body.new_password;
  var npass2=req.body.new_password1;
  //console.log(npass);
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

Student.getinfobyID(req.session.user,function(err, user){
  if(err) throw err;
  if(!user){
      console.log("unknown user");
      res.redirect('/faculty/unknw');
      return;
  }

        Student.comparePassword(cpass, user.password, function(err, isMatch){
            if(err) throw err;
              if(isMatch){

                  var id={ _id:sess.user };
                  //console.log('id is '+sess.user.id);
                  
                Student.update_password(id,npass,function(err){
                   if(err) throw err;
                 else
                 {
                   console.log(' password updated');
                  //   res.redirect('/Student/Home')
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
  var sess;
  
  router.post('/login',function(req,res,next){
 sess=req.session;
// var password1;
 if(!sess.user)
 {
    var id=req.body.id;
    var password=req.body.password;
  
  
    Student.getUserByID(id,function(err, user){
      if(err) throw err;
      if(!user){
          console.log("unknown user");
          res.redirect('/Student/unknw');
          return;
      }
     //console.log('object id is '+user._id);
     if(user.status=='approved')
     {
      Student.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
           console.log('login sucsseful');
           
          
         // sess.password=password1;
         sess.user=user._id;
          sess.type="Student";
          sess.email=user.emailid;
          sess.active=1;  
          res.redirect('/Student/Home');
        }
        else{
          console.log('invalid password');
          res.redirect('/Student/pass');
          return;
        }
      })}
      else{
        console.log('user not approved by admin');
        res.redirect('/');
      }
     // sess.user=user._id;
     // sess.type="Student";
      //sess.active=1;
     });
    }
    else   
    res.end('<h1>someone already logged in');

    });
    router.post('/update',function(req,res,next){
    
      var id={ _id:sess.user};
       var newvalues = {$set: 
         {
           //gender:req.body.gender,
          emailid:req.body.emailid,
          mobileno:req.body.mobileno
       }};
     Student.updateuser(id,newvalues,function(err,isUpdate){
        if(err) throw err;
      else
      {
        console.log(' successfuly update ');
        res.redirect('/Student/Home#!/')
      }
     });
    
     });

   

   

    router.post('/register', function(req, res, next) {
      sess=req.session; 
      if(!sess.user)
      {
      var name=req.body.name;
    var email=req.body.email;
    var gender=req.body.gender;
    var dep=req.body.dep;
    var batch=req.body.batch;
    var id=req.body.id;
    var cdate=req.body.cdate;
    var Mobile=req.body.Mobile;
    var password=req.body.password;
    var password2=req.body.password2;
    console.log(req.body.name);
    console.log(req.body.email);
    req.checkBody('name','Name field is required').notEmpty();
    req.checkBody('gender','Email field is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('dep','department field is required').notEmpty();
    req.checkBody('batch','batch/class field is required').notEmpty();
    req.checkBody('cdate','course completion date field is required').notEmpty();
    req.checkBody('id','id field is required').notEmpty();
    req.checkBody('Mobile','username field is required').notEmpty();
    req.checkBody('password','password field is required').notEmpty();
    req.checkBody('password2','password do not match').equals(password);
  
    var errors=req.validationErrors();
    if(errors)
    { console.log(errors);
        res.render('err_valid',{
      errors: errors
    });
      console.log('errors in validation');
      
    }
    else{
      Student.getUserByID(email,function(err, user){
        if(err) throw err;
        if(user){
            console.log("Already Registered");
            if(user.status=="pending")
            res.end('<h1>Already Registered but email is not verified</h1>');
            else
            res.end('<h1>Already Registered and email is verified</h1>');
            return;
        }
        else{
          var random=Math.floor((Math.random() * 100) + 54);
      var newUser=new Student({
        name: name,//LHS should be same as that of attribute name in DB file and DB
        id: id,
        dep: dep,
        gender: gender,
        Cdate:cdate,
        Batch:batch,
        emailid: email,
        mobileno: Mobile,
        password: password,
        rand:random,
        status:"pending"
      }); 
    Student.createUser(newUser,function(err,user){
      if(err) throw err;
      console.log(user);
     
        host=req.get('host');
        link="http://"+req.get('host')+"/Student/verify?rand="+random+"&id="+newUser._id;
        mailOptions={
            to : user.emailid,
            subject : "Please confirm your Email account",
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
                console.log(error);
            res.end("error");
         }else{
                console.log("Message sent: " + response.message);
            res.end("sent");
             }
    });



    });
    console.log('success','you are now registered and can login');
    req.flash('success','you are now registered and can login');
    //sess.user=newUser._id;
    //sess.email=email;
    //sess.type="Student";
  res.redirect('/');
}
});
    }
  }
  else{
    res.end('someone already logged in');
  }
});
/*router.get('/send', function(req, res, next) {
  rand=Math.floor((Math.random() * 100) + 54);
  var id={ _id:sess.user };
  //console.log('id is '+sess.user.id);
  var newvalues = {$set: 
    { rand:rand
    }};
  
Student.updateuser(id,newvalues,function(err){
   if(err) throw err;
 else
 {
   console.log(' random variable added');
   //res.redirect('/updated')
 }
});

    host=req.get('host');
    link="http://"+req.get('host')+"/Student/verify?rand="+rand+"&id="+sess.user;
    //link="https://www.google.com/"
    mailOptions={
        to : req.session.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});*/
router.get('/verify',function(req,res){
  console.log(req.protocol+"://"+req.get('host'));
console.log('id is '+req.query.id);
  if((req.protocol+"://"+req.get('host'))==("http://"+host))
  {
      console.log("Domain is matched. Information is from Authentic email");
      //console.log("random no is " +sess.user.rand);  
      Student.getinfobyID(req.query.id,function(err, user){
        if(err) throw err;
        if(!user){
            console.log("unknown user");
            res.redirect('/faculty/unknw');
            return;
        }
  
      
        console.log('value of random is '+user.rand);
      if(req.query.rand== user.rand)
      {
          console.log("email is verified");
          res.end("<h1>Email "+user.emailid+" is been Successfully verified");
        var id={_id:user._id}
          var newvalues={$set:
        {
           status:"verified"
        }};
        Student.updateuser(id,newvalues,function(err){
           if(err) throw err;
        });
        }
      else
      {
          console.log("email is not verified");
          res.end("<h1>Bad Request</h1>");
      }});
  }
  else
  {
      res.end("<h1>Request is from unknown source");
  }
  });
  



/* author : Ankit Sharma
date: 31/10/2018 */

   router.get('/grievance_type',requireLogin,function(req,res,next){
    console.log('hiitype'); 
    console.log(req.session.email)
      //console.log(req.query.id)
        Grvtype.grvtype_find(function(err,result)
    {
        if(err) throw err;
        console.log(result);
      
    res.send(result);
    //)
        }
    
    );
    });

module.exports = router;