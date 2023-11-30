const router = require('express').Router();
const searchBarRoutes = require('./searchBarRoutes');
//const commentRoutes = require('./commentRoutes')
const userRoutes=require('./userRoutes')

router.use('/search', searchBarRoutes);
//router.use('/comment', commentRoutes)
router.use('/users', userRoutes)

module.exports = router;
