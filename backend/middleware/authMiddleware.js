const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    req.userId = decoded.id;

        const user = await User.findById(decoded.id).select("-password");
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};


module.exports = authMiddleware;