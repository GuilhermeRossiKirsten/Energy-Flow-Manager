const db = require("./db");

const Station = {
  create: (userId, status, renewableEnergy, chargingPreference) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO stations (user_id, status, renewable_energy, charging_preference) VALUES (?, ?, ?, ?)`,
        [userId, status, renewableEnergy, chargingPreference],
        function (err) {
          if (err) reject(err);
          resolve({
            id: this.lastID,
            userId,
            status,
            renewableEnergy,
            chargingPreference,
          });
        }
      );
    });
  },

  findByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM stations WHERE user_id = ?`,
        [userId],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  },

  update: (stationId, updates) => {
    const { status, renewableEnergy, chargingPreference } = updates;
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE stations SET status = ?, renewable_energy = ?, charging_preference = ? WHERE id = ?`,
        [status, renewableEnergy, chargingPreference, stationId],
        function (err) {
          if (err) reject(err);
          resolve({ changes: this.changes });
        }
      );
    });
  },
};

module.exports = Station;
