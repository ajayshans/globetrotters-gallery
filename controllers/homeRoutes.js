const router = require('express').Router();
const { Landmark, User } = require('../models');
// const withAuth = require('../utils/auth');


// Use withAuth middleware to prevent access to route
router.get('/profile', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // Note: findbyPk(1, needs to be changed to findbyPk(req.session.user_id, once login logic is ready
    const userData = await User.findByPk(1, {
      attributes: { exclude: ['password'] },
      include: [{ model: Landmark }],
    });

    const user = userData.get({ plain: true });
    res.render('profile', {
      user,
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
  
});

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;
