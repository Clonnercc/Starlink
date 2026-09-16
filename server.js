const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DATABASE_PATH || "./starlink.db";
const db = new Database(DB_PATH);

db.exec(`
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  whatsapp TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT 'São Paulo, SP',
  headline TEXT NOT NULL DEFAULT 'Internet de alta velocidade onde você precisar.',
  subheadline TEXT NOT NULL DEFAULT 'Soluções de conectividade via satélite para residências, empresas e áreas remotas.',
  service_text TEXT NOT NULL DEFAULT 'Venda de equipamento, planos, instalação e suporte.'
);
INSERT OR IGNORE INTO settings (id) VALUES (1);
`);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function settings() {
  return db.prepare("SELECT * FROM settings WHERE id = 1").get();
}

function authorized(req) {
  const user = process.env.ADMIN_USER || "admin";
  const pass = process.env.ADMIN_PASSWORD || "troque-esta-senha";
  const header = req.headers.authorization || "";
  if (!header.startsWith("Basic ")) return false;
  const raw = Buffer.from(header.slice(6), "base64").toString();
  const i = raw.indexOf(":");
  return i >= 0 && raw.slice(0, i) === user && raw.slice(i + 1) === pass;
}

app.get("/api/settings", (req, res) => res.json(settings()));

app.put("/api/settings", (req, res) => {
  if (!authorized(req)) return res.status(401).json({error:"Não autorizado"});
  const s = req.body || {};
  db.prepare(`
    UPDATE settings SET whatsapp=@whatsapp, phone=@phone, location=@location,
    headline=@headline, subheadline=@subheadline, service_text=@service_text
    WHERE id=1
  `).run({
    whatsapp: String(s.whatsapp || "").replace(/\D/g, "").slice(0, 20),
    phone: String(s.phone || "").slice(0, 40),
    location: String(s.location || "São Paulo, SP").slice(0, 100),
    headline: String(s.headline || "").slice(0, 180),
    subheadline: String(s.subheadline || "").slice(0, 300),
    service_text: String(s.service_text || "").slice(0, 300)
  });
  res.json(settings());
});

app.get("/api/health", (req,res)=>res.json({ok:true}));

app.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
