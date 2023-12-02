const router = require('express').Router();
const searchBarRoutes = require('./searchBarRoutes');
const itineraryRoutes = require('./itineraryRoutes');
//const commentRoutes = require('./commentRoutes')


router.use('/search', searchBarRoutes);
router.use('/itineraries', itineraryRoutes);
//router.use('/comment', commentRoutes)


module.exports = router;
