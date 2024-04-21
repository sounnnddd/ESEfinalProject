const mongoose = require("mongoose");

// Define the schema for buses
const busSchema = new mongoose.Schema(
  {
    source_destination: {
      type: String,
      required: true,
    },
    routes: {
      type: [String], // Array of strings
      required: true,
    },
    occt_time: {
      type: [String], // Array of strings representing OCCT schedule time
      required: true,
    },
    bct_time: {
      type: [String], // Array of strings representing BCT schedule time
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema
const Bus = mongoose.model("BusSchedule", busSchema);

module.exports = Bus;
