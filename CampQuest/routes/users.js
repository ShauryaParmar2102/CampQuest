const express= require('express');
const router= express.Router({mergeParams:true});
const userModel= require('../models/user.js');
const wrapAsync= require('../utilities/wrapAsync');
const ExpressError= require('../utilities/ExpressError');
const passport= require('passport');
const users= require('../controllers/UserController.js');
// Import user registration validation middleware
const { validateUser } = require('../middlewares.js');

// ==================== USER AUTHENTICATION ROUTES ====================

// REGISTER ROUTES
router.route('/register')
.get(users.renderRegisterForm) // Show the user registration form
.post(validateUser, wrapAsync(users.register)); // Validate the data, then register the user

//login routes
router.route('/login')
.get(users.renderLoginForm)
.post(passport.authenticate('local', {failureFlash:true, failureRedirect: '/login'}), users.login);

//logout
router.get('/logout', users.logout);

// Exports the user router
module.exports= router;