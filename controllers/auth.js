const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for auth check
const { errorHandler } = require('../helpers/dbErrorHandler');

require('dotenv').config();

exports.signup = async (req, res) => {
  const user = new User(req.body);
  try {
    const data = await user.save();
    if (!data) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user based on email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User with that email doesn't exist. Please signup.",
      });
    }

    // If user found, check if the password matches
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password didn't match",
      });
    }

    // Generate a signed token with user ID and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });

    // Return the token and user details to the frontend client
    const { _id, name, email: userEmail, role } = user;
    return res.json({ token, user: { _id, email: userEmail, name, role } });
  } catch (err) {
    return res.status(400).json({
      error: 'Signin failed. Please try again later.',
    });
  }
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  // algorithms: ['RS256'],
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin resource! Access denied',
    });
  }
  next();
};
