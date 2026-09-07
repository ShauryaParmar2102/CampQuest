const campgroundModel= require('../models/campground.js'); // Import the campground model
const reviewModel= require('../models/review.js'); // Import the review model

module.exports.create= async(req,res,next)=>{ // Create a new review
    const camp= await campgroundModel.findById(req.params.id); // Find the campground using its ID
    const newReview = new reviewModel(req.body.reviews); // Create a review using the form data
    newReview.author = req.user._id; // Set the logged-in user as the review author
    camp.reviews.push(newReview); // Add the review to the campground's reviews
    await newReview.save(); // Save the new review to MongoDB
    await camp.save(); // Save the updated campground to MongoDB
    req.flash('success', "Review added successfully"); // Create a success message
    res.redirect(`/campgrounds/${camp._id}`)  // Redirect back to the campground page
}

module.exports.delete= async(req,res)=> {
    const {id, reviewId}= req.params; // Get the campground and review IDs from the URL
    await campgroundModel.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}); // Get the campground and review IDs from the URL
    await reviewModel.findByIdAndDelete(reviewId); // Remove the review ID from the campground
    req.flash('success', "Review Deleted"); // Create a success message
    res.redirect(`/campgrounds/${id}`);  // Redirect back to the campground page
}

