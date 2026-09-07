// Function that wraps an async function to handle errors
function wrapAsync(func){
    // Return a new Express middleware function
    return (req,res,next)=>{
        // Run the async function and pass any errors to Express
        func(req,res,next).catch(next);
    }
}
// Export the function so it can be used in other files
module.exports= wrapAsync;