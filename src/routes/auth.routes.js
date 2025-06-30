const express = require('express');
const AuthController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/users', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;