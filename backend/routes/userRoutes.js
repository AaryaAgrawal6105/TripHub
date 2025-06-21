const express = require("express");
const { updateUser, updatePassword } = require("../controllers/userController");
const auth = require('../middleware/authMiddleware');
const router = express.Router();
const { uploadProfilePic, deleteProfilePic } = require("../controllers/userController");
const { upload } = require("../middleware/cloudinary");


router.put("/update", auth, updateUser);
router.put("/password", auth, updatePassword);

router.post('/profile-picture', auth, upload.single('profilePic'), uploadProfilePic);
router.delete('/profile-picture', auth, deleteProfilePic);


module.exports = router;