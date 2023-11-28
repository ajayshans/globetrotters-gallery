const router = require('express').Router();
const searchBarRoutes = require('./searchBarRoutes');


router.use('/search', searchBarRoutes);


module.exports = router;
