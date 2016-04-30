var http = require('http');
var express = require('express');
var app = express();
var gradesJson = require('./grades.json');
var port = process.env.PORT || 3000;
app.get('/',function(req,res){
	 // res.sendfile('./Api.html');
	  res.sendFile('./Api.html' , { root : __dirname});
});

app.get('/getAllStudent',function(req,res){
	res.json(gradesJson);
});

app.get('/getStudendGrade/:studentId',function(req,res){
	var studentId = parseInt(req.params.studentId,10);
	console.log(typeof studentId);
	console.log("studentId:"+studentId);
	var status = 200;
	var message;
	if(studentId < 0 || Number.isNaN(studentId)){
			status = 400;
			message = {"message":"illegal input"}
	}
	else{
	message = {"message":"student not fount"};
	var sizeArray = gradesJson.students.length;
	for(var i = 0 ; i < sizeArray;i++){
		if(gradesJson.students[i].studenId == studentId){
			 message = gradesJson.students[i];
			 break;
		}
	}
}
	res.status(status);
	res.send(message);
});

app.get('/getAllStudentsAverageBiggerThan/:grade',function(req,res){
	var status = 200;
	var	message = {"message":"illegal input"}
	var gradeInput = parseFloat(req.params.grade,10);
	if(gradeInput > 100 || gradeInput < 0 || Number.isNaN(gradeInput)){
			status = 400;
	}
	else{
	var flag = false;
	message = [];
	var sizeArray = gradesJson.students.length;
	var student;
	for(var i = 0 ; i < sizeArray;i++){
		student = gradesJson.students[i];
		if(calculateAverage(student) > gradeInput){
			flag = true;
			console.log(student);
			message.push(student);
		 }
		}
	}
	if(flag == false){
		message =  {"message":"no such student found"};
	}
	res.status(status);
	res.send(message);
});

app.listen(port);

function calculateAverage(student){
		var coursesArray = student.courses;
		var coursesArraySize = coursesArray.length;
		var gradeSum = 0; 
		for(var i = 0;i < coursesArraySize;i++ ){
				gradeSum+= coursesArray[i].grade;
		}
		console.log(gradeSum/coursesArraySize);
		return gradeSum/coursesArraySize;
}