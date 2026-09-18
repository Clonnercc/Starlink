const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

console.log("Diretório do projeto:", __dirname);
console.log("Arquivos na raiz:", fs.readdirSync(__dirname));

const publicPath = path.join(__dirname, "public");

if (fs.existsSync(publicPath)) {
  console.log("Pasta public encontrada.");
  console.log("Arquivos dentro de public:", fs.readdirSync(publicPath));

  app.use(express.static(publicPath));

  app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
} else {
  console.error("ERRO: pasta public NÃO encontrada.");
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
