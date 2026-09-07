const campgroundModel = require('../models/campground.js');
const { cloudinary } = require('../cloudinary');

// Display all campgrounds
module.exports.index = async (req, res, next) => {

    // Get all campgrounds from MongoDB
    let campsArr = await campgroundModel.find({});

    // Render the campground index page and pass the campground data to it
    res.render('campgrounds/index', { campsArr });

};

// Show the new campground form
module.exports.renderNewForm = async (req, res) => {
    res.render('campgrounds/new');     // Render the new campground form
};

// Create a new campground
module.exports.create = async (req, res, next) => {

    // Mapbox geocoding temporarily disabled
    // const geoData = await geocoder.forwardGeocode({
    //     query: req.body.campgrounds.location,
    //     limit: 1
    // }).send();

    const newCamp= new campgroundModel(req.body.campgrounds); // Create a new campground using the submitted form data
    // newCamp.geometry= geoData.body.features[0].geometry;  // Add the Mapbox geographical coordinates to the campground
    newCamp.images= req.files.map(file=> ({url: file.path, filename: file.filename}));  // Convert uploaded files into image objects containing their URL and filename

    newCamp.author= req.user._id;     // Set the logged-in user as the author of the campground

    await newCamp.save(); // Save the new campground to MongoDB
    console.log(newCamp); // Display the created campground in the console
    req.flash('success', "Successfully created campground!");
    res.redirect(`/campgrounds/${newCamp._id}`);  // Redirect to the newly created campground
};

// Display one campground
module.exports.show= async(req,res)=> {

    // Get the campground ID from the URL
    const id= req.params.id;

    // Find the campground and load its reviews, review authors and campground author
    const camp= await campgroundModel.findById(id).populate({
        path: 'reviews',

        // Populate the author inside each review
        populate:{
            path: 'author'
        }
    }).populate('author');     // Populate the author of the campground

     // Check if the campground could not be found
      if(!camp){
        req.flash('error', "Cannot find campground"); // Display an error message
        return res.redirect('/campgrounds');  // Redirect back to all campgrounds
    }
    res.render('campgrounds/show',{camp}); // Render the campground details page and send it the campground
}

// Show the campground edit form
module.exports.renderEditForm= async(req,res)=> {
    const id = req.params.id; // Get the campground ID from the URL
    const camp= await campgroundModel.findById(id);  // Find the campground in MongoDB

    // Check if the campground could not be found
    if(!camp) {
        req.flash('error', "Cannot find campground");
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {camp}); // Render the edit form and pass the campground data to it
}

// Update an existing campground
module.exports.edit= async(req,res)=> {
    const id= req.params.id; // Get the campground ID from the URL

    //UPDATE IN DB
    
    const updatedCamp= await campgroundModel.findByIdAndUpdate(id,{...req.body.campgrounds}); // Update the campground using the submitted form data
    const imgArr= req.files.map(file=> ({url: file.path, filename: file.filename}));  // Convert newly uploaded files into image objects
    updatedCamp.images.push(...imgArr) // Add the newly uploaded images to the campground's existing images

    await updatedCamp.save(); // Save the campground with the new images to MongoDB

    // Check if the user selected any images to delete
    if(req.body.deleteImages){

            // Loop through each image selected for deletion
        for(let filename of req.body.deleteImages){

            // Delete the image from Cloudinary
            await cloudinary.uploader.destroy(filename);
        }
            // Remove the deleted images from the campground in MongoDB
        await updatedCamp.updateOne( {$pull: {images: {filename: { $in: req.body.deleteImages} } } });
    }
        
    req.flash('success', "Successfully updated campground!"); // Display a success message after updating the campground

    res.redirect(`/campgrounds/${updatedCamp._id}`); // Redirect to the updated campground's page
}