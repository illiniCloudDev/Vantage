const express = require('express');
const { register, login, logout } = require('../controllers/auth');

const router = express.Router();

// Route: /api/auth/register
router.post('/register', register);

// Route: /api/auth/login
router.post('/login', login);

router.get('/logout', logout);

module.exports = router;