const questionBank = {
  CSE: [
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
  ],
  ECE: [
    {question:"Which material is most commonly used as a substrate in manufacturing integrated circuits?",answers:["Copper","Germanium","Silicon","Gallium Arsenide"],correct:2},
    {question:"What does VLSI stand for in electronics?",answers:["Very Low Scale Integration","Very Large Scale Integration","Variable Linear System Integration","Volatile Large Storage Integrated"],correct:1},
    {question:"Which CMOS transistor conducts when the input voltage is high (logic 1)?",answers:["NMOS","PMOS","Both NMOS and PMOS","Neither"],correct:0},
    {question:"Which sequential circuit stores a single bit of binary data?",answers:["Decoder","Multiplexer","Flip-Flop","Encoder"],correct:2},
    {question:"Which Hardware Description Language (HDL) is widely used for digital VLSI design?",answers:["Python","Verilog HDL","HTML","assembly"],correct:1},
    {question:"Which logic gate yields output 1 only when all inputs are 0?",answers:["OR","AND","NOR","NAND"],correct:2},
    {question:"How many select lines does an 8-to-1 multiplexer have?",answers:["1","2","3","4"],correct:2},
    {question:"What are the main charge carriers in an n-type semiconductor?",answers:["Holes","Electrons","Neutrons","Protons"],correct:1},
    {question:"What is the primary function of a depletion region in a PN junction?",answers:["To conduct current","To block charge diffusion","To generate light","To store energy"],correct:1},
    {question:"The Boolean expression A + A' is simplified to...",answers:["0","1","A","A'"],correct:1},
    {question:"Which theorem is widely used to simplify complex Boolean equations?",answers:["Newton's Theorem","Fourier's Theorem","De Morgan's Theorem","Taylor's Theorem"],correct:2},
    {question:"How many flip-flops are required to design a decade counter?",answers:["2","3","4","5"],correct:2},
    {question:"Which logic family is known for having the lowest static power dissipation?",answers:["TTL","ECL","CMOS","RTL"],correct:2},
    {question:"An ideal operational amplifier (Op-Amp) has infinite...",answers:["Input impedance","Output impedance","Common-mode voltage","Slew rate limit"],correct:0},
    {question:"Which processor component performs mathematical and logical operations?",answers:["Control Unit","Registers","Arithmetic Logic Unit (ALU)","Cache"],correct:2},
    {question:"What is the resolution of an 8-bit Digital-to-Analog Converter (DAC)?",answers:["1 part in 15","1 part in 63","1 part in 255","1 part in 1023"],correct:2},
    {question:"Propagation delay in modern VLSI circuits is typically measured in...",answers:["Seconds","Milliseconds","Microseconds","Nanoseconds"],correct:3},
    {question:"What is setup time in digital flip-flops?",answers:["Clock pulse duration","Min time data must be stable before clock edge","Time to clear registers","Delay to settle output"],correct:1},
    {question:"Which logic gate is widely referred to as a universal gate?",answers:["AND","OR","NAND","XOR"],correct:2},
    {question:"In VLSI fabrication, photolithography is primarily used to...",answers:["Slice silicon ingots","Transfer circuit patterns to substrate","Clean chips","Package ICs"],correct:1},
    {question:"What does the Fan-out of a logic gate represent?",answers:["Input capacity","Max number of similar gates it can drive","Cooling system speed","Thermal limit"],correct:1},
    {question:"Which semiconductor device is designed to act as a voltage regulator?",answers:["Zener Diode","LED","Schottky Diode","Varactor Diode"],correct:0},
    {question:"In a CMOS inverter logic gate, the PMOS transistor is connected to...",answers:["Ground","Vdd (Power Supply)","Input","Output only"],correct:1},
    {question:"In a CMOS inverter logic gate, the NMOS transistor is connected to...",answers:["Vdd (Power Supply)","Ground","PMOS gate only","Bulk substrate only"],correct:1},
    {question:"A digital electrical signal is characterized by having...",answers:["Infinite levels","Discrete, quantized levels","No noise","Continuous values"],correct:1}
  ],
  CIVIL: [
    {question:"Which type of cement is most commonly used for general residential and commercial building construction?",answers:["Rapid Hardening Cement","White Cement","Ordinary Portland Cement (OPC)","High Alumina Cement"],correct:2},
    {question:"Concrete is primarily a mixture of cement, water, and which other component?",answers:["Steel bars","Aggregates (sand & gravel)","Lime plaster","Wood fibers"],correct:1},
    {question:"Why is reinforcement steel added inside concrete slabs?",answers:["To reduce weight","To increase tensile strength","To prevent water leakage","To accelerate drying time"],correct:1},
    {question:"Which class of bricks exhibits the highest compressive strength and lowest water absorption?",answers:["First class bricks","Second class bricks","Third class bricks","Overburnt bricks"],correct:0},
    {question:"What is the process of maintaining moisture in concrete after casting to develop maximum strength called?",answers:["Compaction","Batching","Curing","Segregation"],correct:2},
    {question:"Which instrument is used to determine land elevations in surveying?",answers:["Compass","Dumpy Level","Planimeter","Alidade"],correct:1},
    {question:"What property of fresh concrete does the slump test measure?",answers:["Compressive strength","Permeability","Workability","Density"],correct:2},
    {question:"What is the primary load-bearing structural member of a roof truss?",answers:["Purlin","Tie beam","Principal Rafter","Sag tie"],correct:2},
    {question:"What is the main component of standard structural mortar?",answers:["Cement, sand, and water","Plaster of Paris","Clay and gravel","Fly ash and lime"],correct:0},
    {question:"What is the approximate unit weight of standard reinforced concrete?",answers:["15 kN/m3","20 kN/m3","25 kN/m3","30 kN/m3"],correct:2},
    {question:"Which type of soil has the smallest particle sizes?",answers:["Sand","Silt","Gravel","Clay"],correct:3},
    {question:"What is the standard length of a metric survey chain?",answers:["10m","20m","50m","100m"],correct:1},
    {question:"Which instrument is used to measure wind speeds for bridge and structural assessments?",answers:["Anemometer","Hygrometer","Barometer","Rain Gauge"],correct:0},
    {question:"Which binding material is commonly used in flexible road pavement construction?",answers:["Cement","Tar","Bitumen","Resin"],correct:2},
    {question:"Which foundation is preferred for buildings on weak soil carrying heavy loads?",answers:["Strip Footing","Raft/Mat Foundation","Isolated Footing","Strap Footing"],correct:1},
    {question:"A cantilever beam is supported at...",answers:["Both ends","One end only","The center only","Multiple intermediate rollers"],correct:1},
    {question:"What is the maximum water absorption limit for a first-class brick after 24-hour immersion?",answers:["10%","20%","30%","40%"],correct:1},
    {question:"Which construction material is manufactured by burning limestone in a kiln?",answers:["Gypsum","Plaster","Lime","Silica"],correct:2},
    {question:"Which structural element primarily resists loads through bending stresses?",answers:["Column","Strut","Beam","Foundation pile"],correct:2},
    {question:"In plane surveying, what is the line of collimation?",answers:["Plumb line","Line of sight through telescope center","Horizontal line","Ground level curve"],correct:1},
    {question:"What is the initial setting time of standard Ordinary Portland Cement?",answers:["10 minutes","30 minutes","60 minutes","600 minutes"],correct:1},
    {question:"What is the final setting time of standard Ordinary Portland Cement?",answers:["60 minutes","120 minutes","600 minutes","1200 minutes"],correct:2},
    {question:"The vertical structural member of a building frame supporting slabs is a...",answers:["Beam","Column","Truss","Foundation footing"],correct:1},
    {question:"What is the approximate modulus of elasticity of standard structural steel?",answers:["2 x 10^3 N/mm2","2 x 10^4 N/mm2","2 x 10^5 N/mm2","2 x 10^6 N/mm2"],correct:2},
    {question:"Which material is most commonly used for installing a Damp Proof Course (DPC)?",answers:["Aggregate sand","Bitumen / Asphalt membrane","Lime wash","Concrete grout"],correct:1}
  ],
  MECH: [
    {question:"Which law of thermodynamics defines the concept of entropy?",answers:["Zeroth Law","First Law","Second Law","Third Law"],correct:2},
    {question:"What is the primary purpose of a flywheel in an internal combustion engine?",answers:["To cool the cylinders","To store and smooth energy delivery","To ignite the fuel mixture","To filter exhaust gases"],correct:1},
    {question:"What is the ratio of shear stress to shear strain within elastic limits called?",answers:["Young's Modulus","Bulk Modulus","Modulus of Rigidity","Poisson's Ratio"],correct:2},
    {question:"Which thermodynamic cycle represents the ideal standard for a simple steam power plant?",answers:["Carnot Cycle","Otto Cycle","Diesel Cycle","Rankine Cycle"],correct:3},
    {question:"What type of load is a bridge subjected to when heavy vehicles drive across it?",answers:["Static Load","Live (Dynamic) Load","Torsional Load","Compressive Load"],correct:1},
    {question:"What is the ratio of lateral strain to longitudinal strain in mechanics called?",answers:["Young's Modulus","Bulk Modulus","Poisson's Ratio","Rigidity Modulus"],correct:2},
    {question:"The thermal efficiency of a Carnot heat engine depends directly on...",answers:["Working fluid density","Engine dimensions","Operating temperature limits","Fuel calorific value"],correct:2},
    {question:"Which component is used to align and join two rotating shafts together?",answers:["Key","Spline","Coupling","Cotter"],correct:2},
    {question:"Which engine component converts reciprocating piston motion into rotary shaft motion?",answers:["Connecting Rod","Crankshaft","Valves","Camshaft"],correct:1},
    {question:"Fluid flow in which fluid particles move in smooth parallel paths is described as...",answers:["Turbulent","Laminar","Rotational","Transitional"],correct:1},
    {question:"What is the unit of mechanical torque in the SI system?",answers:["Newton","Watt","Joule","Newton-meter"],correct:3},
    {question:"What is the primary function of a governor in mechanical engines?",answers:["Smooth out cycles","Control mean speed under load variations","Store fuel","Lubricate bearings"],correct:1},
    {question:"Which gear type is preferred to connect non-parallel, intersecting shafts?",answers:["Spur Gear","Helical Gear","Bevel Gear","Worm Gear"],correct:2},
    {question:"Which heat transfer mechanism occurs through direct molecular contact?",answers:["Convection","Radiation","Conduction","Advection"],correct:2},
    {question:"What is the SI unit of dynamic fluid viscosity?",answers:["Pascal","Pascal-second","Poiseuille-second","Joule-second"],correct:1},
    {question:"What is the average carbon weight content in mild steel?",answers:["0.01% - 0.05%","0.15% - 0.30%","1.0% - 1.5%","2.0% - 4.0%"],correct:1},
    {question:"At a point in a beam where the bending moment is maximum, the shear force is...",answers:["Maximum","Zero","Average","Constant"],correct:1},
    {question:"Hooke's Law of mechanical elasticity remains valid up to the...",answers:["Yield point","Ultimate strength point","Limit of proportionality","Breaking point"],correct:2},
    {question:"A boiler is a mechanical device designed primarily to...",answers:["Compress air","Condense refrigerant","Generate steam","Melt metals"],correct:2},
    {question:"A fluid turbine is defined as a machine that...",answers:["Pumps liquids","Compresses gases","Converts fluid energy to rotary mechanical energy","Heats water"],correct:2},
    {question:"The mass density of pure water is at its maximum temperature of...",answers:["0°C","4°C","100°C","-4°C"],correct:1},
    {question:"Which instrument measures the volume flow rate of a fluid in a pipeline?",answers:["Manometer","Venturimeter","Thermocouple","Hydrometer"],correct:1},
    {question:"The mechanical heat treatment process of heating steel and cooling it slowly is called...",answers:["Quenching","Tempering","Annealing","Nitriding"],correct:2},
    {question:"Under identical compression ratios, which engine cycle has a higher thermal efficiency?",answers:["Otto Cycle","Diesel Cycle","Rankine Cycle","Brayton Cycle"],correct:0},
    {question:"Which coupling is designed to join shafts with small parallel misalignments?",answers:["Universal Coupling","Flange Coupling","Oldham Coupling","Muff Coupling"],correct:2}
  ],
  EEE: [
    {question:"What is the SI unit of electrical conductance?",answers:["Ohm","Siemens","Henry","Farad"],correct:1},
    {question:"Which component in an AC power system steps up or steps down voltage levels?",answers:["Capacitor","Transformer","Inductor","Resistor"],correct:1},
    {question:"Which passive component stores electrical energy in an electrostatic field?",answers:["Inductor","Resistor","Capacitor","Diode"],correct:2},
    {question:"According to Ohm's Law, what is the equation for electrical voltage?",answers:["V = I / R","V = I * R","V = R / I","V = I + R"],correct:1},
    {question:"Which electrical motor is highly preferred for constant speed industrial applications?",answers:["DC Series Motor","Universal Motor","Synchronous Motor","Repulsion Motor"],correct:2},
    {question:"Which electrical device is used to convert AC voltage into DC voltage?",answers:["Inverter","Rectifier","Chopper","Cycloconverter"],correct:1},
    {question:"What is the standard utility AC electricity frequency in India?",answers:["50 Hz","60 Hz","100 Hz","120 Hz"],correct:0},
    {question:"Which component is designed to restrict current flow in an electrical circuit?",answers:["Capacitor","Inductor","Resistor","Diode"],correct:2},
    {question:"Kirchhoff's Current Law (KCL) is based directly on the conservation of...",answers:["Energy","Charge","Momentum","Mass"],correct:1},
    {question:"Kirchhoff's Voltage Law (KVL) is based directly on the conservation of...",answers:["Charge","Mass","Energy","Force"],correct:2},
    {question:"The RMS value of a pure sinusoidal voltage wave with peak value Vm is...",answers:["Vm","Vm / 2","Vm / sqrt(2)","Vm * sqrt(2)"],correct:2},
    {question:"What is the SI unit of electrical inductance?",answers:["Farad","Henry","Weber","Tesla"],correct:1},
    {question:"Which electrical instrument is used to measure electrical active power?",answers:["Voltmeter","Ammeter","Wattmeter","Galvanometer"],correct:2},
    {question:"Which three-terminal semiconductor device acts as a solid-state switch?",answers:["Diode","Resistor","Transistor","Capacitor"],correct:2},
    {question:"In a balanced three-phase star (Y) connection, the line voltage is equal to...",answers:["Phase voltage","sqrt(3) * phase voltage","Phase voltage / sqrt(3)","3 * phase voltage"],correct:1},
    {question:"Which energy losses in a transformer fluctuate based on load currents?",answers:["Hysteresis losses","Eddy current losses","Copper losses","Friction losses"],correct:2},
    {question:"The steel core of a transformer is laminated to minimize...",answers:["Copper losses","Eddy current losses","Hysteresis losses","Windage losses"],correct:1},
    {question:"An electrochemical battery stores electrical energy in the form of...",answers:["Electrostatic energy","Chemical energy","Magnetic energy","Nuclear energy"],correct:1},
    {question:"What is the power factor of a pure resistive AC circuit?",answers:["0","0.5","1.0","0.8"],correct:2},
    {question:"Which alloy metal is preferred for manufacturing heating elements?",answers:["Copper","Aluminum","Nichrome","Tungsten"],correct:2},
    {question:"Which device protects electrical circuits by melting during overcurrent?",answers:["Relay","Fuse","Isolator","Transformer"],correct:1},
    {question:"What is the SI unit of magnetic flux?",answers:["Tesla","Henry","Weber","Gauss"],correct:2},
    {question:"An electrical alternator converts...",answers:["AC to DC","DC to AC","Mechanical energy to AC electrical energy","Electrical energy to heat"],correct:2},
    {question:"Which testing instrument is used to measure high insulation resistances?",answers:["Multimeter","Megger","Wattmeter","Ammeter"],correct:1},
    {question:"An electrical DC generator works on the fundamental principle of...",answers:["Lenz's Law","Faraday's Law of Electromagnetic Induction","Ampere's Law","Coulomb's Law"],correct:1}
  ],
  "BIO TECH": [
    {question:"What does DNA stand for?",answers:["Deoxyribonucleic Acid","Ribonucleic Acid","Dicarbonate Nucleic Acid","Deoxygenated Ribose Acid"],correct:0},
    {question:"Which organism is most commonly used as a host in recombinant DNA cloning experiments?",answers:["E. coli","Saccharomyces cerevisiae","Influenza virus","Amoeba"],correct:0},
    {question:"Which enzyme acts as molecular glue to join two DNA fragments together?",answers:["Amylase","DNA Ligase","RNA Polymerase","Pepsin"],correct:1},
    {question:"Which technique is used to amplify a specific sequence of DNA in vitro?",answers:["Gel Electrophoresis","Polymerase Chain Reaction (PCR)","Western Blotting","Chromatography"],correct:1},
    {question:"What is a bioreactor used for in industrial biotechnology?",answers:["To store radioactive material","To cultivate cells under controlled conditions","To freeze biological samples","To measure atomic mass"],correct:1},
    {question:"Which cellular organelle is referred to as the powerhouse of the cell?",answers:["Nucleus","Ribosome","Mitochondria","Golgi Apparatus"],correct:2},
    {question:"The human genome consists of approximately how many DNA base pairs?",answers:["300,000","3 Million","3 Billion","30 Billion"],correct:2},
    {question:"What is the biological process of translating mRNA into proteins called?",answers:["Transcription","Replication","Translation","Translocation"],correct:2},
    {question:"What is the primary structural component of plant cell walls?",answers:["Starch","Chitin","Cellulose","Glycogen"],correct:2},
    {question:"Which enzyme digests complex starch molecules into simple sugars?",answers:["Amylase","Lipase","Protease","Cellulase"],correct:0},
    {question:"Which of the following vitamins is water-soluble?",answers:["Vitamin A","Vitamin D","Vitamin C","Vitamin K"],correct:2},
    {question:"Which molecular laboratory technique separates DNA fragments based on size?",answers:["Spectrophotometry","Gel Electrophoresis","Centrifugation","Autoclaving"],correct:1},
    {question:"What are the monomer building block units of structural proteins?",answers:["Nucleotides","Fatty Acids","Amino Acids","Monosaccharides"],correct:2},
    {question:"A strand of DNA containing genes compiled from different organisms is called...",answers:["Mutated DNA","Recombinant DNA","Hybridized DNA","Cloned RNA"],correct:1},
    {question:"What is the typical optimal pH level for most biological human enzymes?",answers:["2.0","5.5","7.4","9.8"],correct:2},
    {question:"The first discovered antibiotic Penicillin was isolated from which biological source?",answers:["Bacteria","Fungus / Penicillium","Algae","Yeast"],correct:1},
    {question:"What are the chemical products of yeast fermentation under anaerobic conditions?",answers:["Lactic acid and water","Ethanol and Carbon Dioxide","Acetic acid and oxygen","Methane and nitrogen"],correct:1},
    {question:"Which type of cell division yields four non-identical haploid gamete cells?",answers:["Mitosis","Meiosis","Binary Fission","Budding"],correct:1},
    {question:"Which chemical element is structurally present in all organic compounds?",answers:["Oxygen","Nitrogen","Carbon","Sulfur"],correct:2},
    {question:"The first successfully cloned mammal, Dolly, was cloned from a...",answers:["Mouse","Sheep","Cow","Monkey"],correct:1},
    {question:"Which hormone is responsible for regulating glucose levels in human blood?",answers:["Thyroxine","Adrenaline","Insulin","Estrogen"],correct:2},
    {question:"Which plant cell organelle is responsible for performing photosynthesis?",answers:["Mitochondria","Chloroplast","Vacuole","Lysosome"],correct:1},
    {question:"What is the primary biological site of protein synthesis inside a cell?",answers:["Ribosome","Lysosome","Nucleolus","Centrosome"],correct:0},
    {question:"The mapping and determination of the complete genetic material of an organism is...",answers:["Transcription","Gene Editing","Genome Sequencing","Hybridization"],correct:2},
    {question:"Which biological vector is widely utilized in plant genetic engineering?",answers:["Bacteriophage","Ti Plasmid of Agrobacterium","Cosmid","YAC"],correct:1}
  ]
};

let questions = []; // Dynamic questions array loaded based on department choice
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let userName = "";
let VTUNo = "";
let slotNo = "";
let semester = "";
let selectedDept = "";

let userAnswers = [];
let currentDocId = "";

const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? (window.location.port === '8080' ? '' : 'http://localhost:8080')
  : '';

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
function selectDepartment(deptCode) {
  selectedDept = deptCode;
  
  // Dynamic question load
  questions = questionBank[deptCode] || questionBank.CSE;
  userAnswers = new Array(questions.length).fill(null);
  
  const deptBox = document.getElementById("deptBox");
  const startBox = document.getElementById("startBox");
  
  deptBox.classList.add("slide-out");
  setTimeout(() => {
    deptBox.style.display = "none";
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

timeLeft = 30;

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
  const percent = (timeLeft / 30) * 100;
  progressPath.style.strokeDasharray = `${percent}, 100`;
  timerText.innerText = timeLeft;
  
  if (timeLeft > 15) {
    progressPath.style.stroke = "#ffffff"; // pure white
  } else if (timeLeft > 7) {
    progressPath.style.stroke = "#d6cbf7"; // lavender
  } else {
    progressPath.style.stroke = "#ffd700"; // gold warning
  }
}

if(timeLeft === 0){
nextQuestion();
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
function nextQuestion(){

if(userAnswers[currentQuestion] === null){
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
  alert("Error saving quiz result to database: " + e.message);
}
}

/* CHANGEABLE CERTIFICATE GENERATION */
function downloadCertificate(){

const { jsPDF } = window.jspdf;

const doc = new jsPDF("landscape");

const pageWidth = doc.internal.pageSize.width;
const pageHeight = doc.internal.pageSize.height;

// Fetch dynamic, changeable text fields based on student department
const schoolText = schoolNames[selectedDept] || "School of Computing";
const deptText = deptNames[selectedDept] || "Department of Computer Science and Engineering";
const quizText = quizNames[selectedDept] || "Dynamic HTML Quiz Assessment";

// ===== Certificate Border =====
doc.setDrawColor(0,102,204);
doc.setLineWidth(4);
doc.rect(10,10,pageWidth-20,pageHeight-20);

doc.setLineWidth(1);
doc.rect(15,15,pageWidth-30,pageHeight-30);

// ===== Vel Tech Logo =====
const logoImg = document.getElementById("velTechLogo");
if (logoImg) {
  doc.addImage(logoImg, "PNG", 20, 18, 35, 20);
} else {
  doc.addImage("VelTech.png", "PNG", 20, 18, 35, 20);
}

// ===== University Name =====
doc.setFont("Times","Bold");
doc.setFontSize(20);

doc.text(
"Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology",
pageWidth/2,
40,
{align:"center"}
);

// ===== School (Changeable) =====
doc.setFont("Times","Normal");
doc.setFontSize(16);

doc.text(
schoolText,
pageWidth/2,
52,
{align:"center"}
);

// ===== Department (Changeable) =====
doc.text(
deptText,
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

// ===== Description (Changeable) =====
doc.text(
"For successfully completing the " + quizText,
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
window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.selectAnswer = selectAnswer;
window.downloadCertificate = downloadCertificate;