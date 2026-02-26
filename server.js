// ===== LOG API KEY =====
console.log("API KEY loaded:", process.env.OPENAI_API_KEY ? "YES" : "NO");


// ===== NOUVEAU PANEL ECOM =====
app.get("/:lang/product-description-generator", (req, res) => {

  const { lang } = req.params;

  const isFR = lang === "fr";

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${isFR ? "Générateur de description produit" : "Product Description Generator"}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body{
          margin:0;
          font-family:Arial, sans-serif;
          background:linear-gradient(135deg,#0f172a,#1e293b);
          color:white;
          text-align:center;
          padding:40px 20px;
        }
        .box{
          max-width:600px;
          margin:auto;
          background:#1e293b;
          padding:30px;
          border-radius:12px;
          box-shadow:0 20px 40px rgba(0,0,0,0.3);
        }
        input, textarea{
          width:100%;
          padding:10px;
          margin:10px 0;
          border-radius:6px;
          border:none;
        }
        button{
          padding:12px 20px;
          border:none;
          border-radius:6px;
          background:#7c3aed;
          color:white;
          cursor:pointer;
          width:100%;
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
      </style>
    </head>
    <body>

      <div class="box">
        <h2>${isFR ? "Générateur IA E-commerce" : "AI E-commerce Generator"}</h2>

        <input id="product" placeholder="${isFR ? "Nom du produit" : "Product name"}">
        <textarea id="details" placeholder="${isFR ? "Détails du produit" : "Product details"}"></textarea>

        <button onclick="generate()">
          ${isFR ? "Générer description" : "Generate description"}
        </button>

        <div id="result"></div>
      </div>

      <script>
        async function generate(){
          const product = document.getElementById("product").value;
          const details = document.getElementById("details").value;

          const response = await fetch("/generate-description", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({product, details, lang:"${lang}"})
          });

          const data = await response.json();
          document.getElementById("result").innerText = data.result;
        }
      </script>

    </body>
    </html>
  `);
});


// ===== API GENERATION DESCRIPTION =====
app.post("/generate-description", async (req, res) => {

  try {

    const { product, details, lang } = req.body;

    const isFR = lang === "fr";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: isFR
            ? "Tu es un expert en copywriting e-commerce."
            : "You are an expert e-commerce copywriter."
        },
        {
          role: "user",
          content: isFR
            ? \`Produit: \${product}
               Détails: \${details}
               Rédige une description produit optimisée pour vendre.\`
            : \`Product: \${product}
               Details: \${details}
               Write a high converting product description.\`
        }
      ]
    });

    res.json({ result: completion.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "Error generating description" });
  }
});


// ===== SERVEUR =====
app.listen(PORT, () => {
  console.log("Serveur lancé");
});