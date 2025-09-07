// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/itr/generate", (req, res) => {
  console.log("✅ ITR Generation request received");
  // yaha tum actual logic ya DB save kar sakte ho
  res.json({ success: true, message: "ITR JSON generated successfully!" });
});

const PORT = 3031;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
