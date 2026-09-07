// Custom error class for handling Express errors
class ExpressError extends Error{
    // Create an error with a message and HTTP status code
    constructor(message, statusCode){
        super(); // Call the parent Error class constructor
        this.message = message; // Stores the error message
        this.statusCode = statusCode; // Stores the HTTP status code
    }
}

// Export the class so it can be used in other files
module.exports = ExpressError;