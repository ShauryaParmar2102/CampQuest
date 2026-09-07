const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String, // Store the user's email
        required: true, // Email is required
        unique: true // Prevent duplicate emails
    }
})

// Add username and password authentication to the user schema
const passportLocalMongooseModule = require('passport-local-mongoose');
const passportLocalMongoose =
    passportLocalMongooseModule.default || passportLocalMongooseModule;

userSchema.plugin(passportLocalMongoose); // Add username and password authentication to the user schema

// Create the User model using the user schema
const userModel= new mongoose.model('User', userSchema);

// Export the User model so other files can use it
module.exports= userModel;