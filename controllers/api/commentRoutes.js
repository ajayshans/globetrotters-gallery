const router = require('express').Router();
const { Landmark, User, Comment } = require('../../models');
const script = require('../../public/js/script');
console.log(script.landmarkId)
router.get('/', async (req, res) => {
    

    try {
        

        
        const [landmarkData, commentData] = await Promise.all([
            Landmark.findOne({
                where: { id: script.landmarkId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'username']
                    }
                ]
            }),
            Comment.findAll({
                where: { landmark_id: script.landmarkId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'username']
                    }
                ]
            })
        ]);

        const landmarkData2 = landmarkData.map((landmark) => landmark.get({ plain: true }));
        const commentData2 = commentData.map((comment) => comment.get({ plain: true }));

      
        res.render('comment', {landmarkData2, commentData2 });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;