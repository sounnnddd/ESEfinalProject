const Bus = require("../models/buses.model.js");
const input = require("../input.json");

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

const findReqdBusNumbers = async (filteredBuses) => {
  try {
    const userTime = input["time"];
    const tolerance = 30;

    let routesSummary = "";

    filteredBuses.forEach((bus) => {
      routesSummary += `Source-Destination: ${bus.source_destination}\n`;
      routesSummary += "Routes:\n";
      bus.routes.forEach((routeList, index) => {
        if (routeList.length > 0) {
          routesSummary += `  Route ${index + 1}: ${routeList.join(", ")}\n`;
        }
      });

      routesSummary += "OCCT Timing:\n"; // OCCT Time header

      bus.occt_time.forEach((occtTime, index) => {
        // Check if any OCCT times are close to the user-provided time
        const closeTimes = occtTime.filter((time) =>
          isTimeClose(userTime, time, tolerance)
        );

        if (closeTimes.length > 0) {
          // If there's any close time, print them
          routesSummary += `  OCCT Time for Route ${
            index + 1
          }: ${closeTimes.join(", ")}\n`;
        }
      });

      bus.bct_time.forEach((bctTime, index) => {
        // Check if any OCCT times are close to the user-provided time
        const closeTimes = bctTime.filter((time) =>
          isTimeClose(userTime, time, tolerance)
        );

        if (closeTimes.length > 0) {
          // If there's any close time, print them
          routesSummary += `  BCT Time for Route ${
            index + 1
          }: ${closeTimes.join(", ")}\n`;
        }
      });
    });

    // console.log(routesSummary);

    return routesSummary;
  } catch {
    return "Error in fetching filtered routes";
  }
};

//export all functions here
module.exports = {
  findReqdBusNumbers,
};
