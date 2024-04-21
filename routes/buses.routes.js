const express = require('express');
const Bus = require('../models/buses.model.js'); 
const controller = require("../controller/buses.controller.js");

const router = express.Router();

// Create a new bus entry 
router.post('/', controller.saveBus);

// Get all buses
router.get('/', controller.getAllBuses);

// Update a bus by ID
router.put('/:id', controller.updateBusByID);

// Delete a bus by ID
router.delete('/:id', controller.deleteBusByID);

// Get route numbers
router.get('/getRoutes', controller.findBusRoutes);
router.get('/search/getRoutes', controller.searchRoutes);

module.exports = router;
