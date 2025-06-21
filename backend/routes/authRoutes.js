const express = require('express');
const router = express.Router();
const { register, login ,checkAuth ,logout, forgotPassword, resetPassword} = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/check-auth' , auth,checkAuth );
router.post('/logout', auth, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


module.exports = router;