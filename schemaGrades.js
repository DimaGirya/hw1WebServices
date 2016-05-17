var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentsSchema = new Schema({
 firstName:{type:String,required:true},
 lastName:{type:String,required:true},
 studentId:{type:Number,index:1,required:true,unigue:true},
 courses: [{ 	courseName:String,
 	year:Number,
 	grade:Number }]
},{collection:'students'});

var Studnets = mongoose.model('Studnets',studentsSchema);
module.exports  = Studnets;
