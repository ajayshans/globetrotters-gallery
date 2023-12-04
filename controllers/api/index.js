const router = require('express').Router();
const searchBarRoutes = require('./searchBarRoutes');
const itineraryRoutes = require('./itineraryRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes')


router.use('/search', searchBarRoutes);
router.use('/itineraries', itineraryRoutes);
router.use('/comment', commentRoutes)
router.use('/users', userRoutes);


module.exports = router;
