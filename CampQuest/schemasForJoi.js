
const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

// Create a custom Joi extension for blocking HTML in strings
const extension = (joi) => ({
    type: 'string',  // Apply this extension to Joi string values
    base: joi.string(), // Use Joi's normal string validation as the base
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    // Define the custom validation rules
    rules:{
         // Create a custom rule called escapeHTML
        escapeHTML: {
            validate(value, helpers) // Check the submitted string for HTML
             {
                // Remove all HTML tags and attributes from the value
                const clean = sanitizeHtml(value, {
                    allowedTags: [], // Do not allow any HTML tags
                    allowedAttributes: {}, // Do not allow any HTML attributes
                });
                // If the cleaned value is different, HTML was found
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
            }
        }
    }
});

// Add the custom extension to Joi
const Joi = BaseJoi.extend(extension);

// Create and export the Joi schema for campground form validation
module.exports.campgroundSchema= Joi.object({

    // Validate the campground object submitted from the form
    campgrounds: Joi.object({
         // Title must be a string, is required, and cannot contain HTML
        title: Joi.string().required().escapeHTML(),

        // Price must be a number and is required    
        price: Joi.number().required(),

         // Location must be a string, is required, and cannot contain HTML
        location: Joi.string().required().escapeHTML(),

        // Description must be a string, is required, and cannot contain HTML
        description: Joi.string().required().escapeHTML()
    }).required(), // The campground object itself must exist

        // Optional array containing images the user wants to delete
    deleteImages: Joi.array() //not required
});


// Create and export the Joi schema for validating reviews
module.exports.reviewSchema= Joi.object({
     // Validate the review object submitted from the form
    reviews: Joi.object({

        // Rating is required and must be a number between 1 and 5
         rating: Joi.number().required().min(1).max(5),

         // Review body is required and cannot contain HTML
         body: Joi.string().required().escapeHTML()

         // The reviews object itself is required
    }).required()
})

// Validate user registration details before they are accepted
module.exports.userSchema = Joi.object({

    // Username must be 3-20 characters and cannot contain HTML
    username: Joi.string()
        .min(3)
        .max(20)
        .required()
        .escapeHTML(),

    // Email must be a valid email address and cannot contain HTML
    email: Joi.string()
        .email()
        .required()
        .escapeHTML(),

    // Password must be at least 8 characters
    password: Joi.string()
        .min(8)
        .required()
});
