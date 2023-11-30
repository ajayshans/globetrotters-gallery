const router = require('express').Router();

const apiRoutes = require('./api');
const homepageRoutes = require('./homepageRoutes');

router.use('/api', apiRoutes);
router.use('/', homepageRoutes);

module.exports = router;

