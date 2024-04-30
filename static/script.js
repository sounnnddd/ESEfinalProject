let sources = [];
let destinations = [[]];

sources = ['Union', 'Floral & Main', 'Main & Murray', 'Leroy & Murray', 'Riverside & Columbus', 'UDC', 'Pharmacy School', 'Mohawk', 'ITC', 'UClub', 'Meadows & Hayes', 'BU Rafuse', 'PARKWAY PLAZA', 'Town Square Mall', 'BC Junction', 'Burbank & Floral', 'Main & Front', 'BU', 'Oakdale Mall/ Wegmans', 'Main & Willow']
destinations = [
    ['Floral & Main', 'Main & Murray', 'UDC', 'Riverside & Columbus', 'Leroy & Murray', 'PARKWAY PLAZA', 'Town Square Mall', 'WASH & NORTH', 'Pharmacy School'],
    ['Main & Murray', 'UDC', 'BU', 'Pharmacy School'],
    ['UDC', 'Floral & Main', 'BU', 'Pharmacy School'],
    ['Riverside & Columbus', 'BU', 'UDC'],
    ['BU', 'Leroy & Murray', 'UDC'],
    ['Leroy & Murray', 'Riverside & Columbus', 'BU', 'Main & Murray', 'Floral & Main', 'Pharmacy School'],
    ['BU', 'Floral & Main', 'Main & Murray', 'UDC'],
    ['University Plaza', 'BC Junction', 'ITC', 'UClub', 'Meadows & Hayes'],
    ['UClub', 'Meadows & Hayes', 'Mohawk'],
    ['Meadows & Hayes', 'Mohawk'],
    ['Mohawk'],
    ['PARKWAY PLAZA', 'Town Square Mall', 'BU'],
    ['Town Square Mall', 'WASH & NORTH', 'BU'],
    ['WASH & NORTH', 'BU'],
    ['University Plaza', 'BU', 'Burbank & Floral', 'Union'],
    ['Union'],
    ['Floral & Main', 'BU'],
    ['Oakdale Mall/ Wegmans', 'Main & Willow'],
    ['Main & Willow', 'Union'],
    ['Union']
]

// Populate the source dropdown
const sourceSelect = document.getElementById("source");
sources.forEach((source) => {
    const option = document.createElement("option");
    option.value = source;
    option.textContent = source;
    sourceSelect.appendChild(option);
});

// Update the destination dropdown based on the selected source
sourceSelect.addEventListener("change", (e) => {
    const selectedSource = e.target.value;
    const sourceIndex = sources.indexOf(selectedSource);

    const destinationSelect = document.getElementById("destination");

    // Clear previous options
    destinationSelect.innerHTML = "<option value=''>Select Destination</option>";

    // Populate the destination dropdown with corresponding destinations
    if (sourceIndex >= 0 && destinations[sourceIndex]) {
        destinations[sourceIndex].forEach((destination) => {
            const option = document.createElement("option");
            option.value = destination;
            option.textContent = destination;
            destinationSelect.appendChild(option);
        });
    }
});

document.getElementById("bus-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const time = document.getElementById("time").value;

    if (!source || !destination || !time) {
        alert("Please fill out all fields.");
        return;
    }

    const source_destination = source + "_" + destination;

    const formData = {
        source_destination: source_destination,
        time,
    };

    // Send an AJAX POST request to the Express.js server
    fetch("/api/buses/search/getRoutes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Parse the JSON response
        })
        .then((data) => {
            console.log(data);

            // Update the results section with the server's response
            const resultsDiv = document.getElementById("results");

            let formattedData = JSON.stringify(data, null, 2).replace(/\\n/g, "<br>").replace(/"/g, "");
            console.log("formattedData", formattedData);

            if (formattedData.length === 0) {
                resultsDiv.innerHTML = `
            <h3>Search results for the next 30 minutes:</h3>
            <p>No route found!</p>
        `;
            } else {
                resultsDiv.innerHTML = `
            <h3>Search results for the next 30 minutes:</h3>
            <p>${formattedData}</p>
        `;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while fetching data. Please try again.");
        });
});

