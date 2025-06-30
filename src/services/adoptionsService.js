const AdoptionsModel = require("../models/adoptionsModel");
const PetsModel = require("../models/petsModel"); 
const UserModel = require("../models/userModel");

class AdoptionService {

    static async getAllAdoptions() {
        const adoptions = await AdoptionsModel.retrieveAll(); 
        if (!adoptions || adoptions.length === 0) {
            throw new Error("Não encontramos nenhum registro de adoção.");
        }
        return { adoptions };
    }

    static async registerNewAdoption(adoptionData) {
        const { user_id, pet_id } = adoptionData;

        const userExists = await UserModel.getById(user_id); 
        if (!userExists) {
            throw new Error(`Usuário com ID ${user_id} não encontrado.`);
        }

        const animalExists = await PetsModel.getById(pet_id); 
        if (!animalExists) {
            throw new Error(`Animal com ID ${pet_id} não encontrado.`);
        }

        if (animalExists.status === 'adopted') {
            throw new new Error(`O animal (ID: ${pet_id}) já foi adotado e não está disponível.`);
        }

        const newAdoptionId = await AdoptionsModel.insert(adoptionData); 

        await PetsModel.updateStatusToAdopted(pet_id); 
        return { message: "Adoção registrada com sucesso!", adoptionId: newAdoptionId };
    }
}

module.exports = AdoptionService;