const router = require('express').Router();

const apiRoutes = require('.');
//const homeRoutes = require('./homeRoutes');

//router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/search', searchBarRoutes);

module.exports = router;