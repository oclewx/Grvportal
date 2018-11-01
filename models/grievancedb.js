var mongoose = require('mongoose');
mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;

var GrievanceSchema = mongoose.Schema({
Grv:{
    type:String
},
Gtype:{
    type:String
},
gseq:{
    type:Number
},
subject:{
    type:String
},
file:{
type:String
},
Utype:{
    type:String
},
Grievant:{
type:String
},
grv_id:{
    type:String,
},
time:{
    type:String
},
status:{
    type:String
},
reply:{
type:String
}


});
var Grv = module.exports = mongoose.model('Grievance',GrievanceSchema,'Grievance');
Grv.grv_post=function(grv_docs,callback)
{
   // Grv.create(grv_docs,callback);
 grv_docs.save(callback);

}
Grv.update_grv=function(id,newvalues,callback)
{
    Grv.updateOne(id, newvalues,callback);
}
Grv.grv_find=function(query,callback)
{
 
    /*Grv.find({$and:[{Gtype:query},{status:{$in:['pending','viewed']}}]},callback);
*/
Grv.find({Gtype:query},null,{sort:{time:-1}},callback);
}
Grv.grv_findbyuser=function(query,callback)
{
console.log(query);
    Grv.find({Grievant:query},null,{sort:{time:-1}},callback);
}


/* author: Ankit Sharma*/
Grv.grv_findformembers=function(query,callback)
{
console.log(query);
    Grv.find({$and:[{gseq: { $in: query} },{status:{$in:['pending','viewed']}}]},callback);
}