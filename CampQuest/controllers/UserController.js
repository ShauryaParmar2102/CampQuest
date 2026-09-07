const userModel = require('../models/user.js');

// Show the registration form
module.exports.renderRegisterForm = (req,res)=> {
     res.render('users/register'); // Render the registration page
}

// Register a new user
module.exports.register = async (req,res,next)=> {

     // Try to register the user and catch any errors
    try {
        const {username, email, password} = req.body; // Get the username, email and password from the submitted form
        const newUser= new userModel({email,username}); // Create a new user using the submitted email and username
        const registeredUser= await userModel.register(newUser,password); // Register the new user with their password

        // Log the newly registered user in
        req.login(registeredUser, err=> {
            req.flash('success', "You have successfully registered!");
            res.redirect('/campgrounds'); // Redirect to the campgrounds page
        })
    } catch (err) {
        req.flash('error',err.message); // Redirect back to the registration page
        res.redirect('/register');
    }
}
// Show the login form
module.exports.renderLoginForm= (req,res)=> {
    res.render('users/login'); // Render the login page
}

// Handle a successful user login
module.exports.login= async (req,res)=> {
    const returnToUrl= req.session.returnToUrl||'/campgrounds'; // Get the page the user was trying to visit, or use campgrounds as the default
    req.flash('success', "Welcome back!" ); // Display a welcome message after successful login
    delete req.session.returnToUrl; // Remove the saved return URL because it is no longer needed
    res.redirect(returnToUrl); // Redirect the user to the page they were trying to access
}

// Log the user out
module.exports.logout = (req, res, next) => {

    // Log the current user out
    req.logout((err) => {

        // If logout fails, send the error to the error handler
        if (err) {
            return next(err);
        }

        // Display a logout success message
        req.flash('success', "Logged out");

        // Redirect to the campgrounds page
        res.redirect('/campgrounds');
    });
};