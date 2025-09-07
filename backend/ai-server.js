// ai-server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
const PORT = 3031;

// ✅ Enable CORS for all origins (frontend can call without issues)
app.use(cors());

// ✅ Middleware to parse JSON
app.use(bodyParser.json());

// ✅ OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check endpoint
app.get("/", (req, res) => {
  res.send("AI Chat server is running!");
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI Tax Assistant." },
        { role: "user", content: message },
      ],
      max_tokens: 500,
    });

    const reply = completion.choices?.[0]?.message?.content || "No reply from AI";

    res.json({ reply });
  } catch (error) {
    console.error("❌ Error in /api/chat:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong on the server" });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ AI Chat server running on http://localhost:${PORT}`);
});
