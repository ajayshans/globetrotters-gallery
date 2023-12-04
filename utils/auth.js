// auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../models'); 

// GET login page
router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard'); // Redirect if already logged in
    }
    res.render('login'); // Render login page using Handlebars
});

// POST login request
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user; // Set user in session
            res.redirect('/dashboard');
        } else {
            res.render('login', { error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// POST logout request
router.post('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy(() => {
            res.redirect('/login'); // Redirect to login page after logout
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;

const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  

