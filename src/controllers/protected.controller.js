const UserService = require('../services/userService');
const PetsService = require('../services/petsService');
const AdoptionsService = require('../services/adoptionsService');

class ProtectedController {
     static _handleError(res, error) {
        return res.status(500).json({
            message: "Ocorreu um erro inesperado.",
            error: error.message,
        });
    }

    static async getUsers(req, res) {
        try {
            const result = await UserService.retrieveAllUsers();
            return res.status(200).json(result);
        } catch (error) {
            return ProtectedController._handleError(res, error);
        }
    }

    static async getUserById(req, res) {
        try {
            const result = await UserService.retrieveUserById(req.params);
            return res.status(200).json(result);
        } catch (error) {
            return ProtectedController._handleError(res, error);
        }
    }

    static async modifyUser(req, res) {
        try {
            const result = await UserService.updateExistingUser(req.body, req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return ProtectedController._handleError(res, error);
        }
    }

    static async removeUser(req, res) {
        try {
            const result = await UserService.removeUser(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return ProtectedController._handleError(res, error);
        }
    }

    static async getAllPets(req, res) {
        try {
            const result = await PetsService.retrieveAllAnimals();
            return res.status(200).json(result);
        } catch (error) {
            return ProtectedController._handleError(res, error);
        }
    }

    static async getPetById(req, res) {
        try {
            const result = await PetsService.getAnimalById(req.params);
            return res.status(200).json(result);
        } catch (error) {
            return ProtectedController._handleError(res, error);
        }
    }

    static async createPet(req, res) {
        try {
            const result = await PetsService.registerNewAnimal(req.body);
            return res.status(200).json(result);
        } catch (error) {
            return ProtectedController._handleError(res, error);
        }
    }

    static async modifyPet(req, res) {
        try {
            const result = await PetsService.updateAnimalDetails(req.body, req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return ProtectedController._handleError(res, error);
        }
    }

    static async removePet(req, res) {
        try {
            const result = await PetsService.removeAnimal(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return ProtectedController._handleError(res, error);
        }
    }

    static async getAllAdoptions(req, res) {
        try {
            const result = await AdoptionsService.getAllAdoptions();
            return res.status(200).json(result);
        } catch (error) {
            return ProtectedController._handleError(res, error);
        }
    }

    static async createAdoption(req, res) {
        try {
            const result = await AdoptionsService.registerNewAdoption(req.body);
            return res.status(200).json(result);
        } catch (error) {
            return ProtectedController._handleError(res, error);
        }
    }
}
module.exports = ProtectedController;
