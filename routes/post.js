var express = require('express');
var router = express.Router();
var multer  = require('multer');
var uploads=multer({dest:'./uploads'});
var uniqid=require('uniqid');
var expressValidator=require('express-validator');
var Grv=require('../models/grievancedb');
var bodyParser = require("body-Parser");
var datetime = require('node-datetime');
var dt = datetime.create();
var formatted = dt.format('d/m/Y H:M:S');

var app = express();
router.get('/grv_action',function(req,res,next){

    
    var id={grv_id:req.body.id}
    var newvalues = {$set: 
        {
          //reply:req.body.reply,
          status:'viewed',
          //action:'replied'
        }};

    Grv.update_grv(id,newvalues,function(err,isUpdate){
        if(err) throw err;
      else
      {
        console.log(' successfuly update ');
        res.redirect('/Members/Home')
      }
     });

})

router.get('/Grievances',function(req,res,next){
console.log('hii'); 
  //console.log(req.query.id)
    Grv.grv_find(function(err,result)
{
    if(err) throw err;
   // console.log(result);
    res.render('post2',{
    result:result
})
    }

);
});
/*
router.get('/Grievances_user',function(req,res,next){
    console.log('hii'); 
    console.log(req.session.email)
      //console.log(req.query.id)
        Grv.grv_findbyuser(req.session.email,function(err,result)
    {
        if(err) throw err;
        console.log(result);
        res.render('grievances',{
        result:result
    })
        }
    
    );
    });*/

    router.post('/reply',uploads.single('file'), function(req, res, next) {

        var id={grv_id:req.body.id}
console.log(req.body.id)
        var newvalues = {$set: 
            {
              reply:req.body.reply,
              status:'disposed'   
                     }};

        Grv.update_grv(id,newvalues,function(err,isUpdate){
            if(err) throw err;
          else
          {
            console.log(' successfuly update ');
            res.redirect('/Members/Grievances')
          }
         });

    })
router.post('/complaint',uploads.single('file'), function(req, res, next) {
    sess=req.session;
var comp=req.body.grv;
var type=req.body.type;
var sub=req.body.subject;
var file=req.file;
var utype=req.body.usertype;
var gseq=type.substr(0,type.indexOf('&'));
var gtype=type.substr(type.indexOf('&')+1);

//req.checkBody('comp1','complaint field is required').notEmpty();
//req.checkBody('sub','subject  is required').notEmpty();
if(!req.file)
{
    file='no file';
}
else{
    file=file.filename
}
req.checkBody('type','type field is required').notEmpty();

var errors=req.validationErrors();
if(errors)
{ console.log(errors);
    res.render('err_valid',{
  errors: errors
});
  console.log('errors in validation');
  
}
else{
var doc=new Grv({
    grv_id:uniqid(), //generates a unique id for each grievance 
    time:new Date(dt.now()), // add time of post
    Utype:utype, //req.query.type, // user type ex. Parent,Student etc.
    Gtype:gtype, // Grievance type
    gseq:gseq, // grievance sequence no.
    subject:sub, //Subject of grievance
    Grv:comp, // Grievance posted
    Grievant:sess.email,
    status:'pending', // Status of Grv. pending/viewed/disposed
    file:file //any Doc. to be uploaded

});
Grv.grv_post(doc,function(err,doc){
    if(err) throw err;
    console.log(doc);
    //res.end('complaint posted');
    console.log('Grievance Posted');
      res.redirect('/'+utype+'/Home');
});
}

});


module.exports = router;