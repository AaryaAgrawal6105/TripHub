const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const register = async (req,res) => {
    const { name, email, password} = req.body;
    // console.log("Received data:", req.body);
    try
    {
        if (!name || !email || !password) 
        {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({ msg: 'User already exists'});

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashed});

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{expiresIn: '2d'});
        res.status(201).json({ user: newUser, token});
    }
    catch(err)
    {
        res.status(500).json({ msg: err.message});
    }
};

const login = async (req,res) => {
    const { email, password } = req.body;
    try
    {
        if (!email || !password) 
        {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if(!user) 
        {
            return res.status(400).json({ msg: `Email not registered`});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match)
        {
            return res.status(400).json({ msg: `Invalid password`});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET , {expiresIn: '2d'});
        res.json({user, token});
    }
    catch(err)
    {
        res.status(500).json({ msg: err.message });
    }
};

const checkAuth=  async(req, res)=>{
    try {
        return res.status(200).json({ user: req.user });
    } catch (error) {
        console.log("Error in the checkAuth controller" , error.message);

            return res.status(500).json({ message: "Internal  Server Error" })
    }

}

const logout = async (req, res) => {
    try {
        // Invalidate the token on the client side by removing it
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in the logout controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
  },
});

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hr
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: email,
      subject: "TripHub Password Reset",
      html: `<p>Click below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({ msg: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  register,
  login,
  checkAuth,
  logout,
  forgotPassword,
  resetPassword,
};