const Bus = require('../models/buses.model.js');
const busService = require('../service/buses.service.js');
const input = require('../input.json');

input_source_destination = input['source_destination'];

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

//get bus by source_destination
const getBusBySandD = async (req, res) => {
    try {
        const buses = await Bus.find({ "source_destination": { $in: req.params.id } });
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


const searchRoutes = async (req, res) => {
    try{
        const buses = await Bus.find({ "source_destination": { $in: [input_source_destination] } });
        const reqd_buses = await busService.findReqdBusNumbers(buses);
        console.log(buses);
        res.json({ "Found the following bus numbers for your route!": reqd_buses });
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
    searchRoutes,
    getBusBySandD
};
