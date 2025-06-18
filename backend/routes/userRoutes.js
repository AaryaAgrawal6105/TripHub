const express = require("express");
const { updateUser, updatePassword } = require("../controllers/userController");
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.put("/update", auth, updateUser);
router.put("/password", auth, updatePassword);

module.exports = router;
