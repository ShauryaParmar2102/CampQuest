const express = require('express'); // Import Express

const router = express.Router(); // Create an Express router for the campground routes

const wrapAsync= require('../utilities/wrapAsync'); // Import helper that catches errors from async functions

const {isLoggedIn,isAuthor,validateCampground}= require('../middlewares.js'); // Import middleware for login checks, ownership checks and campground validation

const campgrounds= require('../controllers/campgroundController.js'); // Import the campground controller functions

const multer= require('multer'); // Import Multer for handling uploaded files/images

const {storage}= require('../cloudinary'); // Import the Cloudinary storage configuration

const upload= multer({storage}); // Configure Multer to upload files using Cloudinary storage

// ==================== CAMPGROUND CRUD ROUTES ====================

// CREATE CAMPGROUND


// Routes for displaying all campgrounds and creating a campground
router.route('/')

    // Create a new campground after checking login, uploading images and validating the data
    .post(isLoggedIn, upload.array('image'), validateCampground, wrapAsync(campgrounds.create))

    // Get and display all campgrounds
    .get(wrapAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.renderNewForm); // Show the new campground form if the user is logged in

// Routes for a specific campground
router.route('/:id')

    // Show campground
    .get(wrapAsync(campgrounds.show))

        // Update campground
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, wrapAsync(campgrounds.edit))

        // Delete campground
    .delete(isLoggedIn, isAuthor, upload.array('image'), validateCampground, wrapAsync(campgrounds.delete))


    // Show the form for editing a campground
router.get(
    '/:id/edit', 
    isLoggedIn, // Make sure the user is logged in
     isAuthor,  // Make sure the user owns the campground
     wrapAsync(campgrounds.renderEditForm)); // Display the edit form

module.exports = router; // Export the router
