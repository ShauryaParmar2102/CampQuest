mapboxgl.accessToken = mapToken; // Set the Mapbox access token
const map = new mapboxgl.map({ // Create a new Mapbox map
    container: 'Map', // Display the map in the Map HTML element 
    style: 'mapbox://styles/mapbox/streets-v11', // Set the map style 
    center: camp.geometry.coordinates, // Centre the map on the campground
    zoom: 10,  // Set the starting zoom level
});
map.addControl(new mapboxgl.navigationControl()); // Add zoom and navigation controls to the map
new mapboxgl.Marker() // Create a new map marker
        .setLngLat(camp.geometry.coordinates) // Place the marker at the campground's coordinates
        .setPopup(
            new mapboxgl.Popup({offset:25}) // Create a popup for the marker
            .setHTML(`<h5>${camp.title}</h5><p>${camp.location}</p>`) // Show the campground name and location
        )
        .addTo(map) // Add the marker to the map
