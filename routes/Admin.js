var express = require('express');
var router = express.Router();
var expressValidator=require('express-validator');
var admin=require('../models/Admindb')
var cell=require('../models/Membersdb');
var generator = require('generate-password');
var Student=require('../models/Studentdb');
var Parent=require('../models/Parentdb');
var faculty=require('../models/facultydb');
var Staff=require('../models/staffdb');
var mngmnt =require('../models/mngmntdb');
var Grvtype=require('../models/grvtypedb');
var bodyParser = require("body-Parser");
var session = require('express-session');

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  //secure: false,
  auth: {
      user: "gportal33@gmail.com",
      pass: "grievance001"
  }
});
var mailOptions;
function requireLogin(req, res, next) {
  console.log(req.session.active)
    if (req.session.active==1&&req.session.type=='Admin') { /*if someone is logged in as cell member*/ 
      next(); // allow the next route to run                   
    } else {
      // require the user to log in
      res.redirect('/'); // or render a form, etc.
    }
  }
console.log('sucessful');
var app = express();
var sess;
  router.get('/Home',requireLogin, function(req, res, next) {
    res.render('Home2',{title:'Admin_Login'});
  });
  router.get('/unknw', function(req, res, next) {
    res.render('unknw');
  });
  router.get('/pass', function(req, res, next) {
    res.render('pass');
  });
  router.get('/create',requireLogin ,function(req, res, next) {
    var sess=req.session;
    if(sess.user)
    res.render('create_cell');
    else
    res.render('view');
  });

router.get('/approve',requireLogin,function(req,res,next){
  //var x=req.query.status;
  if(req.query.type=='Student')
{
  Student.apprv_find(req.query.status,function(err,users){
  if(err) throw err;
res.render('post1',{
  result:users,
  type:req.query.status,
  user:req.query.type
});
  //res.end('fetched complete');
})
}
else if(req.query.type=='Parent')
{
  Parent.apprv_find(req.query.status,function(err,users){
  if(err) throw err;
res.render('post1',{
  result:users,
  type:req.query.status,
  user:req.query.type
});
  //res.end('fetched complete');
})
}
else if(req.query.type=='staff')
{
  Staff.apprv_find(req.query.status,function(err,users){
  if(err) throw err;
   res.render('post1',{
    result:users,
    type:req.query.status,
    user:req.query.type
   }); 
  })
}
else if(req.query.type=='faculty')
{
  faculty.apprv_find(req.query.status,function(err,users){
  if(err) throw err;
res.render('post1',{
  result:users,
  type:req.query.status,
  user:req.query.type
});
  //res.end('fetched complete');
})
}

});

router.get('/existing_request',requireLogin,function(req,res,next){
  console.log(req.query.email);
  console.log(req.query.status);
  console.log(req.query.user);
  if(req.query.status==1)//all those who are rejected
  { console.log('in approved');
   if(req.query.user=='Student')
   {
    var id={emailid:req.query.email};
    var newvalues = {$set: 
      { status:'approved' }};
      
  Student.updateuser(id,newvalues,function(err,isUpdate){
     if(err) throw err;
   else
   {
     console.log(' successfuly update ');
     res.redirect('/Admin/Home');
     //res.redirect('/Parent/dashboard')
   }
  
  }); 
   }
   else if(req.query.user=='Parent')
   {
    var id={ emailid:req.query.email};
    var newvalues = {$set: 
      { status:'approved' }};
  
  Parent.updateuser(id,newvalues,function(err,isUpdate){
     if(err) throw err;
   else
   {
     console.log(' successfuly update ');
     res.redirect('/Admin/Home')
   }
  });
  
   }
   else if(req.query.user=='staff')
   {
    var id={ emailid:req.query.email};
    var newvalues = {$set: 
      { status:'approved' }};
      
  Staff.updateuser(id,newvalues,function(err,isUpdate){
     if(err) throw err;
   else
   {
     console.log(' successfuly update ');
     res.redirect('/Admin/Home');
     //res.redirect('/Parent/dashboard')
   }
  });
   }
   else if(req.query.user=='faculty')
   {
    var id={ emailid:req.query.email};
    var newvalues = {$set: 
      { status:'approved' }};
      
  faculty.updateuser(id,newvalues,function(err,isUpdate){
     if(err) throw err;
   else
   {
     console.log(' successfuly update ');
     res.redirect('/Admin/Home');
     //res.redirect('/Parent/dashboard')
   }
  });
   }
  }
  else{   //all those who are approved
    console.log('in rejected');
    if(req.query.user=='Student')
    {
     var id={ emailid:req.query.email};
     var newvalues = {$set: 
       { status:'rejected' }};
       
   Student.updateuser(id,newvalues,function(err,isUpdate){
      if(err) throw err;
    else
    {
      console.log(' successfuly update ');
      res.redirect('/Admin/Home');
      //res.redirect('/Parent/dashboard')
    }
   
   }); 
    }
    else if(req.query.user=='Parent')
    {
     var id={ emailid:req.query.email};
     var newvalues = {$set: 
       { status:'rejected' }};
   
   Parent.updateuser(id,newvalues,function(err,isUpdate){
      if(err) throw err;
    else
    {
      console.log(' successfuly update ');
      res.redirect('/Admin/Home');
      //res.redirect('/Parent/dashboard')
    }
   });
   
    }
    else if(req.query.user=='staff')
    {
     var id={ emailid:req.query.email};
     var newvalues = {$set: 
       { status:'rejected' }};
       
   Staff.updateuser(id,newvalues,function(err,isUpdate){
      if(err) throw err;
    else
    {
      console.log(' successfuly update ');
      res.redirect('/Admin/Home');
      //res.redirect('/Parent/dashboard')
    }
   });
    }
    else if(req.query.user=='faculty')
    {
     var id={ emailid:req.query.email};
     var newvalues = {$set: 
       { status:'rejected' }};
       
   faculty.updateuser(id,newvalues,function(err,isUpdate){
      if(err) throw err;
    else
    {
      console.log(' successfuly update ');
      res.redirect('/Admin/Home');
      //res.redirect('/Parent/dashboard')
    }
   });
    }
  }
  

});
router.get('/Pending_user',requireLogin,function(req,res,next){   //Pending approval 
var email=req.query.email;
console.log(req.query.email);
console.log(req.query.status);
console.log(req.query.user);
if(req.query.status==1)
{ console.log('in approved');
 if(req.query.user=='Student')
 {
  var id={emailid:req.query.email};
  var newvalues = {$set: 
    { status:'approved' }};
    
Student.updateuser(id,newvalues,function(err,isUpdate){
   if(err) throw err;
 else
 {
   console.log(' successfuly update ');
   res.redirect('/Admin/Home');
   //res.redirect('/Parent/dashboard')
 }

}); 
 }
 else if(req.query.user=='Parent')
 {
  var id={ emailid:req.query.email};
  var newvalues = {$set: 
    { status:'approved' }};

Parent.updateuser(id,newvalues,function(err,isUpdate){
   if(err) throw err;
 else
 {
   console.log(' successfuly update ');
   res.redirect('/Admin/Home');
 }
});

 }
 else if(req.query.user=='staff')
 {
  var id={ emailid:req.query.email};
  var newvalues = {$set: 
    { status:'approved' }};
    
Staff.updateuser(id,newvalues,function(err,isUpdate){
   if(err) throw err;
 else
 {
   console.log(' successfuly update ');
   res.redirect('/Admin/Home');
   //res.redirect('/Parent/dashboard')
 }
});
 }
 else if(req.query.user=='faculty')
 {
  var id={ emailid:req.query.email};
  var newvalues = {$set: 
    { status:'approved' }};
    
faculty.updateuser(id,newvalues,function(err,isUpdate){
   if(err) throw err;
 else
 {
   console.log(' successfuly update ');
   res.redirect('/Admin/Home');
   //res.redirect('/Parent/dashboard')
 }
});
 }
}
else{
  console.log('in rejected');
  if(req.query.user=='Student')
  {
   var id={ emailid:req.query.email};
   var newvalues = {$set: 
     { status:'rejected' }};
     
 Student.updateuser(id,newvalues,function(err,isUpdate){
    if(err) throw err;
  else
  {
    console.log(' successfuly update ');
    res.redirect('/Admin/Home')
    //res.redirect('/Parent/dashboard')
  }
 
 }); 
  }
  else if(req.query.user=='Parent')
  {
   var id={ emailid:req.query.email};
   var newvalues = {$set: 
     { status:'rejected' }};
 
 Parent.updateuser(id,newvalues,function(err,isUpdate){
    if(err) throw err;
  else
  {
    console.log(' successfuly update ');
    res.redirect('/Admin/Home');
    //res.redirect('/Parent/dashboard')
  }
 });
 
  }
  else if(req.query.user=='staff')
  {
   var id={ emailid:req.query.email};
   var newvalues = {$set: 
     { status:'rejected' }};
     
 Staff.updateuser(id,newvalues,function(err,isUpdate){
    if(err) throw err;
  else
  {
    console.log(' successfuly update ');
    res.redirect('/Admin/Home');
    //res.redirect('/Parent/dashboard')
  }
 });
  }
  else if(req.query.user=='faculty')
  {
   var id={ emailid:req.query.email};
   var newvalues = {$set: 
     { status:'rejected' }};
     
 faculty.updateuser(id,newvalues,function(err,isUpdate){
    if(err) throw err;
  else
  {
    console.log(' successfuly update ');
    res.redirect('/Admin/Home');
    //res.redirect('/Parent/dashboard')
  }
 });
  }
}
});

  router.post('/create',function(req,res,next){

    var name=req.body.name;
   var Des=req.body.Des;
   console.log(req.body.gtype);
   var gtype=req.body.gtype.map(Number);
   var email=req.body.email;
   var mobile=req.body.mobile;
   var password=generator.generate({
    length: 10,
    numbers: true
});

if((req.body.mngmnt)=='on')
{
   var newuser=new mngmnt({
    name:name,
    designation:Des,
    Gtype:gtype,
    emailid:email,
    mobileno:mobile,
    password:password
  });

    console.log("create management");
    mngmnt.createUser(newuser,function(err,user){
      if(err) throw err;
      console.log(user);
      res.end('Managment Member Created');
    });
  }
  else{
    var newuser=new cell({
      name:name,
      designation:Des,
      Gtype:gtype,
      emailid:email,
      mobileno:mobile,
      password:password
    });
  
    console.log('cell created');
  cell.createUser(newuser,function(err,user){
    if(err) throw err;
    console.log(user);
    res.end('Cell Member Created');
  });
  }


  host=req.get('host');
   // link="http://"+req.get('host')+"/Student/verify?rand="+rand+"&id="+sess.user;
    //link="https://www.google.com/"
    mailOptions={
        to :email,
        subject : "Added to Anand Cell ",
        html : "Hello "+name+", <br><br>Greetings from Anand International College of Engineering Online Grievance Redressal Portal!<br><br>You have been added as Cell Member to the Grievance Redressal Portal of Anand International College of Engineering<br><br>You can login with your email Id or mobile number as username and "+password+ " as password to access the posts and updates.<br><br>Thanks and Regards<br><br>Admin-Grievance Redressal Portal<br><br><h1>Anand International College of Engineering</h1><br>" 
    }
    //console.log(mailOptions);
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
  router.post('/login',function(req,res,next){
sess=req.session;
if(!sess.user){
    var id=req.body.id;
    var password=req.body.password;
  
  
    admin.getUserByID(id,function(err, user){
      if(err) throw err;
      if(!user){
          console.log("unknown user");
          res.redirect('/Admin/unknw');
          return;
      }
      admin.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
           console.log('login successful');    
           sess.user=user._id;
           sess.type='Admin';
           sess.active=1;
           res.redirect('/Admin/Home');
          
        }
        else{
          console.log('invalid password');
          res.redirect('/Admin/pass');
          return;
        }
      })
     // sess.user=user._id;
      //sess.type='Admin';
      //sess.active=1;
     });
    }
    else{
      res.end('someone already logged in');
    }
    });


// author: Ankit Sharma
//function to add new grievance type

  router.get('/grvtype_add',requireLogin ,function(req, res, next) {
    var sess=req.session;
    if(sess.user)
    res.render('add_grvtype');
    else
    res.render('view');
  });
router.post('/grvtype_add',requireLogin,function(req,res,next){   
  var grvtype=req.body.grvtype;
  var description=req.body.description;
  var newGrv=new Grvtype({
    grvtype:grvtype,
    description:description,
    active:true
  });
  Grvtype.grvtype_post(newGrv,function(err,grv){
    if(err) throw err;
    else{
      console.log("grievance is added successfuly");
      console.log(grv);
    }
    res.redirect('/Admin/Home');
  });

});


/* author : Ankit Sharma
date: 31/10/2018 */

   router.get('/grievance_type',requireLogin,function(req,res,next){
    console.log('hiitype'); 
 
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