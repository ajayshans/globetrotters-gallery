const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// const routes = require('./controllers');
// const helpers = require('./utils/helpers');
const User=require("./models/User")
const router = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create();

const sess = {
   secret: 'Super secret secret',
   cookie: {
     maxAge: 300000,
     httpOnly: true,
     secure: false,
     sameSite: 'strict',
   },
   resave: false,
   saveUninitialized: true,
   store: new SequelizeStore({
     db: sequelize
   })
 };

 app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/login', (req, res) => {
  // if (req.session.user) {
    //  return res.redirect('/dashboard'); // Redirect if already logged in
 // }
  res.render('login'); // Render login page using Handlebars
});
app.post('/login', async (req, res) => {
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
app.post('/logout', (req, res) => {
  if (req.session.user) {
      req.session.destroy(() => {
          res.redirect('/login'); // Redirect to login page after logout
      });
  } else {
      res.redirect('/login');
  }
});

 app.use(router);
 router.get('/', async (req, res) => {
     try {
         res.render('homepage');
     } catch (err) {
         res.status(500).json(err);
     }
 });


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
