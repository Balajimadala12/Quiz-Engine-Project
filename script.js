const questions = [

{question:"Which HTML tag is used to create a hyperlink?",answers:["&lt;a&gt;","&lt;link&gt;","&lt;href&gt;","&lt;hyper&gt;"],correct:0},
{question:"Which HTML tag defines an unordered list?",answers:["&lt;ul&gt;","&lt;ol&gt;","&lt;li&gt;","&lt;list&gt;"],correct:0},
{question:"Which HTML tag is used to insert an image?",answers:["&lt;image&gt;","&lt;img&gt;","&lt;pic&gt;","&lt;photo&gt;"],correct:1},
{question:"Which attribute specifies the URL of a link?",answers:["src","href","link","url"],correct:1},
{question:"Which tag defines the largest heading?",answers:["&lt;h6&gt;","&lt;h3&gt;","&lt;h1&gt;","&lt;heading&gt;"],correct:2},

{question:"Which CSS property changes text color?",answers:["font-color","text-style","color","background"],correct:2},
{question:"Which CSS property controls text size?",answers:["text-size","font-style","font-size","text-style"],correct:2},
{question:"Which CSS property changes background color?",answers:["background-color","bgcolor","color","background-style"],correct:0},
{question:"Which CSS property creates space inside element?",answers:["margin","padding","border","spacing"],correct:1},
{question:"Which CSS property controls layout?",answers:["display","layout","align","position"],correct:0},

{question:"Which symbol represents comment in JavaScript?",answers:["//","&lt;!-- --&gt;","#","**"],correct:0},
{question:"Which keyword declares variable?",answers:["var","int","string","define"],correct:0},
{question:"Which method prints in console?",answers:["console.write()","console.log()","print()","console.print()"],correct:1},
{question:"Which event occurs on click?",answers:["onclick","onhover","onmouse","onchange"],correct:0},
{question:"Which function shows alert box?",answers:["alert()","msg()","prompt()","show()"],correct:0},

{question:"Which HTML tag creates table row?",answers:["&lt;tr&gt;","&lt;td&gt;","&lt;row&gt;","&lt;th&gt;"],correct:0},
{question:"Which HTML tag creates table cell?",answers:["&lt;td&gt;","&lt;tr&gt;","&lt;th&gt;","&lt;cell&gt;"],correct:0},
{question:"Which CSS property makes text bold?",answers:["font-weight","text-bold","font-style","bold"],correct:0},
{question:"Which CSS property centers text?",answers:["text-align:center","align:center","text:center","center-text"],correct:0},
{question:"Which JS method selects element by ID?",answers:["getElement()","getElementById()","selectId()","queryId()"],correct:1},

{question:"Which HTML attribute provides image description?",answers:["alt","title","src","name"],correct:0},
{question:"Which CSS property adds shadow to text?",answers:["text-shadow","shadow-text","font-shadow","text-style"],correct:0},
{question:"Which keyword defines constant variable?",answers:["var","let","const","constant"],correct:2},
{question:"Which HTML tag creates a form?",answers:["&lt;form&gt;","&lt;input&gt;","&lt;fieldset&gt;","&lt;label&gt;"],correct:0},
{question:"Which JS function converts string to integer?",answers:["parseInt()","toInteger()","stringInt()","NumberInt()"],correct:0}

];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let userName = "";

let userAnswers = new Array(questions.length).fill(null);

function startQuiz(){

userName=document.getElementById("username").value;
VTUNo=document.getElementById("VTUNo").value;

if(userName===""){
alert("Please enter your name");
return;
}

if(VTUNo===""){
alert("Please enter your Vtu no");
return;
}

document.getElementById("startBox").style.display="none";
document.getElementById("quizBox").style.display="block";

loadQuestion();

}

function loadQuestion(){

clearInterval(timer);

timeLeft=30;
document.getElementById("timer").innerText=timeLeft;

let progress=(currentQuestion/questions.length)*100;
document.getElementById("progressBar").style.width=progress+"%";

timer=setInterval(()=>{

timeLeft--;
document.getElementById("timer").innerText=timeLeft;

if(timeLeft===0){
nextQuestion();
}

},1000);

let q=questions[currentQuestion];

document.getElementById("questionNumber").innerText=
"Question "+(currentQuestion+1)+" / "+questions.length;

document.getElementById("question").innerText=q.question;

let answersHTML="";

q.answers.forEach((answer,index)=>{

let selected = userAnswers[currentQuestion] === index 
? "style='background:#4CAF50;color:white'" : "";

answersHTML+=`<button ${selected} onclick="selectAnswer(${index})">${answer}</button>`;

});

document.getElementById("answers").innerHTML=answersHTML;

if(currentQuestion === 0){
document.getElementById("backBtn").disabled = true;
}else{
document.getElementById("backBtn").disabled = false;
}

if(currentQuestion === questions.length - 1){
document.getElementById("nextBtn").innerText = "Finish Quiz";
}else{
document.getElementById("nextBtn").innerText = "Next ➡";
}

}

function selectAnswer(index){
userAnswers[currentQuestion] = index;
}

function nextQuestion(){

if(userAnswers[currentQuestion] === null){
alert("Please select an answer");
return;
}

currentQuestion++;

if(currentQuestion < questions.length){

loadQuestion();

}else{

clearInterval(timer);

document.getElementById("quizBox").style.display="none";
document.getElementById("resultBox").style.display="block";

calculateScore();

}

}

function previousQuestion(){

if(currentQuestion > 0){
currentQuestion--;
loadQuestion();
}

}

async function calculateScore(){

score = 0;

userAnswers.forEach((ans,i)=>{
if(ans === questions[i].correct){
score++;
}
});

let percentage=(score/questions.length)*100;

let resultText=userName+" scored "+score+" / "+questions.length+
" ("+percentage.toFixed(1)+"%)";

if(percentage>=50){
resultText+=" - PASS 🎉";
}else{
resultText+=" - FAIL";
}

document.getElementById("score").innerText=resultText;

/* SAVE RESULT TO FIREBASE */

try{

await addDoc(collection(db,"quizResults"),{
name:userName,
score:score,
total:questions.length,
percentage:percentage.toFixed(1),
date:new Date().toLocaleString()
});

console.log("Result saved");

}catch(error){

console.error("Error saving result",error);

}

}

function downloadCertificate(){

const { jsPDF } = window.jspdf;

const doc = new jsPDF("landscape");

const pageWidth = doc.internal.pageSize.width;
const pageHeight = doc.internal.pageSize.height;

// ===== Certificate Border =====
doc.setDrawColor(0,102,204);
doc.setLineWidth(4);
doc.rect(10,10,pageWidth-20,pageHeight-20);

doc.setLineWidth(1);
doc.rect(15,15,pageWidth-30,pageHeight-30);

// ===== Vel Tech Logo =====
doc.addImage("VelTech.png","PNG",20,18,35,20);

// ===== University Name =====
doc.setFont("Times","Bold");
doc.setFontSize(20);

doc.text(
"Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology",
pageWidth/2,
40,
{align:"center"}
);

// ===== School =====
doc.setFont("Times","Normal");
doc.setFontSize(16);

doc.text(
"School of Computing",
pageWidth/2,
52,
{align:"center"}
);

// ===== Department =====
doc.text(
"Department of Computer Science and Engineering",
pageWidth/2,
60,
{align:"center"}
);

// ===== Certificate Title =====
doc.setFont("Times","Bold");
doc.setFontSize(30);

doc.text(
"CERTIFICATE OF ACHIEVEMENT",
pageWidth/2,
78,
{align:"center"}
);

// ===== Presented Text =====
doc.setFont("Times","Normal");
doc.setFontSize(16);

doc.text(
"This certificate is proudly presented to",
pageWidth/2,
92,
{align:"center"}
);

// ===== Student Name =====
doc.setFont("Times","Bold");
doc.setFontSize(32);
doc.setTextColor(0,102,204);

doc.text(
userName.toUpperCase(),
pageWidth/2,
110,
{align:"center"}
);

// ===== VTU Number =====
doc.setTextColor(0,0,0);
doc.setFontSize(16);

doc.text(
"VTU No: " + VTUNo,
pageWidth/2,
124,
{align:"center"}
);

// ===== Description =====
doc.text(
"For successfully completing the Dynamic HTML Quiz Assessment",
pageWidth/2,
142,
{align:"center"}
);

// ===== Score =====
doc.setFontSize(14);

doc.text(
"Score: "+score+" / "+questions.length,
pageWidth/2,
158,
{align:"center"}
);

// ===== Date =====
doc.text(
"Date: "+new Date().toLocaleDateString(),
pageWidth/2,
170,
{align:"center"}
);

// ===== Signature Line =====
doc.line(pageWidth-90,170,pageWidth-30,170);

// ===== Signature Name =====
doc.setFont("Times","Italic");
doc.setFontSize(18);

doc.text(
"Dr. S. Hemamalini",
pageWidth-60,
165,
{align:"center"}
);

// ===== Qualification =====
doc.setFont("Times","Normal");
doc.setFontSize(12);

doc.text(
"M.E., Ph.D",
pageWidth-60,
178,
{align:"center"}
);

// ===== Designation =====
doc.text(
"Assistant Professor - Senior Grade",
pageWidth-60,
186,
{align:"center"}
);

// ===== Authorized Signatory =====
doc.text(
"Authorized Signatory",
pageWidth-60,
194,
{align:"center"}
);

// ===== Save PDF =====
doc.save("Quiz-Certificate.pdf");

}