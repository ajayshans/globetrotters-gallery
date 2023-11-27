const router = require('express').Router();
const { Landmark } = require('../../models');



// Handle GET requests to the /search route
app.get('/search', async (req, res) => {
    const query = req.query.query || '';

    try {
        const landmarkData = await Landmark.findAll({ where: { location: query}});

    res.render('searchbar', { query, landmarkData });
    } catch (err) {
        res.status(400).json(err);
    }


});