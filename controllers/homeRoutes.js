const router = require('express').Router();
const { Landmark, User, Comment } = require('../models');
const withAuth = require('../utils/auth');




router.get('/', async (req, res) => {
  try {
    //get all landmark posts
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


res.render('homepage', {landmarkData2, logged_in: true });
} catch (err) {
    res.status(400).json(err);
}
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
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


router.get('/search', async (req, res) => {
  const searchQuery = req.query.query
//matching all landmarks with the specific search query
  try {
      const landmarkData = await Landmark.findAll({ where: { location: searchQuery},
      where: { location: searchQuery },
      //include username to put ontop of landmark
      include : [
          {
              model: User,
              as: 'user',
              attributes:['id','username']
          }
      ]
      });
      //map the data
      const landmarkData2 = landmarkData.map((landmark) => landmark.get({ plain: true}));
      
  

  res.render('searchbar', {
     searchQuery,
      landmarkData2,
      logged_in: true
     });
  } catch (err) {
      res.status(400).json(err);
  }


});
//allows us to access this variable globally
let globalLandmarkId;


router.get('/comment/:landmarkId', async (req, res) => {
  

  try {
      globalLandmarkId= req.params.landmarkId

      //gets the particular landmark and all the comments assigned to it
      const [landmarkData, commentData] = await Promise.all([
          Landmark.findAll({
              where: { id: globalLandmarkId },
              include: [
                  {
                      model: User,
                      as: 'user',
                      attributes: ['id', 'username']
                  }
              ]
          }),
          Comment.findAll({
              where: { landmark_id: globalLandmarkId },
              //include username to put in table
              include: [
                  {
                      model: User,
                      as: 'user',
                      attributes: ['id', 'username']
                  }
              ]
          })
      ]);
      
      //mapping data
      const landmarkData2 = landmarkData.map((landmark) => landmark.get({ plain: true }));
      const commentData2 = commentData.map((comment) => comment.get({ plain: true }));

    
      res.render('comment', {landmarkData2, commentData2, logged_in:true });
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/comment/:landmarkId', async (req, res) => {
    
  try {
      const username = await User.findOne({
           where: { id: req.session.user_id
          }
      })
      
      
      let review = req.body.commentText;
      
      if (typeof review !== 'string') {
        review = String(review);
      }

      // Create a new comment
      const newComment = await Comment.create({
          user_username: username.username,
          landmark_id: globalLandmarkId,
          review: review,
      });

      
      //find the particular landmark and associated comments again once new comment is posted
      const [landmarkData, commentData] = await Promise.all([
          Landmark.findAll({
              where: { id: globalLandmarkId },
              include: [
                  {
                      model: User,
                      as: 'user',
                      attributes: ['id', 'username']
                  }
              ]
          }),
          Comment.findAll({
              where: { landmark_id: globalLandmarkId },
              include: [
                  {
                      model: User,
                      as: 'user',
                      attributes: ['id', 'username']
                  }
              ]
          })
      ]);



      const landmarkData2 = landmarkData.map((landmark) => landmark.get({ plain: true }));
      const commentData2 = commentData.map((comment) => comment.get({ plain: true }));
      
      res.render('comment', { commentData2, landmarkData2, logged_in: true });
  } catch (error) {
      console.error('Error submitting comment:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
