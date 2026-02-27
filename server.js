const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let visitors = 0;
let audits = 0;
let visitsHistory = [];
let auditsHistory = [];

/* =========================
   TRACKING
========================= */

app.use(function(req, res, next) {
  visitors++;
  next();
});

setInterval(function() {
  visitsHistory.push(visitors);
  auditsHistory.push(audits);
  if (visitsHistory.length > 20) {
    visitsHistory.shift();
    auditsHistory.shift();
  }
}, 5000);

/* =========================
   LANDING FR / EN
========================= */

app.get("/", function(req, res) {

res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SuppScale - Amazon Listing Optimizer</title>
<style>
body{margin:0;font-family:Arial;background:linear-gradient(135deg,#0f172a,#1e293b);color:white;text-align:center;}
header{display:flex;justify-content:space-between;padding:20px 40px;}
.logo{font-weight:bold;color:#7c3aed;font-size:20px;}
.lang{cursor:pointer;margin-left:10px;}
.hero{padding:120px 20px;}
h1{font-size:42px;margin-bottom:10px;}
button{padding:12px 25px;background:#7c3aed;border:none;border-radius:8px;color:white;cursor:pointer;margin-top:20px;}
.section{padding:60px 20px;}
.card{background:#111827;padding:20px;border-radius:12px;margin:20px auto;max-width:400px;}
.score{font-size:60px;color:#22d3ee;}
input,textarea{width:80%;padding:10px;margin:10px 0;border-radius:6px;border:none;}
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
<h1 id="title">Dominate Amazon Rankings</h1>
<p id="subtitle">AI Optimization Tool for Serious Sellers</p>
<button id="cta" onclick="scrollToAudit()">Run Free Audit</button>
</div>

<div class="section" id="audit">
<h2 id="auditTitle">Free Audit</h2>
<input id="product" placeholder="Product Title">
<textarea id="details" placeholder="Bullet Points"></textarea>
<br>
<button id="generateBtn" onclick="runAudit()">Generate Audit</button>
<div id="result"></div>
</div>

<script>

let lang='en';

function setLang(l){
lang=l;
if(l==='fr'){
document.getElementById('title').innerText='Dominez Amazon';
document.getElementById('subtitle').innerText='Outil IA pour vendeurs ambitieux';
document.getElementById('cta').innerText='Audit Gratuit';
document.getElementById('auditTitle').innerText='Audit Gratuit';
document.getElementById('generateBtn').innerText='Générer Audit';
document.getElementById('product').placeholder='Titre du produit';
document.getElementById('details').placeholder='Points forts';
}else{
document.getElementById('title').innerText='Dominate Amazon Rankings';
document.getElementById('subtitle').innerText='AI Optimization Tool for Serious Sellers';
document.getElementById('cta').innerText='Run Free Audit';
document.getElementById('auditTitle').innerText='Free Audit';
document.getElementById('generateBtn').innerText='Generate Audit';
document.getElementById('product').placeholder='Product Title';
document.getElementById('details').placeholder='Bullet Points';
}
}

function scrollToAudit(){
document.getElementById('audit').scrollIntoView({behavior:'smooth'});
}

async function runAudit(){
const response = await fetch('/api/audit',{method:'POST'});
const data = await response.json();

let score=0;
let target=data.overall;

let interval=setInterval(function(){
score++;
document.getElementById('result').innerHTML=
"<div class='card'><div class='score'>"+score+"/100</div><p>SEO: "+data.seo+"</p><p>Conversion: "+data.conversion+"</p></div>";
if(score>=target){clearInterval(interval);}
},20);
}

</script>

</body>
</html>
`);

});

/* =========================
   API AUDIT
========================= */

app.post("/api/audit", function(req, res) {
audits++;
let randomScore = Math.floor(Math.random()*30)+70;
res.json({
overall: randomScore,
seo: randomScore-5,
conversion: randomScore+3
});
});

/* =========================
   ADMIN SIMPLE
========================= */

app.get("/admin", function(req, res) {
res.send(
"<html><body style='background:#0f172a;color:white;text-align:center;padding:50px;font-family:Arial;'>" +
"<h1>Admin Dashboard</h1>" +
"<p>Total Visitors: "+visitors+"</p>" +
"<p>Total Audits: "+audits+"</p>" +
"<a href='/admin-pro' style='color:#7c3aed;'>Open Pro Dashboard</a>" +
"</body></html>"
);
});

/* =========================
   ADMIN PRO (GRAPHIQUE)
========================= */

app.get("/admin-pro", function(req, res) {
res.send(`
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
body{margin:0;background:#0f172a;color:white;font-family:Arial;}
.container{padding:40px;}
canvas{background:#111827;padding:20px;border-radius:12px;margin-top:30px;}
</style>
</head>
<body>
<div class="container">
<h1>Admin Pro Dashboard</h1>
<canvas id="visitsChart"></canvas>
<canvas id="auditsChart"></canvas>
</div>

<script>

async function loadData(){
const res = await fetch('/api/admin-data');
const data = await res.json();

new Chart(document.getElementById('visitsChart'),{
type:'line',
data:{labels:data.visitsHistory.map((_,i)=>i),
datasets:[{label:'Visitors',data:data.visitsHistory,borderColor:'#22d3ee'}]}
});

new Chart(document.getElementById('auditsChart'),{
type:'bar',
data:{labels:data.auditsHistory.map((_,i)=>i),
datasets:[{label:'Audits',data:data.auditsHistory,backgroundColor:'#7c3aed'}]}
});

}

loadData();

</script>
</body>
</html>
`);
});

app.get("/api/admin-data", function(req,res){
res.json({
visitsHistory,
auditsHistory
});
});

app.listen(PORT,function(){
console.log("SuppScale stable running");
});