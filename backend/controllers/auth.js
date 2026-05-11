const User = require('../models/User');
const jwt = require('jsonwebtoken');

console.log('User model:', User)

// Helper function to create token and send cookie
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || true, // Only use HTTPS in production
    sameSite: 'none',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
};

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Create user (the pre-save hook in models/User.js will hash the password!)
    const user = await User.create({
      userName,
      email,
      password,
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation: Ensure both fields are present
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    // 2. Find User: Check if the user exists
    // We must manually .select('+password') because we set 'select: false' in the Schema
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // 3. Check Password: Compare provided password with the hashed password in DB
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // 4. Success: Send back the JWT inside a cookie
    sendTokenResponse(user, 200, res);

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
exports.logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // Expires in 10 seconds
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.status(200).json({ success: true, data: {} });
};
// @desc    Get current logged in user
// @route   POST /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  // req.user was already attached by our 'protect' middleware
  const user = req.user

  res.status(200).json({
    success: true,
    data: user
  });
};