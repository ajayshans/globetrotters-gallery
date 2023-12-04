const router = require('express').Router();
const { Landmark, User, Comment } = require('../../models');
const script = require('../../public/js/script');

router.get('/', async (req, res) => {
    script.landmarkId = 1

    try {
        

        
        const [landmarkData, commentData] = await Promise.all([
            Landmark.findAll({
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

router.post('/api/comment', async (req, res) => {
    const commentPost = req.query.query
    try {
        const { commentText } = commentPost

        const user = req.user

        const landmarkID = 1 //to be changed when script works

        const newComment = await Comment.create({
            user_username: user.username,
            lankmark_id: landmarkID,
            review: commentText,
        });
        
  
        const updatedComments = await Comment.findAll({ where: { landmarkId } });
        res.json({ success: true, comments: updatedComments });
      
      
    } catch (error) {
      console.error('Error submitting comment:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

module.exports = router;``