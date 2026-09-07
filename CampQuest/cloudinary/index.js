const cloudinary= require('cloudinary').v2;
const {CloudinaryStorage}= require('multer-storage-cloudinary');

cloudinary.config({ // Configure the Cloudinary account
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Get the Cloudinary cloud name
    api_key: process.env.CLOUDINARY_KEY, // Get the Cloudinary API key
    api_secret: process.env.CLOUDINARY_SECRET  // Get the API secret from the Cloudinary dashboard through the .env file
});

const storage= new CloudinaryStorage({ // Create storage for uploaded images
    cloudinary, // Use the configured Cloudinary account
    params:{
        folder: 'CampQuest', // Store images in the CampQuest folder
        allowedFormats: ['jpg', 'jpeg', 'png'] // Allow these image formats
    }
});

module.exports= { // Export Cloudinary and storage
    cloudinary, // Export Cloudinary
    storage // Export the image storage
}