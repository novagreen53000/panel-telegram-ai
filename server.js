const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let visitors = 0;
let audits = 0;

app.use((req, res, next) => {
  visitors++;
  next();
});

/* ===============================
   LANDING PREMIUM WAWW
================================ */

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SuppScale</title>

<style>
body{
  margin:0;
  font-family:Arial, sans-serif;
  background:#0a0f1c;
  color:white;
  text-align:center;
}
header{
  display:flex;
  justify-content:space-between;
  padding:20px 40px;
}
.logo{
  font-size:22px;
  font-weight:bold;
  color:#8b5cf6;
}
.lang{
  cursor:pointer;
}
.hero{
  padding:120px 20px;
}
.hero h1{
  font-size:48px;
  background:linear-gradient(90deg,#7c3aed,#22d3ee);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.btn{
  padding:15px 30px;
  background:#7c3aed;
  border:none;
  border-radius:8px;
  color:white;
  cursor:pointer;
  margin-top:20px;
  font-size:16px;
  box-shadow:0 0 20px #7c3aed;
}
.section{
  padding:80px 20px;
}
.card{
  background:#111827;
  padding:30px;
  border-radius:12px;
  max-width:500px;
  margin:30px auto;
  box-shadow:0 0 30px rgba(124,58,237,0.3);
}
.score{
  font-size:70px;
  color:#22d3ee;
  margin-bottom:10px;
}
input, textarea{
  width:80%;
  padding:12px;
  margin:10px 0;
  border-radius:6px;
  border:none;
}
.stats{
  display:flex;
  justify-content:center;
  gap:40px;
  flex-wrap:wrap;
}
.stat{
  font-size:18px;
}
</style>
</head>

<body>

<header>
  <div class="logo">SUPPSCALE</div>
  <div>
    <span class="lang" onclick="setLang('en')">EN</span> |
    <span class="lang" onclick="setLang('fr')">FR</span>
  </div>
</header>

<div class="hero">
  <h1 id="title">Dominate Amazon Supplement Rankings</h1>
  <p id="subtitle">Advanced listing optimization tool for serious sellers.</p>
  <button class="btn" onclick="scrollToAudit()" id="cta">Run Free Audit</button>
</div>

<div class="section">
  <div class="stats">
    <div class="stat">+217 Sellers</div>
    <div class="stat">+12% Avg Conversion</div>
    <div class="stat">AI Keyword Engine</div>
  </div>
</div>

<div class="section" id="audit">
  <h2 id="auditTitle">Free Supplement Audit</h2>
  <input id="product" placeholder="Product Title">
  <textarea id="bullets" placeholder="Bullet Points"></textarea>
  <br>
  <button class="btn" onclick="runAudit()" id="generate">Generate Audit</button>
  <div id="result"></div>
</div>

<script>

let currentLang = "en";

function setLang(lang){
  currentLang = lang;

  if(lang === "fr"){
    document.getElementById("title").innerText = "Dominez le classement Amazon";
    document.getElementById("subtitle").innerText = "Outil avancé d'optimisation pour vendeurs sérieux.";
    document.getElementById("cta").innerText = "Audit Gratuit";
    document.getElementById("auditTitle").innerText = "Audit Gratuit";
    document.getElementById("generate").innerText = "Générer Audit";
  } else {
    document.getElementById("title").innerText = "Dominate Amazon Supplement Rankings";
    document.getElementById("subtitle").innerText = "Advanced listing optimization tool for serious sellers.";
    document.getElementById("cta").innerText = "Run Free Audit";
    document.getElementById("auditTitle").innerText = "Free Supplement Audit";
    document.getElementById("generate").innerText = "Generate Audit";
  }
}

function scrollToAudit(){
  document.getElementById("audit").scrollIntoView({behavior:"smooth"});
}

async function runAudit(){
  const response = await fetch("/api/audit", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({})
  });

  const data = await response.json();

  let score = 0;
  const target = data.overall;

  const interval = setInterval(() => {
    score++;
    document.getElementById("result").innerHTML = \`
      <div class="card">
        <div class="score">\${score}/100</div>
        <p>SEO: \${data.seo}</p>
        <p>Conversion: \${data.conversion}</p>
        <button class="btn" onclick="window.print()">Export PDF</button>
      </div>
    \`;
    if(score >= target){
      clearInterval(interval);
    }
  }, 20);
}

</script>

</body>
</html>
`);
});

/* ===============================
   API AUDIT
================================ */

app.post("/api/audit", (req, res) => {
  audits++;

  const randomScore = Math.floor(Math.random() * 30) + 70;

  res.json({
    overall: randomScore,
    seo: randomScore - 5,
    conversion: randomScore + 3
  });
});

/* ===============================
   ADMIN
================================ */

app.get("/admin", (req, res) => {
  res.send(\`
  <html>
  <body style="background:#0a0f1c;color:white;text-align:center;padding:50px;">
  <h1>Admin Dashboard</h1>
  <p>Total Visitors: \${visitors}</p>
  <p>Total Audits: \${audits}</p>
  </body>
  </html>
  \`);
});

app.listen(PORT, () => {
  console.log("SuppScale running on port " + PORT);
});