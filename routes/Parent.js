var express = require('express');
var router = express.Router();
var expressValidator=require('express-validator');
var Parent=require('../models/Parentdb')
var Grv=require('../models/grievancedb');
var bodyParser = require("body-Parser");
var nodemailer = require("nodemailer");
console.log('sucessful');
var app = express();

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  //secure: false,
  auth: {
      user: "gportal33@gmail.com",
      pass: "grievance001"
  }
});
var rand,mailOptions,host,link;

host='localhost:3000';
function requireLogin(req, res, next) {
  console.log(req.session.active)
    if (req.session.active==1&&req.session.type=='Parent') { /*if someone is logged in as Parent*/ 
      next(); // allow the next route to run                   
    } else {
      // require the user to log in
      res.redirect('/'); // or render a form, etc.
    }
  }
  
  router.get('/dashboard',requireLogin, function(req, res, next) {
 sess=req.session;
 Parent.getinfobyID(sess.user,function(err, user){
  if(err) throw err;
  if(!user){
      console.log("unknown user");
      res.redirect('/unknw');
      return;
  }
     var data={title:'Parent',
    name: user.name,
    rel:user.relation,
    cdate:user.Cdate,
    mobile:user.mobileno,
    email:user.emailid,
}
     res.send(data); 

    }); 
 });

 router.post('/password_reset',function(req,res,next){
  var cpass=req.body.current_password;
  var  npass=req.body.new_password;
  var npass2=req.body.new_password1;
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

Parent.getinfobyID(req.session.user,function(err, user){
  if(err) throw err;
  if(!user){
      console.log("unknown user");
      res.redirect('/faculty/unknw');
      return;
  }

        Parent.comparePassword(cpass, user.password, function(err, isMatch){
            if(err) throw err;
              if(isMatch){

                  var id={ _id:sess.user };
                  //console.log('id is '+sess.user.id);
                  
                Parent.update_password(id,npass,function(err){
                   if(err) throw err;
                 else
                 {
                   console.log(' password updated');
                   //res.redirect('/Student/Home')
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

router.get('/My_Grievances',requireLogin,function(req,res,next){
  console.log('hii'); 
  console.log(req.session.email)
    //console.log(req.query.id)
      Grv.grv_findbyuser(req.session.email,function(err,result)
  {
      if(err) throw err;
      console.log(result);
      //res.render('grievances',{
      var data={
        info:result
      }
      //console.log(result1);
      res.send(data);
}
  
  );
  });
router.get('/Home',requireLogin, function(req, res, next) {
  res.render('Pdash',{title:'Parent'});
});
router.get('/sahil',requireLogin, function(req, res, next) {
  //res.render('Pdash',{title:'Parent'});
var data="sahil"
  res.send(data);
});
router.post('/bafna',requireLogin, function(req, res, next) {
  //res.render('Pdash',{title:'Parent'});
console.log(req.body.name +" "+ req.body.relation)
});
router.get('/complaint',requireLogin ,function(req, res, next) {
  res.render('post',{title:'Parent'});
});

  router.get('/err_valid', requireLogin,function(req, res, next) {
    res.render('err_valid',{title:'Faculty_Login'});
  });
  router.get('/update',requireLogin, function(req, res, next) {
    res.render('pupdt',{title:'Parent '});
  });
  //var sess;
  router.post('/login',function(req,res,next){
    sess=req.session;
    if(!sess.user)
    {
    var id=req.body.id;
    var password=req.body.password;
  
    Parent.getUserByID(id,function(err, user){
      if(err) throw err;
      if(!user){
          console.log("unknown user");
          res.redirect('/unknw');
          return;
      }
      if(user.status=='approved')
     {
      Parent.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
        console.log('login successful');         
        if(user.status=='verified')
           {sess.ver=1;
           }
           else
           {
             sess.ver=0;
             sess.email=user.emailid;
          }
          sess.user=user._id;
          sess.type="Parent";
          sess.email=user.emailid;
          sess.active=1;
          res.redirect('/Parent/Home');
        }
        else{
          console.log('invalid password');
          res.redirect('/pass');
          return;
        }
      })}
      else{
        console('user not approved by admin')
        res.redirect('/')
      }

     });
    }
    else{
      res.end('someone already logged in');
    }
    });
  
  router.post('/update',function(req,res,next){
    
   var id={ _id:sess.user};
    var newvalues = {$set: 
      {
        emailid:req.body.email,
        mobileno:req.body.mobile,   
       } 
  
  };

  Parent.updateuser(id,newvalues,function(err,isUpdate){
     if(err) throw err;
   else
   {
     console.log(' successfuly update ');
     res.redirect('/Parent/Home#!/my-account');
   }
  });

  });

    router.post('/register', function(req, res, next) {
      sess=req.session;
      if(!sess.user){
    var name=req.body.name;//LHS should be same as that of attribute name in DB file and DB
    var email=req.body.email;
    var relation=req.body.relation;
    var cdate=req.body.cdate;
    var Mobile=req.body.Mobile;
    var password=req.body.password;
    var password2=req.body.password2;
    req.checkBody('name','Name field is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('relation','relation field is required').notEmpty();
    req.checkBody('cdate','course completion date field is required').notEmpty();
    req.checkBody('Mobile','mobile no. field is required').notEmpty();
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
      Parent.getUserByID(email,function(err, user){
        if(err) throw err;
        if(user){
            console.log("Already Registered");
            res.redirect('/al');
            return;
        }
        else{
          var random=Math.floor((Math.random() * 100) + 54);
      var newUser=new Parent({
        name: name,
        Cdate:cdate,
        relation:relation,
        emailid: email,
        mobileno: Mobile,
        password: password,
        rand:random,
        status:"pending"
      });
      Parent.createUser(newUser,function(err,user){
      if(err) throw err;
      console.log(user);
      
      host=req.get('host');
      link="http://"+req.get('host')+"/Parent/verify?rand="+random+"&id="+newUser._id;
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
  res.redirect('/');

  }
});
}} else{
  res.end('someone already logged in');
}
});



/*router.get('/send', function(req, res, next) {
  rand=Math.floor((Math.random() * 100) + 54);
  var id={ _id:sess.user };
  var newvalues = {$set: 
    { rand:rand  //adding random variable in user DB
    }};
  
Parent.updateuser(id,newvalues,function(err){
   if(err) throw err;
 else
 {
   console.log(' random variable added');
   //res.redirect('/updated')
 }
});

    host=req.get('host');
    link="http://"+req.get('host')+"/Parent/verify?rand="+rand+"&id="+sess.user;
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
      Parent.getinfobyID(req.query.id,function(err, user){//finding user by Oid
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
           status:"verified"  //updating status of user
        }};
        Parent.updateuser(id,newvalues,function(err){
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
  


module.exports = router;