const express = require('express');
const router = express.Router();
const { addEvent, getEvents, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addEvent);
router.get('/', authMiddleware, getEvents);
router.delete('/:id', authMiddleware, deleteEvent);

module.exports = router;
