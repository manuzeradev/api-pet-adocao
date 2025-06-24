const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/auth.middleware');

const userController = require('../controllers/userController');
const petController = require('../controllers/petController');
const adoptionController = require('../controllers/adoptionController');


router.get('/users', authenticateToken, authorizeRoles('admin'), userController.getAllUsers);
router.get('/users/:id', authenticateToken, userController.getUserById);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, authorizeRoles('admin'), userController.deleteUser);

router.get('/pets', authenticateToken, authorizeRoles('admin'), petController.getAllPets);
router.get('/pets/:id', authenticateToken, authorizeRoles('admin'), petController.getPetById);
router.post('/pets', authenticateToken, authorizeRoles('admin'), petController.createPet);
router.put('/pets/:id', authenticateToken, authorizeRoles('admin'), petController.updatePet);
router.delete('/pets/:id', authenticateToken, authorizeRoles('admin'), petController.deletePet);

router.get('/adoptions', authenticateToken, authorizeRoles('admin'), adoptionController.getAllAdoptions);
router.post('/adoptions', authenticateToken, authorizeRoles('adopter'), adoptionController.createAdoption);

module.exports = router;
