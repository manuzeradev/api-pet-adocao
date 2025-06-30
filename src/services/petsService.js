const PetsModel = require("../models/petsModel");

class AnimalManagementService {

    static async retrieveAvailableAnimals() {
        const animals = await PetsModel.retrieveAvailable();
        if (!animals || animals.length === 0) {
            throw new Error("Nenhum animal disponível para adoção foi encontrado no momento.");
        }
        return { animals };
    }

    static async retrieveAllAnimals() {
        const animals = await PetsModel.getAll();
        if (!animals || animals.length === 0) {
            throw new Error("Nenhum animal cadastrado foi encontrado.");
        }
        return { animals };
    }

    static async getAnimalById(animalId) {
        const animal = await PetsModel.getById(animalId);
        if (!animal) {
            throw new Error(`Animal com ID ${animalId} não encontrado.`);
        }
        return { animal };
    }

    static async registerNewAnimal(animalData) {
        const { size } = animalData;
        const validSizes = ['small', 'medium', 'large'];

        if (!validSizes.includes(size)) {
            throw new Error(`Tamanho do animal inválido. Use um dos seguintes: ${validSizes.join(', ')}.`);
        }

        const newAnimal = await PetsModel.insert(animalData);
        if (!newAnimal) {
            throw new Error("Não foi possível adicionar o animal. Verifique os dados e tente novamente.");
        }
        return { message: "Animal registrado com sucesso!", animal: newAnimal };
    }

    static async updateAnimalDetails(updatedData, animalId) {
        const existingAnimal = await PetsModel.getById(animalId);
        if (!existingAnimal) {
            throw new Error(`Animal com ID ${animalId} não encontrado para atualização.`);
        }

        const updateResult = await PetsModel.modify(animalId, updatedData);
        if (!updateResult) {
            throw new Error("Não foi possível atualizar o animal. Verifique as informações fornecidas.");
        }
        return { message: "Detalhes do animal atualizados com sucesso!" };
    }

    static async removeAnimal(animalId) {
        const existingAnimal = await PetsModel.getById(animalId);
        if (!existingAnimal) {
            throw new Error(`Animal com ID ${animalId} não encontrado para remoção.`);
        }

        if (existingAnimal.status === 'adopted') {
            throw new Error(`O animal com ID ${animalId} já foi adotado e não pode ser removido.`);
        }

        const deleteResult = await PetsModel.remove(animalId);
        if (!deleteResult) {
            throw new Error("Não foi possível remover o animal. Tente novamente.");
        }
        return { message: "Animal removido com sucesso!" };
    }
}

module.exports = AnimalManagementService;