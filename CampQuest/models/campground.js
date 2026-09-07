const mongoose= require('mongoose');
const reviewModel= require('./review.js');

const imageSchema= new mongoose.Schema({
    url: String,
    fileName: String
});

// Create a virtual thumbnail property for images
imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200');
});

const opts= {toJSON: {virtuals:true}}; // Include virtual properties when converting to JSON

// Create the campground schema
const campgroundSchema= new mongoose.Schema({
    title: String, // Campground name
    price: Number,
    images:[imageSchema],
    description: String,
    location: String,
    geometry:{
        type:{
            type: String,
            enum: ['Point'],
        },
        coordinates:{
            type:[Number], // Store the campground's longitude and latitude
        }
    },
    author:{
        type: mongoose.Schema.Types.ObjectId, // Store the author's user ID
        ref: 'User' // Link the ID to the User model
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId, // Store each review's ID
            ref: 'Review' // Link the ID to the Review model
        }
    ]
    
}, opts);

// Create the link shown when a campground marker is clicked
campgroundSchema.virtual('properties.popupMarkup').get(function () {
    return `<a href="/campgrounds/${this._id}">${this.title}</a>`;
});
// Delete the campground's reviews when the campground is deleted
campgroundSchema.virtual('findOneAndDelete', async function(doc){
    //Doc is the deleted campground
    console.log(doc);

        // Check that a campground was deleted
    if(doc){
        console.log("im working");
            // Delete all reviews belonging to the deleted campground
         await reviewModel.deleteMany({
            _id:{
                $in: doc.reviews
            }
         })
    }
})

// Create the campground model using the campground schema
const campgroundModel = mongoose.model('campground', campgroundSchema);

// Export the campground model so other files can use it
module.exports= campgroundModel;