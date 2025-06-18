const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
