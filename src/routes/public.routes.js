const express = require('express');
const PublicController = require('../controllers/public.controller');
const router = express.Router();

router.get('/pets/available', PublicController.petsAvailable);

module.exports = router;