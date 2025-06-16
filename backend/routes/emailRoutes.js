const express = require('express');
const router = express.Router();
const { sendTripInvite } = require('../controllers/emailController');
const { joinTrip } = require('../controllers/tripController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/invite', authMiddleware, sendTripInvite);
router.post('/join', authMiddleware, joinTrip);
module.exports = router;
