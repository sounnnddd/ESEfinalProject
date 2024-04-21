const Bus = require('../models/buses.model.js');
// const input = require('./input.json');

const findBusNumbers = async(allBuses) => {
    try{
        // const allBuses = req;
        // allBuses.forEach((bus) => {
        //     console.log(bus);})
        console.log(input);
        return "Sending from service\n" + allBuses;
    }
    catch{
        return "No data to send here";
    }
}


//export all functions here
module.exports = {
    findBusNumbers
};
// module.exports = require('./buses.service.js');