const PetService = require('../services/petService');

class PublicController {
    static async petsAvailable(req, res) {
        try {
            const pets = await PetService.getAvailablePets();
            return res.status(200).json(pets);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar pets disponíveis.' });
        }
    }
}

module.exports = PublicController;
