const bcrypt = require("bcrypt");
const db = require("./db");

const User = {
  create: async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, hashedPassword],
        function (err) {
          if (err) reject(err);
          resolve({ id: this.lastID, username });
        }
      );
    });
  },

  findByUsername: (username) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM users WHERE username = ?`,
        [username],
        (err, row) => {
          if (err) reject(err);
          console.log(row);
          resolve(row);
        }
      );
    });
  },
};

module.exports = User;
