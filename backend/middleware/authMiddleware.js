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

<<<<<<< HEAD
        const user = await User.findById(decoded.id).select("-password");
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
=======
    const user = await User.findById(decoded.id).select("-password");
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
>>>>>>> 9c9183df7426267dfdd02d7fed7ac58db373fad6
};


module.exports = authMiddleware;