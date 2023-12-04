const router = require('express').Router();
const { Landmark, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const landmarkData = await Landmark.findAll({
    include : [
        {
            model: User,
            as: 'user',
            attributes:['id','username']
        }
    ]
    });
    const landmarkData2 = landmarkData.map((landmark) => landmark.get({ plain: true}));

//res.json(landmarkData2)
res.render('homepage', {landmarkData2 });
} catch (err) {
    res.status(400).json(err);
}
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // Note: findbyPk(1, needs to be changed to findbyPk(req.session.user_id, once login logic is ready
    const userData = await User.findByPk(req.session.user_id, {
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

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
