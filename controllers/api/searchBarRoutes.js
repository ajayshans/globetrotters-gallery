const router = require('express').Router();
const { Landmark } = require('../../models');



// Handle GET requests to the /search route
router.get('/search', async (req, res) => {
    const query = req.params.location || '';

    try {
        const landmarkData = await Landmark.findAll({ where: { location: query}});  

    res.render('searchbar', { query, landmarkData });
    } catch (err) {
        res.status(400).json(err);
    }


});

module.exports = router;