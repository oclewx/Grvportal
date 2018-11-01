var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;
//var db = mongoose.connection;

var FacultySchema = mongoose.Schema({
    id: {
        type: String,
        index: true
    },
    rand:{
        type: Number
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
    emailid: {
        type: String
    },
    name: {
        type: String
    }
   
});

var Faculty = module.exports = mongoose.model('Faculty',FacultySchema,'Faculty');




/*module.exports.getUserById = function(id, callback){
    Faculty.findById(id, callback);
}*/
Faculty.apprv_find=function(query,callback)
{
   //var query1={approval:query12};
  // var query2={status:'verified'};    
   // Faculty.find({$and:[{status:'verified'},{approval:query}]},callback);
   Faculty.find({status:query},callback);
}
module.exports.getUserByID = function(id, callback){
    var query = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
    Faculty.findOne(query, callback);
}
module.exports.updateuser = function(id,newvalues, callback){
    // var query = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};
    //var query={_id:id};
    Faculty.updateOne(id, newvalues,callback);
 }


module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}

module.exports.getinfobyID = function(id, callback){ //will return  user using "oid"
    //var query = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};
    var query={_id:id};
    Faculty.findOne(query, callback);
}
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
    
}
