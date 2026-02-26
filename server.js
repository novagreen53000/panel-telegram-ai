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




/* 🌍 PAGE PRINCIPALE */
app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Panel Telegram AI</title>

<style>
body{
  margin:0;
  font-family:Arial, sans-serif;
  background: linear-gradient(135deg,#0f172a,#1e293b);
  color:white;
  text-align:center;
}

.hero{
  padding:100px 20px 60px 20px;
}

.hero h1{
  font-size:42px;
  margin-bottom:20px;
}

.hero p{
  font-size:18px;
  opacity:0.8;
  max-width:600px;
  margin:auto;
}

.cta-btn{
  margin-top:30px;
  padding:15px 30px;
  font-size:16px;
  border:none;
  border-radius:8px;
  background:#7c3aed;
  color:white;
  cursor:pointer;
  transition:0.3s;
}

.cta-btn:hover{
  background:#6d28d9;
  transform:scale(1.05);
}

.generator{
  background:#1e293b;
  padding:40px;
  border-radius:12px;
  width:90%;
  max-width:500px;
  margin:60px auto;
  box-shadow:0 20px 40px rgba(0,0,0,0.4);
}

input, select{
  width:100%;
  padding:12px;
  margin:10px 0;
  border-radius:6px;
  border:none;
}

.generate-btn{
  width:100%;
  padding:12px;
  border:none;
  border-radius:6px;
  background:#7c3aed;
  color:white;
  cursor:pointer;
  transition:0.3s;
}

.generate-btn:hover{
  background:#6d28d9;
  transform:scale(1.03);
}

#result{
  margin-top:20px;
  background:white;
  color:black;
  padding:15px;
  border-radius:8px;
  text-align:left;
  white-space:pre-line;
}

.features{
  padding:80px 20px;
  background:#0f172a;
}

.features h2{
  font-size:32px;
  margin-bottom:50px;
}

.feature-box{
  background:#1e293b;
  padding:30px;
  border-radius:12px;
  width:260px;
  transition:0.3s;
}

.feature-box:hover{
  transform:translateY(-5px);
  box-shadow:0 10px 30px rgba(0,0,0,0.4);
}

.feature-container{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:40px;
  max-width:1000px;
  margin:auto;
}
</style>
</head>

<body>

<div class="hero">
  <h1>🚀 Crée des posts Telegram viraux en 10 secondes</h1>
  <p>Une intelligence artificielle conçue pour augmenter ton engagement, attirer plus d’abonnés et monétiser ton audience.</p>
  <button class="cta-btn" onclick="document.getElementById('generator').scrollIntoView({behavior:'smooth'})">
    Tester gratuitement
  </button>
</div>

<div class="generator" id="generator">
  <h2>Panel Telegram AI</h2>

  <input id="theme" placeholder="Thème">
  <input id="topic" placeholder="Sujet">

  <select id="tone">
    <option>Professionnel</option>
    <option>Viral</option>
    <option>Agressif</option>
    <option>Storytelling</option>
  </select>

  <button class="generate-btn" onclick="generate()">Générer</button>

  <div id="result"></div>
</div>

<div class="features">
  <h2>Pourquoi utiliser Panel Telegram AI ?</h2>

  <div class="feature-container">

    <div class="feature-box">
      <h3>🔥 Plus d'engagement</h3>
      <p>Des posts optimisés pour capter l’attention et augmenter les réactions sur Telegram.</p>
    </div>

    <div class="feature-box">
      <h3>⚡ Gain de temps</h3>
      <p>Crée du contenu en quelques secondes au lieu de passer des heures à rédiger.</p>
    </div>

    <div class="feature-box">
      <h3>💰 Monétisation</h3>
      <p>Attire plus d’abonnés et transforme ton audience en revenus.</p>
    </div>

  </div>
</div>

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