const mongoose= require('mongoose'); // Import Mongoose

// Create the schema for reviews
const reviewSchema= new mongoose.Schema({
    body: String, // Store the review text
    rating: Number, // Store the review rating

    // Store the user who created the review
    author:{
        type: mongoose.Schema.Types.ObjectId, // Store the review author's user ID
        ref: 'User' // Connect the ID to the User model
    }
});

const reviewModel= mongoose.model('Review', reviewSchema); // Create the Review model using the review schema

module.exports= reviewModel; // Export the Review model so other files can use it