loor(duration/range));
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
</html>`);
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
res.send(`<!DOCTYPE html>
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
</html>`);
});

app.
listen(PORT,()=>console.log("SuppScale running stable"));
