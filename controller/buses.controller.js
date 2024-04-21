const Bus = require('../models/buses.model.js');
const busService = require('../service/buses.service.js');

//CRUD

const saveBus = async (req, res) => {
    try {
        const bus = new Bus(req.body);
        await bus.save();
        res.status(201).json(bus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBusByID = async (req, res) => {
    try {
        const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }
        res.json(bus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteBusByID = async (req, res) => {
    try {
        const bus = await Bus.findByIdAndDelete(req.params.id);
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }
        res.json({ message: 'Bus deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBusAll = async (req, res) => {
    try {
        const buses = await Bus.deleteMany({});
        console.log("Deleted all entries in collection..")
        res.json({message: "All buses deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findBusRoutes = async (req, res) => {
    try{
        const bus = await Bus.find();
        const bus_numbers = await busService.findBusNumbers(bus);
        res.json({ "Found the following bus numbers for your route!": bus_numbers });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    saveBus,
    getAllBuses,
    updateBusByID,
    deleteBusByID,
    findBusRoutes
};

//export all functions here
// module.exports = require('./buses.controller.js');