const router = require('express').Router();
const searchBarRoutes = require('./searchBarRoutes');
//const commentRoutes = require('./commentRoutes')

const apiRoutes = require('.');
//const homeRoutes = require('./homeRoutes');

//router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/search', searchBarRoutes);
//router.use('/comment', commentRoutes)

module.exports = router;