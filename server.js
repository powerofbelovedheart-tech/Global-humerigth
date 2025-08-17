// server.js  (Node 18+ anbefales)
// Installer først: npm init -y && npm install express dotenv

const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1) Server statiske filer fra /public (index.html, script.js, css)
app.use(express.static(path.join(__dirname, "public")));

// 2) Tillat JSON-body
app.use(express.json());

// 3) AI-endepunkt
app.post("/ask", async (req, res) => {
  try {
    const question = (req.body?.question || "").toString().slice(0, 2000);

    // Bruk Node 18+ (har global fetch). Har du eldre Node, se note under.
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Du er en hjelpsom norsk veiviser i rettigheter. Svar kort, tydelig og praktisk med neste steg og relevante rettigheter. Ikke gi juridisk rådgivning—bare veiledning."
          },
          { role: "user", content: question }
        ],
        temperature: 0.2
      })
    });

    if (!openaiRes.ok) {
      const errTxt = await openaiRes.text();
      console.error("OpenAI-feil:", errTxt);
      return res.status(500).json({
        answer: "Beklager, klarte ikke hente svar fra AI akkurat nå."
      });
    }

    const data = await openaiRes.json();
    const answer =
      data?.choices?.[0]?.message?.content || "Fikk ikke svar fra modellen.";
    res.json({ answer });
  } catch (e) {
    console.error(e);
    res.status(500).json({ answer: "Uventet feil. Prøv igjen om litt." });
  }
});

// 4) Start serveren
app.listen(PORT, () => {
  console.log(`🚀 Server kjører: http://localhost:${PORT}`);
});
