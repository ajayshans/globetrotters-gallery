const router = require('express').Router();
const { Landmark, User } = require('../../models');

//const searchQuery = require('../../public/js/script')


// Handle GET requests to the /search route
router.get('/', async (req, res) => {
    const searchQuery = req.query.query

    try {
        const landmarkData = await Landmark.findAll({ where: { location: searchQuery},
        where: { location: searchQuery },
        include : [
            {
                model: User,
                as: 'user',
                attributes:['id','username']
            }
        ]
        });
        const landmarkData2 = landmarkData.map((landmark) => landmark.get({ plain: true}));
    
    //res.json(landmarkData2)
    res.render('searchbar', { searchQuery, landmarkData2 });
    } catch (err) {
        res.status(400).json(err);
    }


});

module.exports = router;