const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const PASSWORD = "panel2026";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* 🔐 PROTECTION MOT DE PASSE */
app.use((req, res, next) => {
  if (req.path === "/generate") return next();

  const password = req.query.password;

  if (password !== PASSWORD) {
    return res.send(`
      <h2 style="text-align:center;margin-top:100px;">🔐 Accès privé</h2>
      <form style="text-align:center;">
        <input type="password" name="password" placeholder="Mot de passe"/>
        <button type="submit">Entrer</button>
      </form>
    `);
  }

  next();
});

/* 🌍 PAGE PRINCIPALE */
app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
  <title>Panel Telegram AI</title>
  </head>
  <body style="background:#0f172a;color:white;font-family:Arial;text-align:center;padding:40px;">
  <h1>🚀 Panel Telegram AI</h1>

  <input id="theme" placeholder="Thème"><br/><br/>
  <input id="topic" placeholder="Sujet"><br/><br/>

  <select id="tone">
    <option>Professionnel</option>
    <option>Viral</option>
    <option>Agressif</option>
    <option>Storytelling</option>
  </select><br/><br/>

  <button onclick="generate()">Générer</button>

  <div id="result" style="margin-top:30px;background:white;color:black;padding:20px;border-radius:10px;"></div>

  <script>
  async function generate(){
    const theme = document.getElementById("theme").value;
    const topic = document.getElementById("topic").value;
    const tone = document.getElementById("tone").value;

    const response = await fetch("/generate", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({theme,topic,tone})
    });

    const data = await response.json();
    document.getElementById("result").innerText = data.result || data.error;
  }
  </script>
  </body>
  </html>
  `);
});

/* 🤖 GENERATION */
app.post("/generate", async (req, res) => {
  try {
    const { theme, topic, tone } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 500,
      messages: [
        { role: "system", content: "Tu es un expert en création de posts Telegram viraux." },
        {
          role: "user",
          content: `
Thème: ${theme}
Sujet: ${topic}
Ton: ${tone}

Génère un post Telegram optimisé et engageant.
          `
        }
      ]
    });

    res.json({ result: completion.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur génération" });
  }
});
console.log("API KEY loaded:", process.env.OPENAI_API_KEY ? "YES" : "NO");
app.listen(PORT, () => {
  console.log("Serveur lancé");
});