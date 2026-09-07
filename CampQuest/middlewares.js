const passport= require('passport');
const {campgroundSchema, reviewSchema, userSchema}= require('./schemasForJoi.js');
const ExpressError= require('./utilities/ExpressError');
const campgroundModel= require('./models/campground.js');
const reviewModel= require('./models/review.js');

// Validate campground data before allowing the request to continue
module.exports.validateCampground = (req,res,next) => {

    const result= campgroundSchema.validate(req.body); // Check the submitted campground data against the Joi schema

    // Check whether Joi found a validation error
    if(result.error){

        // Get all validation error messages and combine them into one string
        const message = result.error.details.map((element)=>element.message).join(',');

        // Stop the request and throw a 400 Bad Request error
        throw new ExpressError(message, 400)
    } else {
        // Validation passed, so continue to the next middleware/controller
        next();
    }
}
// Validate review data before allowing the request to continue
module.exports.validateReview= (req,res,next) => {

    const result = reviewSchema.validate(req.body); // Check the submitted review data against the Joi review schema

        // Check if Joi found any validation errors
    if(result.error){
        // Get all validation error messages and combine them into one string
        const message = result.error.details.map((element)=>element.message).join(',');

        throw new ExpressError(message, 400)

    } else {

        next();  // Validation passed, so continue to the next middleware/controller
    }
}

// Validate user registration data before allowing the request to continue
module.exports.validateUser = (req, res, next) => {

    const result = userSchema.validate(req.body);

    if (result.error) {
        const message = result.error.details
            .map((element) => element.message)
            .join(',');

        throw new ExpressError(message, 400);
    } else {
        next();
    }
};

// Check if the logged-in user is the author of the review
module.exports.isReviewAuthor= async (req,res,next)=> {
    const reviewId = req.params.reviewId;  // Get the review ID from the URL parameters
    const id = req.params.id; // Get the campground ID from the URL parameters
    const review = await reviewModel.findById(reviewId); // Find the review in MongoDB using its ID

    // Check if the review author is different from the logged-in user
    if(!review.author._id.equals(req.user._id)){ 
                // Display an error message
        req.flash('error', "You don't have permission for this");
        return res.redirect(`/campgrounds/${id}`);   // Redirect the user back to the campground page
    }
    next(); // User is the review author, so continue to the next middleware/controller
}

// Check if the user is logged in
module.exports.isLoggedIn= (req,res,next) => {

    // Check if the current user is not authenticated
    if(!req.isAuthenticated()){

        // Show an error message telling the user to log in
        req.flash('error', "You need to login first");

        // Redirect the user to the login page
        return res.redirect('/login');
    }
    next(); // User is logged in, so continue to the next middleware/controller
}

// Check if the logged-in user is the author of the campground
module.exports.isAuthor = async (req, res, next) => {

    // Get the campground ID from the URL
    const { id } = req.params;

    // Find the campground in MongoDB
    const campground = await campgroundModel.findById(id);

    // Check if the logged-in user is not the campground author
    if (!campground.author.equals(req.user._id)) {

        // Show an error message
        req.flash('error', "You don't have permission to do that");

        // Redirect back to the campground page
        return res.redirect(`/campgrounds/${id}`);
    }

    // User owns the campground, so continue
    next();
};

