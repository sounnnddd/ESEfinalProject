const express = require('express');
const Bus = require('../models/buses.model.js'); 
const controller = require("../controller/buses.controller.js");

const router = express.Router();

// Create a new bus entry 
router.post('/', controller.saveBus);

// Get all buses
router.get('/', controller.getAllBuses);

// Get bus by ID
router.get('/ID/:id', controller.getBusID);

// Get bus by source_destination
router.get('/SD/:source_destination', controller.getBusBySandD);

// Update a bus by ID
router.put('/:id', controller.updateBusByID);

// Update a bus by source_destination
router.put('/update/:source_destination', controller.updateBusBySandD);

// Delete a bus by ID
router.delete('/:id', controller.deleteBusByID);

// Get route numbers
router.post('/search/getRoutes', controller.searchRoutes);

module.exports = router;
