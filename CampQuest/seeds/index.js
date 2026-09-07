
const mongoose = require('mongoose');
const {title} = require('process');
const campgroundModel = require('../models/campground.js');
mongoose.connect('mongodb://localhost:27017/campscout');

// Handle errors when connecting to MongoDB with Mongoose
mongoose.connection.on('error', console.error.bind(console, "Connection error:"));
mongoose.connection.once("open", ()=> {
    console.log("Database connected");
});

const citiesArr= require('./cities.js'); // Import the city data used for campground locations

const {descriptors,places}=require('./seedHelpers.js'); // Import the words used to generate random campground names

// Function to generate a random campground name
function randomName(){
    let rand1= Math.floor(Math.random()*descriptors.length); // Get a random index from the descriptors array
    let rand2= Math.floor(Math.random()*places.length); // Get a random index from the places array

    return `${descriptors[rand1]} ${places[rand2]}`; // Combine the random descriptor and place to create a campground name
}
// Function to seed the database with sample campground data
async function seedDB(){

    //Delete existing camps
    await campgroundModel.deleteMany({});

        // Create and add 300 new campgrounds to the database
    for(let i=0; i<300; i++) {
        let random1000= Math.floor(Math.random()*1000);  // Generate a random number between 0 and 999
        let city= citiesArr[random1000];         // Select a random city from the cities array

        let campName = randomName();  // Generate a random campground name
        const price= Math.floor(Math.random()*30)+10;  // Generate a random price between 10 and 39

        // Create a new campground document using the generated seed data
        const camp= new campgroundModel({
            title:campName, // Set the campground name
            location: `${city.city}, ${city.state}`, // Set the campground city and state

             // Store the campground's geographical location
            geometry:{
                type: "Point",  // Set the GeoJSON type to Point
                coordinates: [city.longitude, city.latitude] // Store the longitude and latitude
            },
            // Add a sample campground description
            description: 'Escape the city and enjoy a peaceful stay surrounded by nature. This campground offers scenic views, plenty of space to relax, and easy access to outdoor activities. Whether you are planning a weekend adventure or a quiet getaway, it is a great place to explore and unwind.',
            price: price,  // Set the randomly generated price
            images: []  // Start with an empty array of campground images
        });

        await camp.save(); // Save the campground document to MongoDB

    }
}

// Run the database seeding function
seedDB()
    // Run after the seed function has finished successfully
    .then(()=> {
        mongoose.connection.close(); // Close the MongoDB connection
    });