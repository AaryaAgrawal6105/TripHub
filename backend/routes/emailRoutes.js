const express = require('express');
const router = express.Router();
const { sendTripInvite } = require('../controllers/emailController');
const authMiddleware = require('../middleware/auth');

router.post('/invite', authMiddleware, sendTripInvite);
router.post('/join', authMiddleware, joinTrip);
module.exports = router;
