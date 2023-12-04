const router = require('express').Router();
const itineraryRoutes = require('./itineraryRoutes');
const userRoutes = require('./userRoutes');


router.use('/itineraries', itineraryRoutes);
router.use('/users', userRoutes);



module.exports = router;
