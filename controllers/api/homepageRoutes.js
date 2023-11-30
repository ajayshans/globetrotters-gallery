const express = require('express');
const router = express.Router();
const { Landmark, User } = require('../models');

// Handle GET requests to the homepage
router.get('/', async (req, res) => {
  try {
    // Fetch all landmarks along with associated user data
    const itineraries = await Landmark.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
    });

    res.render('homepage', { itineraries });
  } catch (error) {
    console.error('Error fetching landmarks:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
