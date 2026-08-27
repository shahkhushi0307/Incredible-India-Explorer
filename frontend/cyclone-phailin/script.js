(() => {
    window.Journey.registerSearchItems('frontend/cyclone-phailin/index.html', [
        {
            id: 'cyclone-phailin',
            title: 'Cyclone Phailin 2013',
            description: 'Document Cyclone Phailin (2013) and India\'s cyclone evacuation and preparedness efforts.',
            link: 'frontend/cyclone-phailin/index.html'
        }
    ]);

    const stormData = {
        formed: "8 October 2013",
        dissipated: "14 October 2013",
        peak: "Very Severe Cyclonic Storm",
        peak_winds: "~230 km/h",
        landfall_winds: "~200-210 km/h",
        pressure: "~940 hPa",
        landfall: "12 October 2013 near Gopalpur, Odisha",
        fatalities: "~45 (India)",
        evacuated: "1 million+",
        economic_loss: "US$4+ billion"
    };

    const impactData = {
        houses: "Thousands destroyed, millions affected",
        agriculture: "Large-scale paddy and crop loss",
        power: "Widespread outages",
        districts: "Ganjam, Khordha, Puri, Balasore (Odisha); Srikakulam, Vizianagaram (AP)"
    };

    const responseData = {
        ndrf: "32+ teams",
        army: "Search & rescue, air support",
        odraf: "State rapid-action teams",
        power_restore: "Priority corridors"
    };

    const lessonsData = [
        "Accurate forecasting enables life-saving evacuations",
        "Mass evacuation works when shelters and transport pre-arranged",
        "Cyclone-resistant housing minimizes wind damage",
        "Trained state forces speed up response",
        "Rapid power restoration depends on hardened grids",
        "Investment in preparedness pays off many times over"
    ];

    const sourcesData = [
        { name: "India Meteorological Department", url: "https://www.imd.gov.in" },
        { name: "Odisha State Disaster Management Authority", url: "https://www.osdma.org" },
        { name: "National Disaster Management Authority", url: "https://ndma.gov.in" },
        { name: "National Disaster Response Force", url: "https://ndrf.gov.in" },
        { name: "Joint Typhoon Warning Center", url: "https://www.metoc.navy.mil/jtwc" }
    ];

    document.addEventListener("DOMContentLoaded", () => {
        initMap();
        initTabs();
        renderSources();
    });

    function initMap() {
        const map = L.map("phailin-map", {
            scrollWheelZoom: false,
            minZoom: 5,
        }).setView([19.3, 85.5], 6);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
            maxZoom: 18,
        }).addTo(map);

        // Approximate Phailin track: Andaman Sea -> Bay of Bengal -> Gopalpur landfall -> inland
        const track = [
            [10.0, 96.0],   // Formation area near Andaman Sea
            [12.5, 94.0],
            [14.5, 91.0],
            [17.0, 87.5],
            [19.8, 84.6],   // Landfall near Gopalpur, Odisha
            [21.5, 83.0],   // Inland Odisha
            [23.0, 81.5],   // Central India
        ];

        const polyline = L.polyline(track, {
            color: "#ff8c42",
            weight: 3,
            opacity: 0.9,
            dashArray: "6 6",
        }).addTo(map);

        polyline.bindPopup("<strong>Cyclone Phailin's approximate track</strong><br>8 – 14 October 2013");

        // Formation point
        L.circleMarker(track[0], {
            radius: 6,
            color: "#4fc3f7",
            fillColor: "#4fc3f7",
            fillOpacity: 0.8,
        })
            .addTo(map)
            .bindPopup("<strong>Formation zone</strong><br>Andaman Sea / Bay of Bengal, ~8 October 2013");

        // Landfall point
        L.circleMarker(track[4], {
            radius: 9,
            color: "#e94560",
            fillColor: "#e94560",
            fillOpacity: 0.85,
        })
            .addTo(map)
            .bindPopup("<strong>Landfall</strong><br>Near Gopalpur, Odisha<br>12 October 2013, ~20:30 IST");

        // Landfall impact area
        L.circle([19.8, 84.6], {
            radius: 70000,
            color: "#e94560",
            fillColor: "#ff8c42",
            fillOpacity: 0.12,
        })
            .addTo(map)
            .bindPopup("Peak wind and surge damage zone (Ganjam coast)");

        // Dissipation point
        L.circleMarker(track[6], {
            radius: 6,
            color: "#90a4ae",
            fillColor: "#90a4ae",
            fillOpacity: 0.8,
        })
            .addTo(map)
            .bindPopup("<strong>Weakening</strong><br>Overland, ~14 October 2013");

        map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
    }

    function initTabs() {
        const tabButtons = document.querySelectorAll(".tab-btn");
        const tabPanels = document.querySelectorAll(".tab-panel");

        tabButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const target = btn.getAttribute("data-tab");

                tabButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                tabPanels.forEach((panel) => {
                    panel.classList.toggle("active", panel.id === "tab-" + target);
                });
            });
        });
    }

    function renderSources() {
        const sourcesGrid = document.querySelector(".cyclone-phailin-sources .three");
        if (!sourcesGrid) return;

        sourcesGrid.innerHTML = "";

        sourcesData.forEach((source) => {
            const panel = document.createElement("div");
            panel.className = "panel";
            panel.innerHTML = `
                <h3>${source.name}</h3>
                <ul>
                    <li><a href="${source.url}" target="_blank" rel="noopener">View full report</a></li>
                </ul>
            `;
            sourcesGrid.appendChild(panel);
        });
    }
})();