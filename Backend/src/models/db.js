const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./energyFlow.sqlite", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

// Criar tabelas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS stations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'disconnected',
      renewable_energy BOOLEAN DEFAULT 0,
      charging_preference TEXT DEFAULT 'default',
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
});

module.exports = db;
