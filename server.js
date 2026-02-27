const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/* ===============================
   TRACKING GLOBAL
================================ */

let visitors = 0;
let audits = 0;

app.use((req, res, next) => {
  visitors++;
  next();
});

/* ===============================
   LANDING PAGE (SUPPSCALE)
================================ */

app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>SuppScale - Amazon Supplement Optimizer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body{
        margin:0;
        font-family:Arial, sans-serif;
        background:linear-gradient(135deg,#0f172a,#1e293b);
        color:white;
        text-align:center;
      }
      .hero{
        padding:100px 20px;
      }
      h1{
        font-size:48px;
      }
      .btn{
        padding:15px 30px;
        background:#7c3aed;
        border-radius:8px;
        color:white;
        text-decoration:none;
        display:inline-block;
        margin-top:20px;
        border:none;
        cursor:pointer;
      }
      .section{
        padding:60px 20px;
      }
      input, textarea{
        width:80%;
        padding:10px;
        margin:10px 0;
        border-radius:6px;
        border:none;
      }
      .card{
        background:#1e293b;
        padding:20px;
        border-radius:10px;
        margin:20px auto;
        max-width:400px;
      }
      .score{
        font-size:60px;
        color:#22d3ee;
      }
    </style>
  </head>
  <body>

    <div class="hero">
      <h1>Dominate Amazon Supplement Rankings</h1>
      <p>Advanced Amazon listing optimization tool.</p>
      <a href="#audit" class="btn">Run Free Audit</a>
    </div>

    <div class="section" id="audit">
      <h2>Free Supplement Audit</h2>
      <input id="title" placeholder="Product Title">
      <textarea id="bullets" placeholder="Bullet Points"></textarea>
      <br>
      <button class="btn" onclick="runAudit()">Generate Audit</button>
      <div id="result"></div>
    </div>

    <script>
      async function runAudit(){
        const response = await fetch("/api/audit", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({})
        });

        const data = await response.json();

        document.getElementById("result").innerHTML = \`
          <div class="card">
            <div class="score">\${data.overall}/100</div>
            <p>SEO: \${data.seo}</p>
            <p>Conversion: \${data.conversion}</p>
            <button class="btn" onclick="window.print()">Export PDF</button>
          </div>
        \`;
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
   ADMIN PAGE
================================ */

app.get("/admin", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>Admin Dashboard</title>
    <style>
      body{
        font-family:Arial;
        background:#0f172a;
        color:white;
        text-align:center;
        padding:50px;
      }
      .card{
        background:#1e293b;
        padding:30px;
        border-radius:10px;
        display:inline-block;
      }
    </style>
  </head>
  <body>
    <h1>Admin Dashboard</h1>
    <div class="card">
      <p>Total Visitors: ${visitors}</p>
      <p>Total Audits: ${audits}</p>
    </div>
  </body>
  </html>
  `);
});

/* ===============================
   SERVER START
================================ */

app.listen(PORT, () => {
  console.log("SuppScale running on port " + PORT);
});