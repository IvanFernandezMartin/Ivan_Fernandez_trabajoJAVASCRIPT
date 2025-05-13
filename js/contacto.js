document.addEventListener("DOMContentLoaded", function () {
    const negocio = [40.4168, -3.7038]; // Coordenadas del negocio (Madrid centro)

    const map = L.map('map').setView(negocio, 13);

    // Cargar el mapa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Marcador del negocio
    L.marker(negocio).addTo(map)
        .bindPopup("Nuestra ubicación")
        .openPopup();

    // Localizar al usuario
    map.locate({ setView: true, maxZoom: 16 });

    map.on('locationfound', function (e) {
        const userCoords = [e.latitude, e.longitude];
        L.marker(userCoords).addTo(map)
            .bindPopup("Tu ubicación").openPopup();

        // Solicitar ruta a OpenRouteService
        const apiKey = '5b3ce3597851110001cf6248458c46965052407c8b0d45f9f6d3afaa'; 
        const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';

        fetch(url, {
    method: 'POST',
    headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        coordinates: [[userCoords[1], userCoords[0]], [-3.7038, 40.4168]]  // Asegúrate de pasar longitud, latitud
    })
})

        .then(response => response.json())
        .then(data => {
            const routeCoords = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            L.polyline(routeCoords, { color: 'blue' }).addTo(map)
                .bindPopup("Ruta en coche").openPopup();
        })
        .catch(error => {
            console.error("Error al obtener la ruta:", error);
            alert("No se pudo calcular la ruta.");
        });
    });

    map.on('locationerror', function () {
        alert("No se pudo obtener tu ubicación.");
    });
});

