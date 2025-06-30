const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/auth.middleware');

const ProtectedController = require('../controllers/protected.controller');


router.get('/users', authenticateToken, authorizeRoles('admin'), ProtectedController.getUsers);
router.get('/users/:id', authenticateToken, ProtectedController.getUserById);
router.put('/users/:id', authenticateToken, ProtectedController.modifyUser);
router.delete('/users/:id', authenticateToken, authorizeRoles('admin'), ProtectedController.removeUser);

router.get('/pets', authenticateToken, authorizeRoles('admin'), ProtectedController.getAllPets);
router.get('/pets/:id', authenticateToken, authorizeRoles('admin'), ProtectedController.getPetById);
router.post('/pets', authenticateToken, authorizeRoles('admin'), ProtectedController.createPet);
router.put('/pets/:id', authenticateToken, authorizeRoles('admin'), ProtectedController.modifyPet);
router.delete('/pets/:id', authenticateToken, authorizeRoles('admin'), ProtectedController.removePet);

router.get('/adoptions', authenticateToken, authorizeRoles('admin'), ProtectedController.getAllAdoptions);
router.post('/adoptions', authenticateToken, authorizeRoles('adopter'), ProtectedController.createAdoption);

module.exports = router;
