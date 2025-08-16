// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// POST endpoint som nettsiden kan spørre
app.post("/ask", async (req, res) => {
  const { question } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Du er en hjelpsom AI som forklarer rettigheter på en enkel måte." },
        { role: "user", content: question }
      ]
    })
  });

  const data = await response.json();
  res.json({ answer: data.choices[0].message.content });
});

app.listen(3000, () => console.log("🚀 Server kjører på http://localhost:3000"));
