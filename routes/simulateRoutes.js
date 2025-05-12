const express = require('express');
const router = express.Router();
const simulateController = require('../controllers/simulateController'); // Ensure this path is correct
console.log("Simulate Routes Loaded Successfully"); // Debug to ensure the route file is loaded.

router.get('/logs', (req, res, next) => {
  console.log("Request Reached /api/simulate/logs Route"); // Debug to ensure the route is hit.
  next(); // Pass control to the simulateController.
});

router.get('/logs', simulateController.getLogs);

module.exports = router;