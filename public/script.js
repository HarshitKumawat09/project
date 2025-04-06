
// document.addEventListener("DOMContentLoaded", () => {
//     const mapContainer = document.getElementById("map-container");

//     async function fetchStations() {
//         try {
//             const response = await fetch("/api/stations");
//             let stations = await response.json();
//             console.log("Data received:", stations);

//             // Assign random status if needed
//             stations = stations.map(station => ({
//                 ...station,
//                 status: getRandomStatus(), // Randomize status locally
//             }));

//             updateMarkers(stations);
//         } catch (error) {
//             console.error("Error fetching stations:", error);
//         }
//     }

//     function updateMarkers(stations) {
//         // Clear previous markers
//         mapContainer.innerHTML = "";

//         stations.forEach((station, index) => {
//             const marker = document.createElement("div");
//             marker.className = "marker";
//             marker.style.backgroundColor = getColor(station.status);
//             marker.innerText = "⚡";
//             marker.setAttribute("title", `${station.name}\nStatus: ${station.status}`);

//             // Positioning each marker randomly inside the map container
//             marker.style.position = "absolute";
//             marker.style.left = `${10 + index * 80}px`; // Adjust position
//             marker.style.top = `${50 + (index % 2) * 60}px`; // Staggered positioning

//             // Hover effect
//             marker.addEventListener("mouseenter", () => {
//                 marker.style.backgroundColor = "yellow";
//             });
//             marker.addEventListener("mouseleave", () => {
//                 marker.style.backgroundColor = getColor(station.status);
//             });

//             mapContainer.appendChild(marker);
//         });
//     }

//     // Function to determine marker color based on status
//     function getColor(status) {
//         switch (status) {
//             case "Available": return "green";
//             case "Busy": return "red";
//             case "Under Maintenance": return "gray";
//             default: return "blue";
//         }
//     }

//     // Function to get random status
//     function getRandomStatus() {
//         const statuses = ["Available", "Busy", "Under Maintenance"];
//         return statuses[Math.floor(Math.random() * statuses.length)];
//     }

//     // Fetch stations every 5 seconds
//     fetchStations();
//     setInterval(fetchStations, 5000);
// });
// ========== Captcha ========== //
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('captcha').innerText = captcha;
}

window.onload = generateCaptcha;

// ========== Login ========== //
function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const captchaInput = document.getElementById("captcha-input").value;
    const captcha = document.getElementById("captcha").innerText;

    if (captchaInput !== captcha) {
        alert("Incorrect Captcha. Please try again.");
        generateCaptcha();
        return;
    }

    alert(`Welcome back, ${username}!`);
    window.location.href = "index.html";
}

// ========== Register ========== //
function registerUser() {
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const captchaInput = document.getElementById("captcha-input").value;
    const captcha = document.getElementById("captcha").innerText;

    if (captchaInput !== captcha) {
        alert("Incorrect Captcha. Please try again.");
        generateCaptcha();
        return;
    }

    alert(`Account created for ${username}!`);
    window.location.href = "login.html";
}





document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("map-container");

    async function fetchStations() {
        try {
            const response = await fetch("/api/stations");
            let stations = await response.json();
            console.log("Data received:", stations);

            // Assign random data to simulate dynamic updates
            stations = stations.map(station => ({
                ...station,
                status: getRandomStatus(),
                slotsAvailable: Math.floor(Math.random() * 5) + 1, // Random slots between 1-5
                expectedRepairTime: station.status === "Under Maintenance" ? getRepairTime() : "N/A",
            }));

            updateMarkers(stations);
        } catch (error) {
            console.error("Error fetching stations:", error);
        }
    }

    function updateMarkers(stations) {
        // Clear previous markers
        mapContainer.innerHTML = "";

        stations.forEach((station, index) => {
            const marker = document.createElement("div");
            marker.className = "marker";
            marker.style.backgroundColor = getColor(station.status);
            marker.innerText = "⚡";
            marker.setAttribute("title", 
                `${station.name}\nStatus: ${station.status}\nSlots Available: ${station.slotsAvailable}\nExpected Repair: ${station.expectedRepairTime}`
            );

            // Positioning each marker randomly inside the map container
            marker.style.position = "absolute";
            marker.style.left = `${10 + index * 80}px`; // Adjust position
            marker.style.top = `${50 + (index % 2) * 60}px`; // Staggered positioning

            // Hover effect
            marker.addEventListener("mouseenter", () => {
                marker.style.backgroundColor = "yellow";
            });
            marker.addEventListener("mouseleave", () => {
                marker.style.backgroundColor = getColor(station.status);
            });

            // Click event to open review prompt
            marker.addEventListener("click", () => {
                const review = prompt(`Leave a review for ${station.name}:`);
                if (review) {
                    console.log(`Review for ${station.name}: ${review}`);
                    alert("Review submitted successfully!");
                }
            });

            mapContainer.appendChild(marker);
        });
    }

    // Function to determine marker color based on status
    function getColor(status) {
        switch (status) {
            case "Available": return "green";
            case "Busy": return "Orange";
            case "Under Maintenance": return "gray";
            default: return "blue";
        }
    }

    // Function to get random status
    function getRandomStatus() {
        const statuses = ["Available", "Busy", "Under Maintenance"];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }

    // Function to generate random repair time (in hours)
    function getRepairTime() {
        return `${Math.floor(Math.random() * 24) + 1} hrs`;
    }
    

    // Fetch stations every 5 seconds
    fetchStations();
    setInterval(fetchStations, 10000);
});


