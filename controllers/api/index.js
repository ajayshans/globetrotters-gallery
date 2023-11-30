const router = require('express').Router();

const apiRoutes = require('.');
//const homeRoutes = require('./homeRoutes');

<<<<<<< HEAD
//router.use('/', homeRoutes);
router.use('/api', apiRoutes);
=======
router.use('/search', searchBarRoutes);
>>>>>>> 09080164ecdaf52306d42a34ec6fe2cad734a389

module.exports = router;