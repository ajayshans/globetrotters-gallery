const router = require('express').Router();
const searchBarRoutes = require('./searchBarRoutes');
//const commentRoutes = require('./commentRoutes')
//const usersRoutes = require('./userRoutes')


router.use('/search', searchBarRoutes);
//router.use('/comment', commentRoutes)


module.exports = router;
