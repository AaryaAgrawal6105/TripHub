const express = require('express');
const router = express.Router();
const { addEvent, getEvents } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addEvent);
router.get('/', authMiddleware, getEvents);

module.exports = router;
