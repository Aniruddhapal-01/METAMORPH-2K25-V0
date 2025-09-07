// // server.js
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");

// const app = express();
// const PORT = 3001; // One port for frontend + backend

// app.use(cors());
// app.use(bodyParser.json());

// // ------------------- In-memory DB -------------------
// let users = [];

// // ------------------- SIGNUP -------------------
// app.post("/api/signup", (req, res) => {
//   const { name, email, phone, aadhaar, pan } = req.body;

//   if (!name || !email || !phone || !aadhaar || !pan) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const userExists = users.find((u) => u.pan === pan || u.aadhaar === aadhaar);
//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const newUser = { name, email, phone, aadhaar, pan };
//   users.push(newUser);

//   return res.status(201).json({ message: "Signup successful", user: newUser });
// });

// // ------------------- LOGIN -------------------
// app.post("/api/login", (req, res) => {
//   const { aadhaar, pan } = req.body;

//   if (!aadhaar || !pan) {
//     return res.status(400).json({ message: "Aadhaar and PAN are required" });
//   }

//   const user = users.find((u) => u.aadhaar === aadhaar && u.pan === pan);
//   if (!user) {
//     return res.status(401).json({ message: "Invalid Aadhaar or PAN" });
//   }

//   return res.json({ message: "Login successful", user });
// });

// // ------------------- Serve React Frontend -------------------
// app.use(express.static(path.join(__dirname, "dist"))); // dist = build folder

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// // ------------------- START SERVER -------------------
// app.listen(PORT, () => {
//   console.log(`✅ App (frontend + backend) running at http://localhost:${PORT}`);
// });



// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();   // ✅ Declare first
const PORT = 3001;       // Run backend on 3001

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory DB (replace with MongoDB/MySQL in real project)
let users = [];

// ------------------- SIGNUP -------------------
app.post("/api/signup", (req, res) => {
  const { name, email, phone, aadhaar, pan } = req.body;

  if (!name || !email || !phone || !aadhaar || !pan) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = users.find((u) => u.pan === pan || u.aadhaar === aadhaar);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { name, email, phone, aadhaar, pan };
  users.push(newUser);

  return res.status(201).json({ message: "Signup successful", user: newUser });
});

// ------------------- LOGIN -------------------
app.post("/api/login", (req, res) => {
  const { aadhaar, pan } = req.body;

  if (!aadhaar || !pan) {
    return res.status(400).json({ message: "Aadhaar and PAN are required" });
  }

  const user = users.find((u) => u.aadhaar === aadhaar && u.pan === pan);
  if (!user) {
    return res.status(401).json({ message: "Invalid Aadhaar or PAN" });
  }

  return res.json({ message: "Login successful", user });
});

// ------------------- START SERVER -------------------
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
