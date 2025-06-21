const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { cloudinary } = require('../middleware/cloudinary');

exports.updateUser = async (req, res) => {
  const { name } = req.body;
  const user = await User.findById(req.user.id);
  user.name = name || user.name;
  await user.save();
  res.json({ success: true, user });
};

exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Incorrect current password" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ success: true });
};

exports.uploadProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    // Delete old pic if exists
    if (user.profilePic) {
      const publicId = user.profilePic.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`profile_pics/${publicId}`);
    }

    user.profilePic = req.file.path;
    await user.save();

    res.status(200).json({ msg: 'Profile picture updated', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user.profilePic) return res.status(400).json({ msg: 'No profile picture to delete' });

    const publicId = user.profilePic.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`profile_pics/${publicId}`);

    user.profilePic = undefined;
    await user.save();

    res.status(200).json({ msg: 'Profile picture deleted', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
