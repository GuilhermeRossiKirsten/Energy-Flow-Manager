const Station = require("../models/station");

const StationController = {
  getStations: async (req, res) => {
    try {
      const stations = await Station.findByUserId(req.user.id);
      res.json(stations);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar estações." });
    }
  },

  createStation: async (req, res) => {
    const { status, renewableEnergy, chargingPreference } = req.body;
    try {
      const station = await Station.create(
        req.user.id,
        status,
        renewableEnergy,
        chargingPreference
      );
      res.status(201).json(station);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar estação." });
    }
  },

  updateStation: async (req, res) => {
    const { stationId, status, renewableEnergy, chargingPreference } = req.body;
    try {
      const result = await Station.update(stationId, {
        status,
        renewableEnergy,
        chargingPreference,
      });
      if (result.changes === 0) {
        return res.status(404).json({ error: "Estação não encontrada." });
      }
      res.json({ message: "Estação atualizada com sucesso." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar estação." });
    }
  },
};

module.exports = StationController;
