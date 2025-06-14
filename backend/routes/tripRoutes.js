const express = require('express');
const router = express.Router();
const { createTrip, getUserTrips, joinTrip} = require('../controllers/tripController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createTrip);
router.get('/', auth, getUserTrips);
router.post('/:id/join', auth, joinTrip);

module.exports = router;