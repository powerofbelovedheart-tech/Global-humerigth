const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// statiske filer fra /public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// AI-endepunkt
app.post("/ask", async (req, res) => {
  try {
    const question = (req.body?.question || "").toString().slice(0, 2000);

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Svar på norsk, kort og tydelig som en veiviser i rettigheter." },
          { role: "user", content: question }
        ],
        temperature: 0.2
      })
    });

    const data = await openaiRes.json();
    const answer =
      data?.choices?.[0]?.message?.content || "Ingen svar fra AI.";
    res.json({ answer });
  } catch (e) {
    console.error(e);
    res.status(500).json({ answer: "Feil på serveren." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Kjører på http://localhost:${PORT}`);
});
