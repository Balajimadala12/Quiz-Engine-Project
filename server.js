const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "admin123";
const adminToken = '_' + Math.random().toString(36).substr(2, 9);

function requireAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader === `Bearer ${adminToken}`) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden: Unauthorized administrative access" });
  }
}

app.use(express.static(__dirname));

const DB_FILE = path.join(__dirname, 'db.json');
const QUESTIONS_FILE = path.join(__dirname, 'questions.json');

// Helper to read DB
function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

// Helper to write DB
function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Helper to read Questions
function readQuestions() {
  if (!fs.existsSync(QUESTIONS_FILE)) {
    fs.writeFileSync(QUESTIONS_FILE, JSON.stringify({}));
  }
  try {
    return JSON.parse(fs.readFileSync(QUESTIONS_FILE, 'utf8'));
  } catch (e) {
    return {};
  }
}

// Helper to write Questions
function writeQuestions(data) {
  fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(data, null, 2));
}

// POST admin passcode login
app.post('/api/admin/login', (req, res) => {
  if (req.body && req.body.passcode === ADMIN_PASSCODE) {
    res.json({ success: true, token: adminToken });
  } else {
    res.status(401).json({ error: "Invalid passcode" });
  }
});

// GET all results
app.get('/api/results', (req, res) => {
  res.json(readDb());
});

// GET all questions
app.get('/api/questions', (req, res) => {
  res.json(readQuestions());
});

// POST save entire questions bank
app.post('/api/questions', requireAdmin, (req, res) => {
  try {
    writeQuestions(req.body);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to write questions database: " + e.message });
  }
});

// POST create result (Start Quiz)
app.post('/api/results', (req, res) => {
  const db = readDb();
  const newRecord = {
    id: '_' + Math.random().toString(36).substr(2, 9),
    name: req.body.name,
    vtuNo: req.body.vtuNo,
    slot: req.body.slot,
    semester: req.body.semester,
    department: req.body.department || 'N/A',
    subject: req.body.subject || 'N/A',
    score: req.body.score || 0,
    total: req.body.total || 25,
    percentage: req.body.percentage || "0.0",
    status: req.body.status || "In Progress",
    date: req.body.date || new Date().toLocaleString()
  };
  db.push(newRecord);
  writeDb(db);
  res.status(201).json(newRecord);
});

// PUT update result (Finish Quiz)
app.put('/api/results/:id', (req, res) => {
  const db = readDb();
  const recordIndex = db.findIndex(r => r.id === req.params.id);
  if (recordIndex !== -1) {
    db[recordIndex] = {
      ...db[recordIndex],
      score: req.body.score,
      percentage: req.body.percentage,
      status: "Completed",
      date: req.body.date || new Date().toLocaleString()
    };
    writeDb(db);
    res.json(db[recordIndex]);
  } else {
    res.status(404).json({ error: "Record not found" });
  }
});

// DELETE result
app.delete('/api/results/:id', requireAdmin, (req, res) => {
  let db = readDb();
  db = db.filter(r => r.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express Server running on port ${PORT}`);
});
