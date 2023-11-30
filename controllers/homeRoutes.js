const express = require('express');
const router = express.Router();
const { Landmark, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Handle GET requests to the homepage
router.get('/', async (req, res) => {
  try {
    // Fetch all landmarks along with associated user data
    const landmarks = await Landmark.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const landmarksData = landmarks.map((landmark) => landmark.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      landmarks: landmarksData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching landmarks:', err);
    res.status(500).json(err);
  }
});

// Handle GET requests to view a specific landmark
router.get('/landmark/:id', async (req, res) => {
  try {
    // Fetch a specific landmark by its primary key (id) and include associated user data
    const landmarkData = await Landmark.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Convert the landmarkData to a plain JavaScript object
    const landmark = landmarkData.get({ plain: true });

    // Render the 'comment' template with the landmark data
    res.render('comment', {
      ...landmark,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching landmark details:', err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to the profile route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Landmark }],
    });

    // Convert the userData to a plain JavaScript object
    const user = userData.get({ plain: true });

    // Render the 'profile' template with the user data
    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error('Error fetching user details for profile:', err);
    res.status(500).json(err);
  }
});

// Handle GET requests to the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // Render the 'login' template
  res.render('login');
});

module.exports = router;
