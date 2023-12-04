const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
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
        res.json('register', { error: 'Error during registration. Please try again.' });
    }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
