const router = require('express').Router();
const { Landmark } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newItinerary = await Landmark.create({
      trip: req.body.trip,
      user_id: 1,
      location: req.body.location,
      review: req.body.review,
      name: req.body.name,
      type: req.body.type,
      date: req.body.date
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
        // user_id: req.session.user_id,
        user_id: 1,
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
