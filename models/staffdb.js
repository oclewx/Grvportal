var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;
//var db = mongoose.connection;

var StaffSchema = mongoose.Schema({
    emailid: {
        type: String,
        index: true
    },
    rand:{
type:Number
    },
    status:{
     type:String
    },
    gender:{
        type: String,
    },
    dep:{
      type: String
    },
    Desig:{
        type:String
    },
    mobileno:{
        type:String
    },

    password: {
        type: String
    },
    id: {
        type: String
    },
    name: {
        type: String
    }
});

var Staff = module.exports = mongoose.model('Staff',StaffSchema,'Staff');


 

module.exports.getUserByID = function(id, callback){
    var query = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};
;
    Staff.findOne(query, callback);
}
module.exports.updateuser = function(id,newvalues, callback){
    // var query = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};
    //var query={_id:id}; 
    Staff.updateOne(id, newvalues,callback);
 }

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}
Staff.apprv_find=function(query,callback)
{
   //var query1={approval:query12};
  // var query2={status:'verified'};    
    //Staff.find({$and:[{status:'verified'},{approval:query}]},callback);
    Staff.find({status:query},callback);
}
module.exports.getinfobyID = function(id, callback){
   // var query = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};
   var query={_id:id}; 
   Staff.findOne(query, callback);
}
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
    
}
