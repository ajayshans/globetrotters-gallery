const express = require('express');
const router = express.Router();
const authRouter = require('./auth'); // Importing the auth.js router

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Using the auth router for authentication related routes
router.use(authRouter);

// Example of a protected route: Dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
    // This route is now protected and can be accessed only by authenticated users
    res.render('dashboard', { user: req.session.user });
});

// Home Page - Accessible to everyone
router.get('/', (req, res) => {
    res.render('home');
});

// Other routes can be added here

module.exports = router;