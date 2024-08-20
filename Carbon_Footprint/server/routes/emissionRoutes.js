const express = require("express");
const emissionController = require("../controllers/emissionController");
const router = express.Router();

router.post("/", emissionController.flightsTravelEmission);

module.exports = router;
