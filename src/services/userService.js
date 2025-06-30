const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

class UserService {
    static async registerUser(userData) {
        const { email, password } = userData;

        const existingUser = await UserModel.retrieveByEmail(email);
        if (existingUser) {
            throw new Error("Este e-mail já está em uso. Por favor, tente outro.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        userData.password = hashedPassword;

        const newUserId = await UserModel.insert(userData);

        return { message: "Usuário registrado com sucesso!", userId: newUserId };
    }

    static async loginUser({ email, password }) {
        const user = await UserModel.retrieveByEmail(email);
        if (!user) {
            throw new Error("Credenciais inválidas. Verifique seu e-mail e senha.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Credenciais inválidas. Verifique seu e-mail e senha.");
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { token };
    }

    static async retrieveAllUsers() {
        const users = await UserModel.getAll();
        if (!users || users.length === 0) {
            throw new Error("Nenhum usuário cadastrado foi encontrado.");
        }
        return { users };
    }

    static async retrieveUserById(userId) {
        const user = await UserModel.getById(userId);
        if (!user) {
            throw new Error(`Usuário com ID ${userId} não encontrado.`);
        }
        return { user };
    }

    static async updateExistingUser(updatedData, userId) {
        const existingUser = await UserModel.getById(userId);
        if (!existingUser) {
            throw new Error(`Usuário com ID ${userId} não encontrado para atualização.`);
        }

        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }

        const updateResult = await UserModel.modify(userId, updatedData);

        if (!updateResult) {
            throw new Error("Falha ao atualizar o usuário. Verifique os dados fornecidos.");
        }

        return { message: "Usuário atualizado com sucesso!", result: updateResult };
    }

    static async removeUser(userId) {
        const existingUser = await UserModel.getById(userId);
        if (!existingUser) {
            throw new Error(`Usuário com ID ${userId} não encontrado para exclusão.`);
        }

        const deleteResult = await UserModel.remove(userId);

        if (!deleteResult) {
            throw new Error("Falha ao excluir o usuário. Tente novamente.");
        }

        return { message: "Usuário excluído com sucesso!", result: deleteResult };
    }
}

module.exports = UserService;