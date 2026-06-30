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
let isQuizActive = false;

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
  const loadedQuestions = (questionBank[selectedDept] && questionBank[selectedDept][selectedSubject]) || [];
  if (loadedQuestions.length === 0) {
    alert("This subject does not have any questions yet. Please select another subject.");
    return;
  }
  questions = loadedQuestions;
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

if (questions.length === 0) {
  alert("This subject does not have any questions. Please select another subject.");
  return;
}

userName = nameInput.value.trim();
VTUNo = vtuInput.value.trim().toUpperCase();
slotNo = slotInput.value.trim().toUpperCase();
semester = document.getElementById("Semester").value.trim();

const startBtn = document.getElementById("startQuizBtn");
if (startBtn) {
  startBtn.disabled = true;
  startBtn.innerText = "Loading...";
}

quizStartTime = Date.now();

// Start dynamic background floating user name effect
startFloatingNameEffect(userName);

// Automatically save user details in progress
const startPayload = {
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
};

try {
  const response = await fetch(`${API_BASE}/api/results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(startPayload)
  });
  if (response.ok) {
    const data = await response.json();
    currentDocId = data.id;
  } else {
    throw new Error("Server status: " + response.status);
  }
} catch (e) {
  console.error("Error auto-saving user details, caching offline:", e);
  currentDocId = 'local_' + Math.random().toString(36).substr(2, 9);
  cacheResultOffline(currentDocId, startPayload);
} finally {
  if (startBtn) {
    startBtn.disabled = false;
    startBtn.innerText = "Start Quiz";
  }
}

isQuizActive = true;
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
    progressPath.style.stroke = "#efe8db"; // soft linen
  } else if (timeLeft > 4) {
    progressPath.style.stroke = "#e0a96d"; // warm sand
  } else {
    progressPath.style.stroke = "#d07a4a"; // terracotta warning
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

div.textContent = answer;

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

clearInterval(timer);
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
  document.getElementById("quizBox").style.display="none";
  document.getElementById("resultBox").style.display="block";
  calculateScore();
}

}

/* PREVIOUS WITH TRANSITION */
function previousQuestion(){
if(currentQuestion > 0){
  clearInterval(timer);
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

isQuizActive = false;
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
const secs = Math.floor((durationMs % 60000) / 1000);
quizDurationText = `${mins}m ${secs}s`;

// Calculate rank dynamically
let rankText = "Top 50%";
try {
  const response = await fetch(`${API_BASE}/api/results`);
  if (response.ok) {
    const results = await response.json();
    const completedResults = results.filter(r => r.department === selectedDept && r.subject === selectedSubject && r.status === "Completed");
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
  
  // Set stroke gradient coloring based on pass/fail (using Cozy Neutrals)
  const gradientStop1 = document.querySelector("#wheelGradient stop:nth-child(1)");
  const gradientStop2 = document.querySelector("#wheelGradient stop:nth-child(2)");
  if (gradientStop1 && gradientStop2) {
    if (percentage >= 50) {
      gradientStop1.setAttribute("stop-color", "#efe8db");
      gradientStop2.setAttribute("stop-color", "#e0a96d");
    } else {
      gradientStop1.setAttribute("stop-color", "#d07a4a");
      gradientStop2.setAttribute("stop-color", "#26201c");
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
const fullCompletedPayload = {
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
};

try{
  if (currentDocId && !currentDocId.startsWith("local_")) {
    const response = await fetch(`${API_BASE}/api/results/${currentDocId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: score,
        percentage: percentage.toFixed(1),
        date: fullCompletedPayload.date
      })
    });
    if (!response.ok) {
      throw new Error("Server status: " + response.status);
    }
  } else {
    const response = await fetch(`${API_BASE}/api/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullCompletedPayload)
    });
    if (response.ok) {
      if (currentDocId && currentDocId.startsWith("local_")) {
        removeOfflineResult(currentDocId);
      }
    } else {
      throw new Error("Server status: " + response.status);
    }
  }
}catch(e){
  console.error("Local API Save Error, caching completion offline:", e);
  cacheResultOffline(currentDocId, fullCompletedPayload, true);
}

// Trigger sync for any cached records
syncOfflineResults();
}

/* CHANGEABLE CERTIFICATE GENERATION */
function downloadCertificate(){

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("landscape");
  
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const center = pageWidth / 2;
  const currentPercentage = (score / questions.length) * 100;

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  
  const displayName = toTitleCase(userName);
  const schoolText = schoolNames[selectedDept] || "School of Computing";
  const deptText = deptNames[selectedDept] || "Department of Computer Science and Engineering";
  
  // 1. Draw elegant solid background color (Cream/Off-White)
  doc.setFillColor(252, 251, 247); // #fcfbf7
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // 2. Draw outer gold borders
  doc.setDrawColor(197, 160, 89); // Elegant Gold
  doc.setLineWidth(1.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // 3. Draw inner navy borders
  doc.setDrawColor(18, 30, 49); // Dark Navy
  doc.setLineWidth(0.5);
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

  // 4. Draw corner decorations (Gold geometric corner brackets)
  doc.setDrawColor(197, 160, 89);
  doc.setLineWidth(1.5);
  // Top Left Corner
  doc.line(13, 20, 20, 20);
  doc.line(20, 13, 20, 20);
  // Top Right Corner
  doc.line(pageWidth - 13, 20, pageWidth - 20, 20);
  doc.line(pageWidth - 20, 13, pageWidth - 20, 20);
  // Bottom Left Corner
  doc.line(13, pageHeight - 20, 20, pageHeight - 20);
  doc.line(20, pageHeight - 13, 20, pageHeight - 20);
  // Bottom Right Corner
  doc.line(pageWidth - 13, pageHeight - 20, pageWidth - 20, pageHeight - 20);
  doc.line(pageWidth - 20, pageHeight - 13, pageWidth - 20, pageHeight - 20);

  // 5. University Logo (Top Center)
  const logoImg = document.getElementById("velTechLogo");
  if (logoImg && logoImg.complete && logoImg.naturalWidth !== 0) {
    try {
      doc.addImage(logoImg, "PNG", center - 20, 20, 40, 16);
    } catch (err) {
      console.error("Error drawing logo to PDF:", err);
    }
  }

  // 6. University Header
  doc.setFont("Times", "Bold");
  doc.setFontSize(11);
  doc.setTextColor(18, 30, 49); // Dark Navy
  doc.text("VEL TECH RANGARAJAN DR. SAGUNTHALA R&D INSTITUTE OF SCIENCE AND TECHNOLOGY", center, 44, { align: "center" });
  
  doc.setFont("Helvetica", "Normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 100);
  doc.text(`${schoolText.toUpperCase()}  |  ${deptText.toUpperCase()}`, center, 50, { align: "center" });

  // 7. Divider Line
  doc.setDrawColor(197, 160, 89);
  doc.setLineWidth(1.2);
  doc.line(center - 70, 55, center + 70, 55);

  // 8. Certificate Main Heading
  doc.setFont("Times", "Bold");
  doc.setFontSize(28);
  doc.setTextColor(18, 30, 49);
  doc.text("CERTIFICATE OF EXCELLENCE", center, 75, { align: "center" });

  doc.setFont("Times", "Italic");
  doc.setFontSize(11);
  doc.setTextColor(120, 120, 120);
  doc.text("This certificate is proudly presented to", center, 90, { align: "center" });

  // 9. Student Name
  doc.setFont("Times", "BoldItalic");
  doc.setFontSize(30);
  doc.setTextColor(197, 160, 89); // Gold
  doc.text(displayName.toUpperCase(), center, 108, { align: "center" });

  // Thin underline under name
  doc.setDrawColor(197, 160, 89);
  doc.setLineWidth(0.8);
  doc.line(center - 50, 113, center + 50, 113);

  // 10. VTU Registration
  doc.setFont("Helvetica", "Bold");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("VTU Registration No: " + VTUNo, center, 122, { align: "center" });

  // 11. Accomplishment Description
  doc.setFont("Times", "Italic");
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  doc.text("for successfully completing the academic assessment course in", center, 138, { align: "center" });

  // Course Name
  doc.setFont("Helvetica", "Bold");
  doc.setFontSize(15);
  doc.setTextColor(18, 30, 49); // Dark Navy
  doc.text(selectedSubject.toUpperCase(), center, 148, { align: "center" });

  // Score
  doc.setFont("Times", "Italic");
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  doc.text("and demonstrating outstanding proficiency with a final score of", center, 158, { align: "center" });

  doc.setFont("Helvetica", "Bold");
  doc.setFontSize(13);
  doc.setTextColor(18, 30, 49);
  doc.text(`${score} / ${questions.length} (${currentPercentage.toFixed(1)}%)`, center, 168, { align: "center" });

  // 12. Date of Issue (Bottom Center)
  doc.setFont("Times", "Italic");
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("Date of Issue: " + new Date().toLocaleDateString(), center, 188, { align: "center" });

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
      if (!document.body.contains(el)) return;
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

// Caching and auto-sync functions for offline database submissions
function cacheResultOffline(id, record, isUpdate = false) {
  try {
    let cached = JSON.parse(localStorage.getItem("unsyncedQuizResults") || "[]");
    if (isUpdate) {
      const idx = cached.findIndex(r => r.id === id);
      if (idx !== -1) {
        cached[idx] = { ...cached[idx], ...record, status: "Completed" };
      } else {
        cached.push({ id, ...record, status: "Completed" });
      }
    } else {
      cached.push({ id, ...record });
    }
    localStorage.setItem("unsyncedQuizResults", JSON.stringify(cached));
  } catch (e) {
    console.error("Failed to cache results offline:", e);
  }
}

function removeOfflineResult(id) {
  try {
    let cached = JSON.parse(localStorage.getItem("unsyncedQuizResults") || "[]");
    cached = cached.filter(r => r.id !== id);
    if (cached.length === 0) {
      localStorage.removeItem("unsyncedQuizResults");
    } else {
      localStorage.setItem("unsyncedQuizResults", JSON.stringify(cached));
    }
  } catch (e) {
    console.error("Failed to remove offline record from cache:", e);
  }
}

async function syncOfflineResults() {
  let cached = [];
  try {
    cached = JSON.parse(localStorage.getItem("unsyncedQuizResults") || "[]");
  } catch (e) {
    return;
  }
  if (cached.length === 0) return;

  console.log(`Auto-sync: Attempting to upload ${cached.length} offline results...`);
  let stillUnsynced = [];

  for (let record of cached) {
    try {
      if (record.id.startsWith("local_")) {
        const postPayload = { ...record };
        delete postPayload.id;
        const response = await fetch(`${API_BASE}/api/results`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postPayload)
        });
        if (response.ok) {
          console.log(`Auto-sync successfully uploaded result for ${record.name}`);
          continue;
        }
      } else {
        const response = await fetch(`${API_BASE}/api/results/${record.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            score: record.score,
            percentage: record.percentage,
            date: record.date
          })
        });
        if (response.ok) {
          console.log(`Auto-sync successfully updated results for server ID ${record.id}`);
          continue;
        }
      }
    } catch (err) {
      console.warn("Auto-sync: failed to process record: ", err);
    }
    stillUnsynced.push(record);
  }

  if (stillUnsynced.length === 0) {
    localStorage.removeItem("unsyncedQuizResults");
  } else {
    localStorage.setItem("unsyncedQuizResults", JSON.stringify(stillUnsynced));
  }
}

// Trigger auto-sync on load, and when browser returns online
syncOfflineResults();
window.addEventListener("online", syncOfflineResults);

// Warn user before reloading or leaving the page during an active quiz
window.addEventListener("beforeunload", (e) => {
  if (isQuizActive) {
    e.preventDefault();
    e.returnValue = "Are you sure you want to leave? Your quiz progress will be lost.";
  }
});