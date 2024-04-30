const Bus = require("../models/buses.model.js");
// const input = require("../input.json");

buses_array = ["OCCT", "BCT"];
// Convert time string to minutes
function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(".").map(Number);
  return hours * 60 + (minutes || 0);
}

// Check if a given time is within a certain tolerance of another time
function isTimeClose(userTime, checkTime, tolerance) {
  const userTimeInMinutes = timeToMinutes(userTime);
  const checkTimeInMinutes = timeToMinutes(checkTime);

  return (
    checkTimeInMinutes >= userTimeInMinutes &&
    checkTimeInMinutes <= userTimeInMinutes + tolerance
  );
}

const findReqdBusNumbers = async (filteredBuses, input) => {
  try {
    const userTime = input.time;
    console.log("input.time", input.time);
    const tolerance = 30;

    let routesSummary = "";

    filteredBuses.forEach((bus) => {
      routesSummary += `Source-Destination: ${bus.source_destination}\n`;
      routesSummary += "Routes:\n";
      bus.routes.forEach((routeList, index) => {
        if (routeList.length > 0) {
          routesSummary += `  Routes for ${buses_array[index]}: ${routeList.join(", ")}\n`;
        }
      });

    
      bus.occt_time.forEach((occtTime, index) => {
        // Check if any OCCT times are close to the user-provided time
        const closeTimes = occtTime.filter((time) =>
          isTimeClose(userTime, time, tolerance)
        );

        if (closeTimes.length > 0) {
          // If there's any close time, print them
          routesSummary += `  Time for OCCT Route ${
            index + 1
          }: ${closeTimes.join(", ")}\n`;
        }
      });

      bus.bct_time.forEach((bctTime, index) => {
        // Check if any BCT times are close to the user-provided time
        console.log("bctTime", bctTime);
        const closeTimes = bctTime.filter((time) =>
          isTimeClose(userTime, time, tolerance)
        );

        if (closeTimes.length > 0) {
          // If there's any close time, print them
          routesSummary += `  Time for BCT Route ${
            index + 1
          }: ${closeTimes.join(", ")}\n`;
        }
      });
    });

    console.log("routesSummary", routesSummary);
    console.log(typeof routesSummary);

    return routesSummary;
  } catch {
    return "Error in fetching filtered routes";
  }
};

//export all functions here
module.exports = {
  findReqdBusNumbers,
};
