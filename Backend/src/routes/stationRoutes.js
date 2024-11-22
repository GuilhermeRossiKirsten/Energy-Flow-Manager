const express = require("express");
const StationController = require("../controllers/stationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", StationController.getStations);
router.post("/", StationController.createStation);
router.put("/", StationController.updateStation);

module.exports = router;
