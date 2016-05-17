var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
var gradesSchema =  new Schema({
 	courseName:String,
 	year:Number,
 	grade:Number
},{collection:'students'});
*/
var studentsSchema = new Schema({
 firstName:{type:String,required:true},
 lastName:{type:String,required:true},
 studentId:{type:Number,index:1,required:true,unigue:true},
 courses: [{ 	courseName:String,
 	year:Number,
 	grade:Number }]
},{collection:'students'});
//console.log("require paths:"+ gradesSchema.requiredPaths());
//console.log("indexes:"+ JSON.stringify(gradesSchema.indexes()));
//var Grades = mongoose.model('Grades',gradesSchema);
var Studnets = mongoose.model('Studnets',studentsSchema);
module.exports  = Studnets;
//module.exports = Grades;