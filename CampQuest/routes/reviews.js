const express= require('express');  // Import Express
const router= express.Router({mergeParams:true}); // Create router and access parameters from parent routes
const wrapAsync= require('../utilities/wrapAsync'); // Catch errors from async route functions
const reviewModel= require('../models/review.js'); // Import Review model
const campgroundModel= require('../models/campground.js'); // Import Campground model
const {isLoggedIn, validateReview, isReviewAuthor}= require('../middlewares.js'); // Import authentication and review middleware
const reviews= require('../controllers/reviewController.js'); // Import review controller functions

// ==================== REVIEW ROUTES ====================

// Create a new review for a campground
router.post('/', validateReview, isLoggedIn, wrapAsync(reviews.create));  // Check that the review data is valid

// Delete a review from a campground
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviews.delete));

// Export the review router
module.exports= router;