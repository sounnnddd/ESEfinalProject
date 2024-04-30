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

        if(formattedData.length === 0){
            resultsDiv.innerHTML = `
            <h3>Search results for the next 30 minutes:</h3>
            <p>No route found!</p>
        `;
        } else{
        resultsDiv.innerHTML = `
            <h3>Search results for the next 30 minutes:</h3>
            <p>${formattedData}</p>
        `;}
    })
    .catch((error) => {
        console.error("Error:", error); 
        alert("An error occurred while fetching data. Please try again."); 
    });
});
