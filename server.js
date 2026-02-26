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
<html>
<head>
<title>Panel Telegram AI</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body{
  margin:0;
  font-family:Arial, sans-serif;
  background: linear-gradient(135deg,#0f172a,#1e293b);
  color:white;
  text-align:center;
}

.hero{
  padding:80px 20px;
}

.hero h1{
  font-size:42px;
  margin-bottom:20px;
}

.badge{
  display:inline-block;
  margin-top:10px;
  background:#ff4d4d;
  padding:6px 12px;
  border-radius:20px;
  font-size:12px;
}

.generator{
  background:#1e293b;
  padding:40px;
  border-radius:12px;
  width:90%;
  max-width:500px;
  margin:40px auto;
  box-shadow:0 20px 40px rgba(0,0,0,0.3);
}

input, select{
  width:100%;
  padding:10px;
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

.counter{
  margin-bottom:15px;
  font-weight:bold;
}

.features{
  padding:80px 20px;
}

.features h2{
  margin-bottom:50px;
  font-size:32px;
}

.feature-container{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:30px;
  max-width:1000px;
  margin:auto;
}

.feature-box{
  background:#1e293b;
  padding:30px;
  border-radius:15px;
  width:280px;
  box-shadow:0 15px 30px rgba(0,0,0,0.3);
}
</style>
</head>

<body>

<div class="hero">
  <h1>🚀 Crée des posts Telegram viraux en 10 secondes</h1>
  <div class="badge">🔥 Version Premium Disponible</div>
</div>

<div class="generator">
  <h2>Panel Telegram AI</h2>
  <div id="counter" class="counter"></div>

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

<!-- SECTION AVANTAGES -->

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

let maxFree = 1;

function updateCounter(){
  let count = localStorage.getItem("usageCount");
  count = count ? parseInt(count) : 0;

  const counter = document.getElementById("counter");

  if(count >= maxFree){
    counter.innerHTML = "🔒 Limite gratuite atteinte";
    counter.style.color = "#ff4d4d";
  } else {
    counter.innerHTML = "🎁 1 post gratuit restant";
  }
}

async function generate(){

  let count = localStorage.getItem("usageCount");
  count = count ? parseInt(count) : 0;

  const button = document.querySelector(".generate-btn");
  const resultDiv = document.getElementById("result");

  if(count >= maxFree){
    resultDiv.innerHTML = \`
      <div style="padding:20px;text-align:center;">
        <h3>🚫 Version gratuite limitée à 1 post</h3>
        <p>Passe Premium pour accès illimité.</p>
        <a href="https://checkout.revolut.com/pay/b008278a-bdb2-43bc-92ff-bb01e8e75831" target="_blank"
           style="display:inline-block;margin-top:15px;padding:12px 20px;
           background:#7c3aed;color:white;border-radius:8px;text-decoration:none;">
           🔓 Débloquer la version Premium – 19€
        </a>
      </div>
    \`;
    return;
  }

  const theme = document.getElementById("theme").value;
  const topic = document.getElementById("topic").value;
  const tone = document.getElementById("tone").value;

  button.disabled = true;
  button.innerText = "⏳ Génération en cours...";
  resultDiv.innerText = "";

  try {

    const response = await fetch("/generate", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({theme,topic,tone})
    });

    const data = await response.json();

    resultDiv.innerHTML = \`
      <div id="generatedText">\${data.result || data.error}</div>
      <button onclick="copyText()" 
              style="margin-top:15px;padding:10px 15px;
              background:#7c3aed;color:white;border:none;border-radius:6px;cursor:pointer;">
              📋 Copier le post
      </button>
    \`;

    count++;
    localStorage.setItem("usageCount", count);
    updateCounter();

  } catch (error) {
    resultDiv.innerText = "Erreur serveur.";
  }

  button.disabled = false;
  button.innerText = "Générer";
}

function copyText(){
  const text = document.getElementById("generatedText").innerText;
  navigator.clipboard.writeText(text);
  alert("Post copié !");
}

window.onload = updateCounter;

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