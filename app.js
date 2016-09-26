
function creatNav(number) {								//创建列表
	var newtable = document.createElement('table');
	var count = 1;

	newtable.setAttribute('border',1);
	for(var i = 0; i < Math.ceil(number/3); i++) {
		var row = newtable.insertRow(i);
		for(var j = 0; j < 3 && count-1 < number; j++) {
			var cells = row.insertCell(j);recordAnswer(this.name,this.value,$("#question_content").attr("class"))
			cells.innerHTML = count;
			count++;
		}
	}
	document.getElementById('nav').appendChild(newtable);
}

function genRadio(question_obj,i) { 					//创建选项
	var choice_content = document.getElementById('choice_content');
	var radio = $('<input />').attr({type: 'radio', value: i, name: question_obj.correctAnswer, onclick: "recordAnswer(this.name, this.value, $('#question_content').attr('class'))"});
	var text = ' ' + question_obj.choices[i] + '</br>';
	radio.appendTo('#choice_content');
	$('input:last').after(text);
}

function createChoice(question_obj,x) {					//创建问题单
	for(var i = 0; i < question_obj[x].choices.length ; i++) {
		genRadio(question_obj[x],i);
	}
}

function createQuestion(question_obj,x) {				//创建问题
	var question = 'Q: ' + question_obj[x].question;
	$('#question_content')[0].innerHTML = question;
	$('#question_content').attr({class: x});
}

var count_number = 0;
var record_Answer = new Array;
function recordAnswer(answer, choiceVal, x) {			//记录选项
	record_Answer[parseInt(x)] = {correctAnswer: parseInt(answer),
					   newChoice: parseInt(choiceVal)}
	
}														//初始化选项表单
function start() {
	for(var i = 0; i < realQuestion.length; i++) {
		record_Answer[i] = {correctAnswer: -1,
					   newChoice: -2}
	}
}

function matchAnswer(answer_array) {					//计算分数
	for(var i = 0; i < answer_array.length; i++) {
		if(answer_array[i].correctAnswer == answer_array[i].newChoice) {
		count_number = count_number+1;
		}
	}
}

function nextQuestion(question_obj) {					//next键点击
	var x = parseInt($('#question_content').attr('class'));
	if(question_obj[x+1]) {
		$('#choice_content')[0].innerHTML = "";
		createQuestion(question_obj, x+1);
		createChoice(question_obj, x+1);
	}
	else {
		matchAnswer(record_Answer);
		document.write('<div>score:' +count_number+ '</div>');
	}
}

function selectQuestion() {

}

var realQuestion =  new Array;
realQuestion = [{question: "Who is Prime Minister of the United Kingdom?", choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:0},
{question: "Which is the link between the living and non-living?", choices: ["Bacteria", "Viruses", "Plankton", "none of these"], correctAnswer:1},
{question: "Commonly used spice clove is obtained from which part of the plant?", choices:["Root", "Stem", "Flower bud", "Fruit"], correctAnswer:2},
{question: "Which one of the following is not a stem modification?", choices: ["Arrowroot", "Garlic", "Ginger", "Lotus", "Sweet patato", "None of these"], correctAnswer:4},
{question: "Which of the following animals can bring oxygen directly to the cell?", choices: ["Spider", "Insect", "Flat worm", "Scorpion"], correctAnswer:1}
];

creatNav(realQuestion.length);
createQuestion(realQuestion, 0);
createChoice(realQuestion, 0);
start();