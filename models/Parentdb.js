var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;
//var db = mongoose.connection;

var ParentSchema = mongoose.Schema({
    
    
    relation:{
        type:String
    },
    mobileno:{
        type:String
    },
    rand:{
        type:Number
    },
    status:{
     type:String
    },
    Cdate:{
   type:String
    },
    password: {
        type: String
    },
    emailid: {
        type: String
    },
    name: {
        type: String
    }
   
});

var Parent = module.exports = mongoose.model('Parent',ParentSchema,'Parent');




/*module.exports.getUserById = function(id, callback){
    Faculty.findById(id, callback);
}*/

module.exports.getUserByID = function(id, callback){
    var query = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};
    Parent.findOne(query, callback);
}
module.exports.getinfobyID = function(id, callback){
    //var query = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};
  var query={_id:id};
    Parent.findOne(query, callback);
}
module.exports.updateuser = function(id,newvalues, callback){
   // var query = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};
  // var query={_id:id}
   Parent.updateOne(id, newvalues,callback);
}
module.exports.update_password = function(id,password, callback){
    //var query = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
   //var query={_id:id};
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
               var query={password:hash};
            Parent.updateOne(id, query,callback);
        });
    });
   
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}
Parent.apprv_find=function(query,callback)
{
   //var query1={approval:query12};
  // var query2={status:'verified'};    
   // Parent.find({$and:[{status:'verified'},{approval:query}]},callback);
   Parent.find({status:query},callback);
}
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
    
}
