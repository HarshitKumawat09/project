const express = require("express");
const app = express();
const path = require("path");

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html for the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public", "login.html")));
// app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "public", "register.html")));
// API endpoint
app.get("/api/stations", (req, res) => {
    const stations = [
        { name: "Jaipur Charging Hub", lat: 26.9124, lng: 75.7873, status: "Available" },
        { name: "Ajmer Fast Charge", lat: 26.4499, lng: 74.6399, status: "Busy" },
        { name: "Udaipur EV Point", lat: 24.5854, lng: 73.7125, status: "Available" },
        { name: "Ahmedabad Charging Spot", lat: 23.0225, lng: 72.5714, status: "Under Maintenance" },
        { name: "Manipal University Charger", lat: 13.3474, lng: 74.7921, status: "Available" }
    ];
    res.json(stations);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
