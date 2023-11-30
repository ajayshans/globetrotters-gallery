const router = require('express').Router();
const { Landmark } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newItinerary = await Landmark.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newItinerary);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const itineraryData = await Landmark.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!itineraryData) {
      res.status(404).json({ message: 'No itinerary found with this id!' });
      return;
    }

    res.status(200).json(itineraryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
