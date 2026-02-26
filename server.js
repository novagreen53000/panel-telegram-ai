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
<!DOCTYPE html>
<html>
<head>
<title>Accès Privé</title>
<style>
body {
  margin:0;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  color:white;
}

.card {
  background: rgba(255,255,255,0.05);
  padding:40px;
  border-radius:20px;
  backdrop-filter: blur(10px);
  box-shadow:0 20px 40px rgba(0,0,0,0.4);
  text-align:center;
  width:300px;
}

input {
  width:100%;
  padding:12px;
  margin-top:20px;
  border-radius:10px;
  border:none;
  outline:none;
}

button {
  width:100%;
  padding:12px;
  margin-top:20px;
  border:none;
  border-radius:10px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color:white;
  font-size:14px;
  cursor:pointer;
  transition:0.3s;
}

button:hover {
  transform:scale(1.05);
}
</style>
</head>
<body>

<div class="card">
  <h2>🔐 Accès Privé</h2>
  <form>
    <input type="password" name="password" placeholder="Mot de passe"/>
    <button type="submit">Entrer</button>
  </form>
</div>

</body>
</html>
`);

/* 🌍 PAGE PRINCIPALE */
app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
<html>
<head>
<title>Telegram Growth AI</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body {
  margin:0;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color:white;
  text-align:center;
}

.container {
  max-width:600px;
  margin:80px auto;
  padding:40px;
  background: rgba(255,255,255,0.05);
  border-radius:20px;
  backdrop-filter: blur(10px);
  box-shadow:0 20px 40px rgba(0,0,0,0.4);
}

h1 {
  font-size:28px;
  margin-bottom:20px;
}

input, select {
  width:100%;
  padding:12px;
  margin:10px 0;
  border-radius:10px;
  border:none;
  outline:none;
  font-size:14px;
}

button {
  width:100%;
  padding:14px;
  margin-top:20px;
  border:none;
  border-radius:12px;
  font-size:16px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color:white;
  cursor:pointer;
  transition:0.3s;
}

button:hover {
  transform:scale(1.05);
}

#result {
  margin-top:30px;
  background:white;
  color:black;
  padding:20px;
  border-radius:15px;
  text-align:left;
  white-space:pre-wrap;
  animation:fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {opacity:0; transform:translateY(10px);}
  to {opacity:1; transform:translateY(0);}
}

.loader {
  margin-top:20px;
  display:none;
}
</style>
</head>
<body>

<div class="container">
  <h1>🚀 Telegram Growth AI</h1>

  <input id="theme" placeholder="Thème (ex: crypto, business...)">
  <input id="topic" placeholder="Sujet précis">

  <select id="tone">
    <option>Professionnel</option>
    <option>Viral</option>
    <option>Agressif</option>
    <option>Storytelling</option>
  </select>

  <button onclick="generate()">Générer le post</button>

  <div class="loader" id="loader">⏳ Génération en cours...</div>
  <div id="result"></div>
</div>

<script>
async function generate(){
  const theme = document.getElementById("theme").value;
  const topic = document.getElementById("topic").value;
  const tone = document.getElementById("tone").value;

  document.getElementById("loader").style.display = "block";
  document.getElementById("result").innerText = "";

  const response = await fetch("/generate", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({theme,topic,tone})
  });

  const data = await response.json();

  document.getElementById("loader").style.display = "none";
  document.getElementById("result").innerText = data.result || data.error;
}
</script>

</body>
</html>
`);
🎯 Ensuite :

Sauvegarde

git add .

git commit -m "UI premium"

git push

Render redeploie automatiquement.

🔥 Résultat :

Tu auras :

Interface SaaS

Animations

Loader

Design moderne

Look crédible pour pub TikTok

🚀 Étape suivante (après ça)

On améliore le PROMPT pour qu’il devienne vraiment addictif.

Puis :
Landing page séparée.
Puis :
Stripe.

Dis-moi quand c’est déployé.

On transforme ton outil en machine à cash étape par étape 😈🔥

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