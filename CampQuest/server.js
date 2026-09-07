if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express= require('express');
const path= require('path');
const mongoose= require('mongoose');
const ejsMate= require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError= require('./utilities/ExpressError');
const methodOverride= require('method-override');
const passport= require('passport');
const localStrategy= require('passport-local');
const userModel = require('./models/user.js');
const expressMongoSanitize= require('express-mongo-sanitize');
const helmet = require('helmet');

//routes
const campgroundRoutes= require('./routes/campgrounds.js');
const reviewRoutes= require('./routes/reviews.js');
const userRoutes= require('./routes/users.js');


mongoose.connect('mongodb://localhost:27017/campscout');

// Error handling in case the MongoDB connection gives an error
mongoose.connection.on('error', console.error.bind(console, "Connection error:"));
mongoose.connection.once("open", ()=>{
    console.log("Database connected");
});

const app = express();

// Middleware

app.engine('ejs', ejsMate); // Use EJS Mate for page layouts

app.set('view engine', 'ejs');   // Use EJS for page templates

app.set('views', path.join(__dirname, 'views')); // Tell Express where the EJS pages are stored

app.use(express.urlencoded({extended: true})); // Read data from forms

app.use(methodOverride('_method')); // Allow PUT and DELETE requests from forms

app.use(express.static(path.join(__dirname, 'public'))); // Use files from the public folder

//app.use(expressMongoSanitize()); // Protect MongoDB from unsafe user input

// Session configuration
const sessionConfig = {
   secret: 'fa9c2319db64efe474669a8e6b5d2ef352c9bbdefd5f0fc3df42f9187ceaecfc',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}

// Enable sessions using the session settings above
app.use(session(sessionConfig));

// Enable flash messages
app.use(flash());

// Add security headers to the app
app.use(helmet());

// Allow JavaScript to load from these external sources
const scriptSrcUrls = [
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://use.fontawesome.com/releases/v5.15.1/js/all.js",
    "https://code.jquery.com/jquery-3.5.1.slim.min.js",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/", // Font Awesome styling/icons
    "https://api.mapbox.com/",           // Mapbox map styles
    "https://api.tiles.mapbox.com/",     // Mapbox tile styles
    "https://fonts.googleapis.com/",     // Google Fonts styles
    "https://use.fontawesome.com/",      // Font Awesome styles
    "https://code.jquery.com/jquery-3.5.1.slim.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
];

// Allow the app to connect to these Mapbox services
const connectSrcUrls = [
    "https://api.mapbox.com/",       // Get map data from Mapbox
    "https://a.tiles.mapbox.com/",   // Load map tiles
    "https://b.tiles.mapbox.com/",   // Load map tiles
    "https://events.mapbox.com/",    // Mapbox events/telemetry
];

// Allowed font sources
const fontSrcUrls = [];

// Set which sources the browser is allowed to load content from for security
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/ohjpicv5/", // Allow images from my Cloudinary
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

// Set up user authentication
app.use(passport.initialize()); // Start Passport

app.use(passport.session()); // Keep users logged in using sessions

passport.use(new localStrategy(userModel.authenticate())); // Check username/password

passport.serializeUser(userModel.serializeUser()); // Store logged-in user in session

passport.deserializeUser(userModel.deserializeUser()); // Get user back from session

// Make user and flash message data available to all EJS pages
app.use((req, res, next) => {

    // Remember the page the user was on before logging in
    if (!(req.originalUrl == '/login' || req.originalUrl == '/' || req.originalUrl == '/register')) {
        req.session.returnToUrl = req.originalUrl;
    }

    // Make the logged-in user available to EJS pages
    res.locals.currentUser = req.user;

    // Make success messages available to EJS pages
    res.locals.success = req.flash('success');

    // Make error messages available to EJS pages
    res.locals.error = req.flash('error');

    next(); // Continue to the next middleware or route
});

//Router middleware
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes) 
app.use('/', userRoutes);

//Home Route
app.get('/', (req,res)=>{
    res.render('home');
})

//Error handling middleware
app.use((req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

// Handle errors in the app
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;

    console.error(err);

    res.status(statusCode).send(err.message || "Something went wrong");
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('CampQuest running at http://localhost:3000');
});