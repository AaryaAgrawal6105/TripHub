// backend/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { getTripSuggestions } = require('../controllers/aiController');

router.post('/suggest', getTripSuggestions);
module.exports = router;
