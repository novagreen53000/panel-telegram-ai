nnerHeight-100){
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
document.getElementById("resultTitle").innerText="📊 Results";
}else{
document.getElementById("title").innerText="Dominez Amazon avec l'IA";
document.getElementById("subtitle").innerText="Outil premium pour vendeurs ambitieux";
document.getElementById("auditBtn").innerText="Audit Gratuit";
document.getElementById("demoTitle").innerText="🎥 Démonstration";
document.getElementById("reviewTitle").innerText="⭐ Avis Clients";
document.getElementById("resultTitle").innerText="📊 Résultats";
}
}

</script>

</body>
</html>`);
});

/* ================= AUDIT ================= */

app.get("/audit",(req,res)=>{
res.send(\`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Audit Amazon</title>
<style>
body{margin:0;font-family:Arial;background:#0f172a;color:white;text-align:center;padding:100px;}
input{padding:12px;width:280px;border-radius:8px;border:none;}
button{padding:12px 25px;border:none;border-radius:8px;background:#7c3aed;color:white;margin-top:20px;}
.badge{background:#22d3ee;padding:8px 20px;border-radius:20px;display:inline-block;margin-bottom:20px;}
</style>
</head>
<body>

<div class="badge">FREE AMAZON AUDIT</div>
<h1>Analysez votre ASIN</h1>

<form action="/audit-result" method="POST">
<input name="asin" required placeholder="Entrez votre ASIN">
<br><br>
<button type="submit">Lancer Audit</button>
</form>

</body>
</html>
\`);
});

/* ================= RESULT ================= */

app.post("/audit-result",(req,res)=>{
audits++;

res.send(\`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Résultat</title>
<style>
body{margin:0;font-family:Arial;background:#0f172a;color:white;text-align:center;padding:100px;}
.score{font-size:48px;color:#22d3ee;margin:20px;}
button{padding:12px 25px;border:none;border-radius:8px;background:#7c3aed;color:white;margin-top:20px;}
</style>
</head>
<body>

<h1>Audit terminé</h1>
<div class="score">\${Math.floor(Math.random()*40+60)}/100</div>

<button onclick="window.location.href='/'">Retour</button>

</body>
</html>
\`);
});

/* ================= ADMIN ================= */

app.get("/admin",(req,res)=>{
res.json({visitors,audits,subscriptions});
});

app.listen(PORT,()=>console.log("Server running stable"));
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
<title>SuppScale</title>

<style>
body{
margin:0;
font-family:Arial;
background:linear-gradient(-45deg,#0f172a,#1e293b,#0f172a,#111827);
background-size:400% 400%;
animation:gradientMove 15s ease infinite;
color:white;
overflow-x:hidden;
text-align:center;
}

@keyframes gradientMove{
0%{background-position:0% 50%;}
50%{background-position:100% 50%;}
100%{background-position:0% 50%;}
}

section{
padding:100px 20px;
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
font-weight:bold;
cursor:pointer;
margin-top:20px;
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
padding:25px;
border-radius:20px;
width:260px;
}

.stats{
display:flex;
justify-content:center;
gap:50px;
flex-wrap:wrap;
font-size:28px;
font-weight:bold;
}

.lang-switch{
position:fixed;
top:20px;
right:20px;
font-weight:bold;
cursor:pointer;
}

.badge{
background:#22d3ee;
padding:8px 20px;
border-radius:20px;
display:inline-block;
margin-bottom:20px;
}
</style>
</head>

<body>

<div class="lang-switch">
<span onclick="setLang('fr')">FR</span> | 
<span onclick="setLang('en')">EN</span>
</div>

<section class="reveal">
<div class="badge">AI POWERED</div>
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
<h2 id="resultTitle">📊 Résultats</h2>
<div class="stats">
<div><span id="stat1">0</span>+ users</div>
<div><span id="stat2">0</span>% ROI</div>
<div><span id="stat3">0</span> audits</div>
</div>
</section>

<script>

function animateValue(id,end,duration){
let start=0;
let range=end-start;
let current=start;
let increment=1;
let stepTime=Math.abs(Math.floor(duration/range));
let obj=document.getElementById(id);
let timer=setInterval(()=>{
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
window.addEventListener("scroll",()=>{
reveals.forEach(section=>{
const top=section.getBoundingClientRect().top;
if(top<window.innerHeight-100){
section.classList.add("visible");
}
});
});