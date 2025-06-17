const express = require('express');
const router = express.Router();
const { register, login ,checkAuth ,logout} = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/check-auth' , auth,checkAuth );
router.post('/logout', auth, logout);

module.exports = router;