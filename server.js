const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/* ================= DATA ================= */

let visitors = 0;
let audits = 0;
let subscriptions = 0;

let visitsHistory = [];
let auditsHistory = [];

app.use((req,res,next)=>{
  visitors++;
  next();
});

setInterval(()=>{
  visitsHistory.push(visitors);
  auditsHistory.push(audits);
  if(visitsHistory.length>20){
    visitsHistory.shift();
    auditsHistory.shift();
  }
},5000);

/* ================= LANDING ================= */

app.get("/",(req,res)=>{
res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SuppScale</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
animation:glow 2s infinite alternate;
}

@keyframes glow{
from{text-shadow:0 0 10px rgba(124,58,237,0.4);}
to{text-shadow:0 0 30px rgba(34,211,238,0.9);}
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
box-shadow:0 0 20px rgba(124,58,237,0.5);
}

button:hover{
transform:scale(1.05);
box-shadow:0 0 40px rgba(34,211,238,0.8);
}

.video-container{
max-width:800px;
margin:40px auto;
border-radius:20px;
overflow:hidden;
box-shadow:0 0 40px rgba(124,58,237,0.4);
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
backdrop-filter:blur(10px);
padding:30px;
border-radius:20px;
width:280px;
transition:0.3s;
}

.review-card:hover{
transform:translateY(-10px);
box-shadow:0 0 30px rgba(124,58,237,0.5);
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
<button onclick="runAudit()" id="auditBtn">Audit Gratuit</button>
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

function runAudit(){
fetch('/api/audit',{method:'POST'});
}

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
</html>
`);
});

/* ================= API ================= */

app.post("/api/audit",(req,res)=>{
audits++;
res.json({status:"ok"});
});

app.get("/api/admin-data",(req,res)=>{
res.json({
visitors,
audits,
subscriptions,
visitsHistory,
auditsHistory,
conversion: visitors>0 ? ((subscriptions/visitors)*100).toFixed(2) : 0
});
});

/* ================= ADMIN PRO ================= */

app.get("/admin-pro",(req,res)=>{
res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Pro</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
body{margin:0;background:#0b1220;color:white;font-family:Arial;}
.container{padding:40px;}
.cards{display:flex;flex-wrap:wrap;gap:20px;margin-bottom:40px;}
.card{
flex:1;
min-width:200px;
background:#111c33;
padding:20px;
border-radius:12px;
box-shadow:0 0 20px rgba(124,58,237,0.2);
}
.card h3{margin:0;font-size:14px;color:#94a3b8;}
.card .value{font-size:28px;margin-top:10px;color:#22d3ee;}
canvas{
background:#111c33;
padding:20px;
border-radius:12px;
margin-bottom:40px;
}
</style>
</head>
<body>

<div class="container">
<h1>Admin Pro Dashboard</h1>

<div class="cards">
<div class="card"><h3>Visitors</h3><div id="visitors" class="value">0</div></div>
<div class="card"><h3>Audits</h3><div id="audits" class="value">0</div></div>
<div class="card"><h3>Subscriptions</h3><div id="subs" class="value">0</div></div>
<div class="card"><h3>Conversion %</h3><div id="conv" class="value">0%</div></div>
</div>

<canvas id="visitsChart"></canvas>
<canvas id="auditsChart"></canvas>

</div>

<script>
let visitsChart;
let auditsChart;

async function loadData(){
const res=await fetch('/api/admin-data');
const data=await res.json();

document.getElementById("visitors").innerText=data.visitors;
document.getElementById("audits").innerText=data.audits;
document.getElementById("subs").innerText=data.subscriptions;
document.getElementById("conv").innerText=data.conversion+"%";

if(!visitsChart){
visitsChart=new Chart(document.getElementById('visitsChart'),{
type:'line',
data:{labels:data.visitsHistory.map((_,i)=>i),
datasets:[{label:'Visitors',data:data.visitsHistory,borderColor:'#22d3ee'}]}
});
auditsChart=new Chart(document.getElementById('auditsChart'),{
type:'bar',
data:{labels:data.auditsHistory.map((_,i)=>i),
datasets:[{label:'Audits',data:data.auditsHistory,backgroundColor:'#7c3aed'}]}
});
}else{
visitsChart.data.datasets[0].data=data.visitsHistory;
visitsChart.update();
auditsChart.data.datasets[0].data=data.auditsHistory;
auditsChart.update();
}
}

setInterval(loadData,3000);
loadData();
</script>

</body>
</html>
`);
});

app.listen(PORT,()=>console.log("SuppScale running stable"));