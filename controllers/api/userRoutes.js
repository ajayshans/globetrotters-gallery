const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User }=require('../../models')

router.get('/login', (req, res) => {
  // if (req.session.user) {
    //  return res.redirect('/dashboard'); // Redirect if already logged in
 // }
  res.render('login'); // Render login page using Handlebars
});
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

// Existing login routes...

// Serve the registration page
router.get('/register', (req, res) => {
    // if (req.session.user) {
    //     return res.redirect('/dashboard'); // Optionally redirect if already logged in
    // }
    res.render('register'); // Render register page using Handlebars
});

// Handle the registration form submission
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, 'confirm-password': confirmPassword } = req.body;

        // Check if the user already exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.render('register', { error: 'Email already in use' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.render('register', { error: 'Passwords do not match' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Redirect to login page or set user session directly
        res.redirect('/login');
    } catch (error) {
        console.error('Registration error:', error);
        res.render('register', { error: 'Error during registration. Please try again.' });
    }
});

// Existing logout route...

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