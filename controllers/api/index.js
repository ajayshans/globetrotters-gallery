const router = require('express').Router();
const searchBarRoutes = require('./searchBarRoutes');


router.use('/searchBarRoutes', searchBarRoutes);


module.exports = router;
