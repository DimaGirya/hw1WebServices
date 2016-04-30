var http = require('http');
var express = require('express');
var app = express();
var gradesJson = require('./grades.json');


app.get('/',function(req,res){
	  res.sendfile('./API.html');
});

app.get('/getAllStudent',function(req,res){
	res.status(200).json(gradesJson);
});

app.get('/getStudendGrade/:studentId',function(req,res){
	var studentId = parseInt(req.params.studentId,10);
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
	res.status(status).send(message);

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
			message.push(student);
		 }
		}
	}
	if(flag == false){
		message =  {"message":"no such student found"};
	}
		res.status(status).send(message);
});

app.get('*', function(req, res){
	var message =  {"message":"Bad Request, no such function"};
  res.send(message, 400);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

function calculateAverage(student){
		var coursesArray = student.courses;
		var coursesArraySize = coursesArray.length;
		var gradeSum = 0; 
		for(var i = 0;i < coursesArraySize;i++ ){
				gradeSum+= coursesArray[i].grade;
		}
		return gradeSum/coursesArraySize;
}