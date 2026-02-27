const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let visitors = 0;
let audits = 0;
let visitsHistory = [];
let auditsHistory = [];

setInterval(function() {
  visitsHistory.push(visitors);
  auditsHistory.push(audits);
  if (visitsHistory.length > 20) {
    visitsHistory.shift();
    auditsHistory.shift();
  }
}, 5000);

app.use(function(req, res, next) {
  visitors++;
  next();
});

/* =========================
   LANDING
========================= */

app.get("/", function(req, res) {

  res.send(`
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SuppScale</title>
  <style>
  body{margin:0;font-family:Arial;background:#0a0f1c;color:white;text-align:center;}
  .hero{padding:120px 20px;}
  h1{font-size:40px;}
  button{padding:12px 25px;background:#7c3aed;border:none;border-radius:8px;color:white;cursor:pointer;margin-top:20px;}
  </style>
  </head>
  <body>
  <div class="hero">
  <h1>SuppScale Premium</h1>
  <button onclick="fetch('/api/audit',{method:'POST'})">Run Audit</button>
  </div>
  </body>
  </html>
  `);

});

/* =========================
   API
========================= */

app.post("/api/audit", function(req, res) {
  audits++;
  res.json({status:"ok"});
});

app.get("/api/admin-data", function(req, res) {
  res.json({
    visitors,
    audits,
    visitsHistory,
    auditsHistory
  });
});

/* =========================
   ADMIN DASHBOARD
========================= */

app.get("/admin", function(req, res) {

res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Dashboard</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
body{margin:0;font-family:Arial;background:#0a0f1c;color:white;}
.container{padding:40px;}
.cards{display:flex;gap:20px;flex-wrap:wrap;}
.card{flex:1;background:#111827;padding:20px;border-radius:12px;min-width:200px;}
.big{font-size:30px;color:#22d3ee;}
canvas{background:#111827;padding:20px;border-radius:12px;margin-top:30px;}
</style>
</head>
<body>

<div class="container">
<h1>Admin Dashboard</h1>

<div class="cards">
  <div class="card">
    <div>Total Visitors</div>
    <div id="visitors" class="big">0</div>
  </div>
  <div class="card">
    <div>Total Audits</div>
    <div id="audits" class="big">0</div>
  </div>
</div>

<canvas id="visitsChart"></canvas>
<canvas id="auditsChart"></canvas>

</div>

<script>

let visitsChart;
let auditsChart;

async function loadData(){
  const res = await fetch('/api/admin-data');
  const data = await res.json();

  document.getElementById("visitors").innerText = data.visitors;
  document.getElementById("audits").innerText = data.audits;

  if(!visitsChart){
    visitsChart = new Chart(document.getElementById('visitsChart'), {
      type: 'line',
      data: {
        labels: data.visitsHistory.map((_,i)=>i),
        datasets: [{
          label: 'Visitors',
          data: data.visitsHistory,
          borderColor: '#22d3ee'
        }]
      }
    });

    auditsChart = new Chart(document.getElementById('auditsChart'), {
      type: 'bar',
      data: {
        labels: data.auditsHistory.map((_,i)=>i),
        datasets: [{
          label: 'Audits',
          data: data.auditsHistory,
          backgroundColor: '#7c3aed'
        }]
      }
    });

  } else {
    visitsChart.data.datasets[0].data = data.visitsHistory;
    visitsChart.update();

    auditsChart.data.datasets[0].data = data.auditsHistory;
    auditsChart.update();
  }
}

setInterval(loadData, 3000);
loadData();

</script>

</body>
</html>
`);

});

app.listen(PORT, function() {
  console.log("SuppScale running on port " + PORT);
});