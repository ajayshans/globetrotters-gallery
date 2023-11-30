const router = require('express').Router();
const searchBarRoutes = require('./searchBarRoutes');
const commentRoutes = require('./commentRoutes')


router.use('/search', searchBarRoutes);
router.use('/comment', commentRoutes)


module.exports = router;
