const router = require('express').Router();
const { Landmark } = require('../../models');
const searchQuery = require('../../public/js/script')


// Handle GET requests to the /search route
router.get('/search', async (req, res) => {
    

    try {
        const landmarkData = await Landmark.findAll({ where: { location: searchQuery}});  

    res.render('searchbar', { query, landmarkData });
    } catch (err) {
        res.status(400).json(err);
    }


});

module.exports = router;