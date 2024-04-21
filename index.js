const express = require("express");
const app = express();
const mongoose = require("mongoose");
const busRoutes = require("./routes/buses.routes.js");
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//(soundaryaketha,7ySmtQeSVY5Rvpde)


mongoose
  .connect(
    "mongodb+srv://soundaryaketha:7ySmtQeSVY5Rvpde@fianlprojectese.775eoyw.mongodb.net/FinalProject?retryWrites=true&w=majority&appName=FianlProjectESE"
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Error in connecting to database...");
  });

// Use the bus routes
app.use("/api/buses", busRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
