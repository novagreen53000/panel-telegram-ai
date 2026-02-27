addEventListener("scroll",function(){
reveals.forEach(function(section){
const top=section.getBoundingClientRect().top;
if(top<window.innerHeight-100){
section.classList.add("visible");
}
});
});

function setLang(lang){
if(lang==="en"){
document.getElementById("title").innerText="Dominate Amazon with AI";
document.getElementById("subtitle").innerText="Premium tool for ambitious sellers";
document.getElementById("auditBtn").innerText="Free Audit";
document.getElementById("demoTitle").innerText="🎥 Demo";
document.getElementById("reviewTitle").innerText="⭐ Client Reviews";
}else{
document.getElementById("title").innerText="Dominez Amazon avec l'IA";
document.getElementById("subtitle").innerText="Outil premium pour vendeurs ambitieux";
document.getElementById("auditBtn").innerText="Audit Gratuit";
document.getElementById("demoTitle").innerText="🎥 Démonstration";
document.getElementById("reviewTitle").innerText="⭐ Avis Clients";
}
}
</script>

</body>
</html>`);
});

/* ================= AUDIT PAGE ================= */

app.get("/audit", (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Audit Amazon</title>
<style>
body{margin:0;font-family:Arial;background:#0f172a;color:white;text-align:center;padding:60px;}
input{padding:12px;width:280px;border-radius:8px;border:none;margin-top:20px;}
button{padding:12px 25px;border:none;border-radius:8px;background:#7c3aed;color:white;margin-top:20px;}
.badge{background:#22d3ee;padding:8px 15px;border-radius:20px;display:inline-block;margin-bottom:20px;}
</style>
</head>
<body>
<div class="badge">FREE AMAZON AUDIT</div>
<h1>Analysez votre ASIN</h1>
<form action="/audit-result" method="POST">
<input name="asin" required placeholder="Entrez votre ASIN">
<br>
<button type="submit">Lancer Audit</button>
</form>
</body>
</html>`);
});

/* ================= AUDIT RESULT ================= */

app.post("/audit-result", (req, res) => {

audits++;

const asin = req.body.asin || "";
const lengthScore = asin.length;

let seoScore = Math.min(100, 40 + lengthScore * 3 + Math.floor(Math.random()*20));
let conversionScore = Math.min(100, 35 + lengthScore * 2 + Math.floor(Math.random()*25));
let imageScore = Math.min(100, 50 + Math.floor(Math.random()*40));
let globalScore = Math.floor((seoScore + conversionScore + imageScore) / 3);

let recommendation =
globalScore < 60 ? "Optimisation urgente recommandée." :
globalScore < 80 ? "Bon potentiel, améliorations possibles." :
"Listing performant, optimisation avancée possible.";

res.send(`<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Résultat Audit</title>
<style>
body{margin:0;font-family:Arial;background:#0f172a;color:white;text-align:center;padding:40px;}
.score{font-size:48px;margin:20px 0;color:#22d3ee;}
.card{background:#111c33;padding:20px;border-radius:12px;margin:15px auto;max-width:400px;}
button{padding:12px 25px;border:none;border-radius:8px;background:#7c3aed;color:white;margin-top:20px;}
</style>
</head>
<body>

<h1>Résultat Audit ASIN</h1>
<div class="score">${globalScore}/100</div>

<div class="card">SEO Score : ${seoScore}/100</div>
<div class="card">Conversion Score : ${conversionScore}/100</div>
<div class="card">Image Score : ${imageScore}/100</div>

<p>${recommendation}</p>

<button onclick="alert('Version Premium bientôt disponible')">Passer en Premium</button>
<br><br>
<a href="/">Retour</a>

</body>
</html>`);
});

/* ================= ADMIN ================= */

app.get("/admin-pro",(req,res)=>{
res.json({
visitors,
audits,
subscriptions,
conversion: visitors>0 ? ((subscriptions/visitors)*100).toFixed(2) : 0
});
});

app.listen(PORT, () => console.log("SuppScale running stable"));
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DATA ================= */

let visitors = 0;
let audits = 0;
let subscriptions = 0;

let visitsHistory = [];
let auditsHistory = [];

app.use((req, res, next) => {
  visitors++;
  next();
});

setInterval(() => {
  visitsHistory.push(visitors);
  auditsHistory.push(audits);
  if (visitsHistory.length > 20) {
    visitsHistory.shift();
    auditsHistory.shift();
  }
}, 5000);

/* ================= LANDING ================= */

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SuppScale - Audit Amazon IA</title>
<meta name="description" content="Audit Amazon IA, optimisation listing, améliorez vos ventes Amazon grâce à l'intelligence artificielle.">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
<style>
body{
margin:0;
font-family:'Poppins',sans-serif;
background:linear-gradient(-45deg,#0f172a,#1e293b,#0f172a,#111827);
background-size:400% 400%;
animation:gradientMove 15s ease infinite;
color:white;
overflow-x:hidden;
}

@keyframes gradientMove{
0%{background-position:0% 50%;}
50%{background-position:100% 50%;}
100%{background-position:0% 50%;}
}

.lang-switch{
position:fixed;
top:20px;
right:20px;
font-weight:bold;
cursor:pointer;
}

section{
padding:100px 20px;
text-align:center;
opacity:0;
transform:translateY(40px);
transition:all 1s ease;
}

section.visible{
opacity:1;
transform:translateY(0);
}

h1{
font-size:48px;
background:linear-gradient(90deg,#22d3ee,#7c3aed);
-webkit-background-clip:text;
color:transparent;
}

button{
padding:15px 35px;
border:none;
border-radius:12px;
background:linear-gradient(90deg,#7c3aed,#22d3ee);
color:white;
font-weight:600;
cursor:pointer;
transition:0.3s;
}

.video-container{
max-width:800px;
margin:40px auto;
border-radius:20px;
overflow:hidden;
}

iframe{
width:100%;
height:450px;
border:none;
}

.reviews{
display:flex;
flex-wrap:wrap;
justify-content:center;
gap:30px;
}

.review-card{
background:rgba(255,255,255,0.05);
padding:30px;
border-radius:20px;
width:280px;
}

.stats{
display:flex;
justify-content:center;
gap:50px;
flex-wrap:wrap;
font-size:28px;
font-weight:bold;
}
</style>
</head>

<body>

<div class="lang-switch">
<span onclick="setLang('fr')">FR</span> | 
<span onclick="setLang('en')">EN</span>
</div>

<section class="reveal">
<h1 id="title">Dominez Amazon avec l'IA</h1>
<p id="subtitle">Outil premium pour vendeurs ambitieux</p>
<button onclick="window.location.href='/audit'" id="auditBtn">Audit Gratuit</button>
</section>

<section class="reveal">
<h2 id="demoTitle">🎥 Démonstration</h2>
<div class="video-container">
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
</div>
</section>

<section class="reveal">
<h2 id="reviewTitle">⭐ Avis Clients</h2>
<div class="reviews">
<div class="review-card">
<p>"+37% de conversion en 30 jours."</p>
<strong>Lucas M.</strong>
</div>
<div class="review-card">
<p>"Meilleur outil pour optimiser mes listings."</p>
<strong>Sophie R.</strong>
</div>
<div class="review-card">
<p>"ROI incroyable dès la première semaine."</p>
<strong>David K.</strong>
</div>
</div>
</section>

<section class="reveal">
<h2>📊 Résultats</h2>
<div class="stats">
<div><span id="stat1">0</span>+ users</div>
<div><span id="stat2">0</span>% ROI</div>
<div><span id="stat3">0</span> audits</div>
</div>
</section>

<script>
function animateValue(id,end,duration){
let start=0;
let current=start;
let increment=1;
let stepTime=Math.floor(duration/end);
let obj=document.getElementById(id);
let timer=setInterval(function(){
current+=increment;
obj.textContent=current;
if(current>=end){
clearInterval(timer);
}
},stepTime);
}

animateValue("stat1",1200,2000);
animateValue("stat2",87,2000);
animateValue("stat3",5300,2000);

const reveals=document.querySelectorAll(".reveal");
window.