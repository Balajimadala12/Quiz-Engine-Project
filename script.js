let questionBank = null;
let questionBankPromise = null;

let questions = []; // Dynamic questions array loaded based on subject choice
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let userName = "";
let VTUNo = "";
let slotNo = "";
let semester = "";
let selectedDept = "";
let selectedSubject = "";

let userAnswers = [];
let currentDocId = "";
let quizStartTime = 0;
let quizDurationText = "0m 0s";

const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? (window.location.port === '8080' ? '' : 'http://localhost:8080')
  : (window.location.protocol === 'file:') ? 'http://localhost:8080' : '';

async function initQuestionBank() {
  questionBankPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE}/api/questions`);
      if (response.ok) {
        questionBank = await response.json();
        console.log("Question bank loaded dynamically from server.");
        return questionBank;
      }
    } catch (e) {
      console.error("Error loading questions from API, attempting fallback:", e);
    }

    // Fallback to loading static questions.json file directly from root (great for static hosting like Netlify)
    try {
      const fallbackResponse = await fetch('/questions.json');
      if (fallbackResponse.ok) {
        questionBank = await fallbackResponse.json();
        console.log("Question bank loaded from static questions.json fallback.");
        return questionBank;
      }
    } catch (err) {
      console.error("Failed to load question bank from static fallback:", err);
    }
    questionBank = {};
    return questionBank;
  })();
  return questionBankPromise;
}
initQuestionBank();

// Dynamic Certificate Text Mappings
const schoolNames = {
  CSE: "School of Computing",
  ECE: "School of Electrical and Electronics Engineering",
  CIVIL: "School of Infrastructure",
  MECH: "School of Mechanical Engineering",
  EEE: "School of Electrical and Electronics Engineering",
  "BIO TECH": "School of Bio-Sciences and Technology"
};

const deptNames = {
  CSE: "Department of Computer Science and Engineering",
  ECE: "Department of Electronics and Communication Engineering",
  CIVIL: "Department of Civil Engineering",
  MECH: "Department of Mechanical Engineering",
  EEE: "Department of Electrical and Electronics Engineering",
  "BIO TECH": "Department of Biotechnology"
};

const quizNames = {
  CSE: "Web Development (HTML, CSS, JS) Quiz Assessment",
  ECE: "VLSI & Digital Electronics Quiz Assessment",
  CIVIL: "Construction Materials & Engineering Quiz Assessment",
  MECH: "Thermodynamics & Mechanical Engineering Quiz Assessment",
  EEE: "Electrical Conductance & Engineering Quiz Assessment",
  "BIO TECH": "Recombinant DNA & Biotechnology Quiz Assessment"
};

/* SELECT DEPARTMENT */
async function selectDepartment(deptCode) {
  selectedDept = deptCode;
  
  // Clear any existing name floats
  document.querySelectorAll(".name-float").forEach(el => el.remove());
  
  const deptBox = document.getElementById("deptBox");
  const subjectBox = document.getElementById("subjectBox");
  const subjectGrid = document.getElementById("subjectGrid");
  
  // Wait for questionBank to load if it hasn't completed yet
  if (!questionBank && questionBankPromise) {
    subjectGrid.innerHTML = `
      <div style="grid-column: 1/-1; padding: 40px; text-align: center; color: rgba(214, 203, 247, 0.75);">
        <span class="spinner" style="font-size: 2rem; display: block; margin-bottom: 10px;">⏳</span>
        <span>Loading subjects database...</span>
      </div>
    `;
    await questionBankPromise;
  }
  
  // Get list of subjects for selected department
  const subjects = Object.keys(questionBank[deptCode] || {});
  
  // Populate subject grid
  subjectGrid.innerHTML = "";
  if (subjects.length === 0) {
    subjectGrid.innerHTML = `
      <div style="grid-column: 1/-1; padding: 40px; text-align: center; color: rgba(214, 203, 247, 0.65);">
        <span>No subjects found for this department.</span>
      </div>
    `;
  } else {
    subjects.forEach(subjectName => {
      const btn = document.createElement("div");
      btn.className = "dept-btn";
      btn.onclick = () => selectSubject(subjectName);
      
      // Choose a nice generic icon/emoji based on subject name
      let icon = "📚";
      if (subjectName.includes("SQL") || subjectName.includes("Database")) icon = "🗄️";
      else if (subjectName.includes("Web") || subjectName.includes("HTML")) icon = "🌐";
      else if (subjectName.includes("Java")) icon = "☕";
      else if (subjectName.includes("Python")) icon = "🐍";
      else if (subjectName.includes("Networks") || subjectName.includes("Signal")) icon = "📡";
      else if (subjectName.includes("Big Data") || subjectName.includes("Analytics")) icon = "📊";
      else if (subjectName.includes("Machine Learning") || subjectName.includes("AI") || subjectName.includes("Artificial")) icon = "🤖";
      else if (subjectName.includes("Visualisation") || subjectName.includes("Microbiology")) icon = "🔬";
      else if (subjectName.includes("Operating System") || subjectName.includes("VLSI") || subjectName.includes("Digital")) icon = "💻";
      else if (subjectName.includes("Embedded") || subjectName.includes("Microprocessors") || subjectName.includes("Circuit")) icon = "🔌";
      else if (subjectName.includes("Thermodynamics") || subjectName.includes("Power") || subjectName.includes("Electrical")) icon = "⚡";
      else if (subjectName.includes("Concrete") || subjectName.includes("Structural") || subjectName.includes("Geotechnical")) icon = "🏗️";
      else if (subjectName.includes("Surveying") || subjectName.includes("Transportation") || subjectName.includes("Design")) icon = "📐";
      else if (subjectName.includes("Biochemistry") || subjectName.includes("DNA") || subjectName.includes("Genetics")) icon = "🧬";
      
      btn.innerHTML = `
        <span class="dept-icon">${icon}</span>
        <span class="dept-name">${subjectName}</span>
        <span class="dept-desc">Tap to start quiz</span>
      `;
      subjectGrid.appendChild(btn);
    });
  }
  
  deptBox.classList.add("slide-out");
  setTimeout(() => {
    deptBox.style.display = "none";
    subjectBox.style.display = "flex";
    subjectBox.classList.remove("slide-out");
    subjectBox.classList.add("slide-in");
    setTimeout(() => {
      subjectBox.classList.remove("slide-in");
    }, 250);
  }, 250);
}

/* BACK TO DEPARTMENTS */
function backToDepartments() {
  const deptBox = document.getElementById("deptBox");
  const subjectBox = document.getElementById("subjectBox");
  
  subjectBox.classList.add("slide-out");
  setTimeout(() => {
    subjectBox.style.display = "none";
    deptBox.style.display = "flex";
    deptBox.classList.remove("slide-out");
    deptBox.classList.add("slide-in");
    setTimeout(() => {
      deptBox.classList.remove("slide-in");
    }, 250);
  }, 250);
}

/* BACK TO SUBJECTS */
function backToSubjects() {
  const startBox = document.getElementById("startBox");
  const subjectBox = document.getElementById("subjectBox");
  
  // Expand container back to wide for grid display
  const container = document.querySelector(".container");
  if (container) container.classList.add("wide");
  
  startBox.classList.add("slide-out");
  setTimeout(() => {
    startBox.style.display = "none";
    subjectBox.style.display = "flex";
    subjectBox.classList.remove("slide-out");
    subjectBox.classList.add("slide-in");
    setTimeout(() => {
      subjectBox.classList.remove("slide-in");
    }, 250);
  }, 250);
}

/* SELECT SUBJECT */
function selectSubject(subjectName) {
  selectedSubject = subjectName;
  
  // Set questions for this specific subject
  questions = questionBank[selectedDept][selectedSubject] || [];
  userAnswers = new Array(questions.length).fill(null);
  
  const subjectBox = document.getElementById("subjectBox");
  const startBox = document.getElementById("startBox");
  const selectionSummary = document.getElementById("selectionSummary");
  
  // Set text summary (e.g. "CSE - Java Programming")
  selectionSummary.innerText = `${selectedDept} ➔ ${selectedSubject}`;
  
  // Shrink the glassmorphism container for the details form
  const container = document.querySelector(".container");
  if (container) container.classList.remove("wide");
  
  subjectBox.classList.add("slide-out");
  setTimeout(() => {
    subjectBox.style.display = "none";
    startBox.style.display = "flex";
    startBox.classList.remove("slide-out");
    startBox.classList.add("slide-in");
    setTimeout(() => {
      startBox.classList.remove("slide-in");
    }, 250);
  }, 250);
}

/* START */
async function startQuiz(){

const nameInput = document.getElementById("username");
const vtuInput = document.getElementById("VTUNo");
const slotInput = document.getElementById("Slot");

nameInput.classList.remove("error");
vtuInput.classList.remove("error");
slotInput.classList.remove("error");

let hasError = false;

if(nameInput.value.trim() === ""){
nameInput.classList.add("error");
hasError = true;
}

if(vtuInput.value.trim() === ""){
vtuInput.classList.add("error");
hasError = true;
}

if(slotInput.value.trim() === ""){
slotInput.classList.add("error");
hasError = true;
}

if(hasError){
const card = document.getElementById("startBox");
card.classList.remove("shake");
void card.offsetWidth; // trigger reflow
card.classList.add("shake");
return;
}

userName = nameInput.value.trim();
VTUNo = vtuInput.value.trim();
slotNo = slotInput.value.trim();
semester = document.getElementById("Semester").value.trim();

quizStartTime = Date.now();

// Start dynamic background floating user name effect
startFloatingNameEffect(userName);

// Automatically save user details in progress
try {
  const response = await fetch(`${API_BASE}/api/results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: userName,
      vtuNo: VTUNo,
      slot: slotNo,
      semester: semester,
      department: selectedDept,
      subject: selectedSubject,
      score: 0,
      total: questions.length,
      percentage: "0.0",
      status: "In Progress",
      date: new Date().toLocaleString()
    })
  });
  const data = await response.json();
  currentDocId = data.id;
} catch (e) {
  console.error("Error auto-saving user details:", e);
}

document.getElementById("startBox").style.display="none";
document.getElementById("quizBox").style.display="block";

loadQuestion();
}

/* LOAD */
function loadQuestion(){

clearInterval(timer);

timeLeft = 15;

const progressPath = document.getElementById("timerProgress");
const timerText = document.getElementById("timerText");

if(progressPath && timerText) {
  progressPath.style.strokeDasharray = "100, 100";
  progressPath.style.stroke = "#ffffff";
  timerText.innerText = timeLeft;
}

/* progress */
let progress = (currentQuestion / questions.length) * 100;
document.getElementById("progressBar").style.width = progress + "%";

/* timer */
timer = setInterval(()=>{
timeLeft--;

if(progressPath && timerText) {
  const percent = (timeLeft / 15) * 100;
  progressPath.style.strokeDasharray = `${percent}, 100`;
  timerText.innerText = timeLeft;
  
  if (timeLeft > 10) {
    progressPath.style.stroke = "#ffffff"; // pure white
  } else if (timeLeft > 4) {
    progressPath.style.stroke = "#d6cbf7"; // lavender
  } else {
    progressPath.style.stroke = "#ffd700"; // gold warning
  }
}

if(timeLeft === 0){
nextQuestion(true);
}
},1000);

let q = questions[currentQuestion];

document.getElementById("questionNumber").innerText =
"Question " + (currentQuestion+1) + " / " + questions.length;

document.getElementById("question").innerText = q.question;

/* OPTIONS (NEW UI) */
let answersDiv = document.getElementById("answers");
answersDiv.innerHTML = "";

q.answers.forEach((answer, index) => {

const div = document.createElement("div");
div.className = "answer";

if(userAnswers[currentQuestion] === index){
div.classList.add("selected");
}

div.innerHTML = answer;

div.onclick = () => selectAnswer(index);

answersDiv.appendChild(div);

});

/* buttons */
document.getElementById("backBtn").disabled = currentQuestion === 0;
document.getElementById("nextBtn").innerText =
currentQuestion === questions.length-1 ? "Finish Quiz" : "Next ➡";

}

/* SELECT */
function selectAnswer(index){

userAnswers[currentQuestion] = index;

document.querySelectorAll(".answer").forEach(el=>{
el.classList.remove("selected");
});

document.querySelectorAll(".answer")[index].classList.add("selected");

}

/* NEXT WITH TRANSITION */
function nextQuestion(isTimeUp = false){

if(!isTimeUp && userAnswers[currentQuestion] === null){
const quizBox = document.getElementById("quizBox");
quizBox.classList.remove("shake");
void quizBox.offsetWidth; // trigger reflow
quizBox.classList.add("shake");
return;
}

currentQuestion++;

if(currentQuestion < questions.length){
  const quizContent = document.getElementById("quizContent");
  quizContent.classList.add("slide-out");
  setTimeout(() => {
    loadQuestion();
    quizContent.classList.remove("slide-out");
    quizContent.classList.add("slide-in");
    setTimeout(() => {
      quizContent.classList.remove("slide-in");
    }, 250);
  }, 250);
}else{
  clearInterval(timer);
  document.getElementById("quizBox").style.display="none";
  document.getElementById("resultBox").style.display="block";
  calculateScore();
}

}

/* PREVIOUS WITH TRANSITION */
function previousQuestion(){
if(currentQuestion > 0){
  currentQuestion--;
  const quizContent = document.getElementById("quizContent");
  quizContent.classList.add("slide-out");
  setTimeout(() => {
    loadQuestion();
    quizContent.classList.remove("slide-out");
    quizContent.classList.add("slide-in");
    setTimeout(() => {
      quizContent.classList.remove("slide-in");
    }, 250);
  }, 250);
}
}

/* SCORE */
async function calculateScore(){

score = 0;

userAnswers.forEach((ans,i)=>{
if(ans === questions[i].correct){
score++;
}
});

let percentage = (score/questions.length)*100;

// Compute duration
const durationMs = Date.now() - quizStartTime;
const mins = Math.floor(durationMs / 60000);
quizDurationText = mins > 0 ? `${mins} Minute${mins !== 1 ? 's' : ''}` : `1 Minute`;

// Calculate rank dynamically
let rankText = "Top 50%";
try {
  const response = await fetch(`${API_BASE}/api/results`);
  if (response.ok) {
    const results = await response.json();
    const completedResults = results.filter(r => r.department === selectedDept && r.status === "Completed");
    const scores = completedResults.map(r => Number(r.score));
    scores.push(score); // include current score
    const lowerScores = scores.filter(s => s < score).length;
    const equalScores = scores.filter(s => s === score).length;
    const percentile = ((lowerScores + 0.5 * equalScores) / scores.length) * 100;
    const topPct = 100 - percentile;
    rankText = `Top ${Math.max(1, Math.round(topPct))}%`;
  }
} catch (e) {
  console.error("Error calculating rank:", e);
  if (percentage >= 90) rankText = "Top 5%";
  else if (percentage >= 80) rankText = "Top 15%";
  else if (percentage >= 70) rankText = "Top 30%";
  else rankText = "Top 50%";
}
window.quizRankText = rankText;

let resultText = userName + " scored " + score + " / " + questions.length +
" (" + percentage.toFixed(1) + "%)";

resultText += percentage >= 50 ? " - PASS 🎉" : " - FAIL";

document.getElementById("score").innerText = resultText;

// Animate results circular progress wheel
const circle = document.getElementById("wheelProgress");
const percentageText = document.getElementById("wheelPercentage");
const scoreLabel = document.getElementById("wheelScoreLabel");

if (circle && percentageText && scoreLabel) {
  const circumference = 251.2;
  const offset = circumference - (percentage / 100) * circumference;
  
  // Set stroke gradient coloring based on pass/fail (using Lavender to Goldish)
  const gradientStop1 = document.querySelector("#wheelGradient stop:nth-child(1)");
  const gradientStop2 = document.querySelector("#wheelGradient stop:nth-child(2)");
  if (gradientStop1 && gradientStop2) {
    if (percentage >= 50) {
      gradientStop1.setAttribute("stop-color", "#d6cbf7");
      gradientStop2.setAttribute("stop-color", "#ffd700");
    } else {
      gradientStop1.setAttribute("stop-color", "#8a2be2");
      gradientStop2.setAttribute("stop-color", "#15092a");
    }
  }
  
  setTimeout(() => {
    circle.style.strokeDashoffset = offset;
  }, 150);
  
  // Animate count-up of percentage text
  let currentPct = 0;
  const targetPct = Math.round(percentage);
  percentageText.innerText = "0%";
  
  if (targetPct > 0) {
    const duration = 1200; // ms
    const stepTime = Math.max(Math.floor(duration / targetPct), 10);
    const pctTimer = setInterval(() => {
      if (currentPct >= targetPct) {
        percentageText.innerText = targetPct + "%";
        clearInterval(pctTimer);
      } else {
        currentPct++;
        percentageText.innerText = currentPct + "%";
      }
    }, stepTime);
  } else {
    percentageText.innerText = "0%";
  }
  
  scoreLabel.innerText = `Score: ${score} / ${questions.length}`;
}

// Confetti burst on pass
if (percentage >= 50) {
  startConfetti();
}

/* local API */
try{
  if (currentDocId) {
    await fetch(`${API_BASE}/api/results/${currentDocId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: score,
        percentage: percentage.toFixed(1),
        date: new Date().toLocaleString()
      })
    });
  } else {
    await fetch(`${API_BASE}/api/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName,
        vtuNo: VTUNo,
        slot: slotNo,
        semester: semester,
        department: selectedDept,
        subject: selectedSubject,
        score: score,
        total: questions.length,
        percentage: percentage.toFixed(1),
        status: "Completed",
        date: new Date().toLocaleString()
      })
    });
  }
}catch(e){
  console.error("Local API Save Error:", e);
}
}

/* CHANGEABLE CERTIFICATE GENERATION */
function downloadCertificate(){

const { jsPDF } = window.jspdf;

const doc = new jsPDF("landscape");

const pageWidth = doc.internal.pageSize.width;
const pageHeight = doc.internal.pageSize.height;

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const displayName = toTitleCase(userName);

// Fetch dynamic, changeable text fields based on student department
const schoolText = schoolNames[selectedDept] || "School of Computing";
const deptText = deptNames[selectedDept] || "Department of Computer Science and Engineering";
const quizTitleText = `${selectedSubject} Quiz Assessment`;

// ===== Certificate Background / Template =====
const templateImg = document.getElementById("certificateTemplate");
let hasTemplate = false;

if (templateImg && templateImg.complete && templateImg.naturalWidth !== 0) {
  try {
    doc.addImage(templateImg, "PNG", 0, 0, pageWidth, pageHeight);
    hasTemplate = true;
  } catch (err) {
    console.error("Error drawing template to PDF:", err);
  }
}

// Fallback to manual border if no template is loaded
if (!hasTemplate) {
  doc.setDrawColor(0, 102, 204);
  doc.setLineWidth(4);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  doc.setLineWidth(1);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);
}

// ===== Certificate Elements Drawing =====
if (hasTemplate) {
  const center = pageWidth / 2;
  const currentPercentage = (score / questions.length) * 100;

  // ===== Vel Tech Logo & University Name (Top Left Header) =====
  const logoImg = document.getElementById("velTechLogo");
  if (logoImg && logoImg.complete && logoImg.naturalWidth !== 0) {
    try {
      doc.addImage(logoImg, "PNG", 20, 16, 33, 14);
    } catch (err) {
      console.error("Error drawing logo to PDF:", err);
    }
  }

  // University Header text
  doc.setFont("Helvetica", "Bold");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text("VEL TECH UNIVERSITY", 20, 35);
  doc.setFont("Helvetica", "Normal");
  doc.setFontSize(7.5);
  doc.text(schoolText, 20, 39);

  // ===== Certificate Titles =====
  doc.setFont("Helvetica", "Bold");
  doc.setFontSize(36);
  doc.setTextColor(0, 0, 0);
  doc.text("Certificate", center, 50, { align: "center" });

  doc.setFont("Helvetica", "Bold");
  doc.setFontSize(12);
  doc.text("O F   A C H I E V E M E N T", center, 59, { align: "center" });

  // ===== Certify Text =====
  doc.setFont("Helvetica", "Normal");
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text("This is to certify that", center, 84, { align: "center" });

  // ===== Student Name =====
  doc.setFont("Times", "BoldItalic");
  doc.setFontSize(28);
  doc.setTextColor(100, 50, 160); // Elegant purple
  doc.text(displayName.toUpperCase(), center, 100, { align: "center" });

  // ===== VTU Number =====
  doc.setFont("Helvetica", "Bold");
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text("VTU No: " + VTUNo, center, 108, { align: "center" });

  // ===== Description =====
  doc.setFont("Helvetica", "Normal");
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  doc.text("has successfully completed the", center, 126, { align: "center" });
  
  doc.setFont("Helvetica", "Bold");
  doc.setTextColor(0, 0, 0);
  doc.text(`${selectedSubject} Quiz Assessment`, center, 134, { align: "center" });

  doc.setFont("Helvetica", "Normal");
  doc.setTextColor(80, 80, 80);
  doc.text("with an outstanding score of", center, 142, { align: "center" });

  doc.setFont("Helvetica", "Bold");
  doc.setTextColor(0, 0, 0);
  doc.text(`${score} / ${questions.length} (${currentPercentage.toFixed(1)}%)`, center, 150, { align: "center" });

  // ===== Bottom Signature =====
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(center - 30, 172, center + 30, 172);

  doc.setFont("Helvetica", "Bold");
  doc.setFontSize(11);
  doc.setTextColor(100, 50, 160); // Elegant purple
  doc.text("Dr. S. Hemamalini", center, 177, { align: "center" });

  doc.setFont("Helvetica", "Normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("Quiz Administrator", center, 182, { align: "center" });

  doc.setFontSize(8.5);
  doc.text("Date of Issue: " + new Date().toLocaleDateString(), center, 192, { align: "center" });

} else {
  // ===== Fallback Manual / Plain PDF Layout (No Template) =====
  const leftCenter = pageWidth / 2;

  const logoImg = document.getElementById("velTechLogo");
  if (logoImg && logoImg.complete && logoImg.naturalWidth !== 0) {
    try {
      doc.addImage(logoImg, "PNG", 20, 18, 35, 20);
    } catch (err) {
      console.error("Error drawing logo to PDF:", err);
    }
  }

  doc.setFont("Times", "Bold");
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text(
    "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology",
    leftCenter,
    40,
    { align: "center" }
  );

  doc.setFont("Times", "Normal");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(schoolText, leftCenter, 52, { align: "center" });
  doc.text(deptText, leftCenter, 60, { align: "center" });

  doc.setFont("Times", "Bold");
  doc.setFontSize(30);
  doc.text("CERTIFICATE OF ACHIEVEMENT", leftCenter, 78, { align: "center" });

  doc.setFont("Times", "Normal");
  doc.setFontSize(16);
  doc.text("This certificate is proudly presented to", leftCenter, 92, { align: "center" });

  doc.setFont("Times", "Bold");
  doc.setFontSize(32);
  doc.setTextColor(0, 0, 0);
  doc.text(displayName.toUpperCase(), leftCenter, 110, { align: "center" });

  doc.setFont("Times", "Normal");
  doc.setFontSize(16);
  doc.text("VTU No: " + VTUNo, leftCenter, 124, { align: "center" });

  doc.text("For successfully completing the " + quizTitleText, leftCenter, 142, { align: "center" });
  doc.setFontSize(14);
  doc.text("Score: " + score + " / " + questions.length, leftCenter, 158, { align: "center" });
  doc.text("Date: " + new Date().toLocaleDateString(), leftCenter, 170, { align: "center" });

  doc.line(pageWidth - 90, 170, pageWidth - 30, 170);
  doc.setFont("Times", "Italic");
  doc.setFontSize(18);
  doc.text("Dr. S. Hemamalini", pageWidth - 60, 165, { align: "center" });
  doc.setFont("Times", "Normal");
  doc.setFontSize(12);
  doc.text("M.E., Ph.D", pageWidth - 60, 178, { align: "center" });
  doc.text("Assistant Professor - Senior Grade", pageWidth - 60, 186, { align: "center" });
  doc.text("Authorized Signatory", pageWidth - 60, 194, { align: "center" });
}

// ===== Save PDF =====
doc.save("Quiz-Certificate.pdf");

}

/* Canvas Confetti Animation (Lavender, Gold & Purple Tones) */
function startConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let animationFrameId;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#ffffff", "#8a2be2", "#d6cbf7", "#ffd700", "#ebd17a"];
  const particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * canvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngleIncremental: Math.random() * 0.07 + 0.02,
      tiltAngle: 0,
      velocity: {
        x: Math.random() * 4 - 2,
        y: Math.random() * 5 + 4
      }
    });
  }

  let duration = 3500;
  let startTime = Date.now();

  function draw() {
    let elapsed = Date.now() - startTime;
    if (elapsed > duration) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrameId);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += p.velocity.y;
      p.x += p.velocity.x;
      p.tilt = Math.sin(p.tiltAngle) * 12;

      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();

      if (p.y > canvas.height) {
        p.x = Math.random() * canvas.width;
        p.y = -20;
      }
    });

    animationFrameId = requestAnimationFrame(draw);
  }

  const resizeHandler = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resizeHandler);

  draw();
}

/* Background Parallax Shift */
document.addEventListener("mousemove", (e) => {
  const blobs = document.querySelectorAll(".blob");
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;
  
  blobs.forEach((blob, index) => {
    const depth = (index + 1) * 20;
    const x = mouseX * depth;
    const y = mouseY * depth;
    blob.style.transform = `translate(${x}px, ${y}px)`;
  });
});

/* Dynamic Floating Name Effect in Background */
function startFloatingNameEffect(name) {
  const bgContainer = document.querySelector(".bg-blobs");
  if (!bgContainer) return;
  
  // Clear any existing name floats
  document.querySelectorAll(".name-float").forEach(el => el.remove());
  
  const count = 12; // Number of floating names on screen
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "name-float";
    el.innerText = name;
    el.style.position = "absolute";
    el.style.color = "rgba(255, 255, 255, 0.26)"; // Highly visible base opacity, animation controls sparkles
    el.style.animationDelay = (Math.random() * 3.2) + "s"; // Random stagger for sparkles
    el.style.fontSize = (Math.random() * 32 + 22) + "px";
    el.style.fontFamily = "'Outfit', sans-serif";
    el.style.fontWeight = "700";
    el.style.pointerEvents = "none";
    el.style.whiteSpace = "nowrap";
    el.style.userSelect = "none";
    el.style.zIndex = "-1";
    
    // Random initial positions within the screen boundaries
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    
    // Slow drifting velocity
    let dx = (Math.random() * 0.5 + 0.15) * (Math.random() > 0.5 ? 1 : -1);
    let dy = (Math.random() * 0.5 + 0.15) * (Math.random() > 0.5 ? 1 : -1);
    
    // Slow rotation
    let rotation = Math.random() * 360;
    let rotSpeed = (Math.random() * 0.15 + 0.05) * (Math.random() > 0.5 ? 1 : -1);
    
    el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    bgContainer.appendChild(el);
    
    function animateFloat() {
      x += dx;
      y += dy;
      rotation += rotSpeed;
      
      const width = el.offsetWidth || 100;
      const height = el.offsetHeight || 30;
      
      // Wrap coordinates around screen borders
      if (x < -width) x = window.innerWidth;
      if (x > window.innerWidth) x = -width;
      if (y < -height) y = window.innerHeight;
      if (y > window.innerHeight) y = -height;
      
      el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
      requestAnimationFrame(animateFloat);
    }
    
    requestAnimationFrame(animateFloat);
  }
}

// ===== Global Window bindings for HTML event handlers =====
window.selectDepartment = selectDepartment;
window.backToDepartments = backToDepartments;
window.backToSubjects = backToSubjects;
window.selectSubject = selectSubject;
window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.selectAnswer = selectAnswer;
window.downloadCertificate = downloadCertificate;