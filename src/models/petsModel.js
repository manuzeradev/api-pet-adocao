const db = require("../config/database");

class PetsModel {

    static async retrieveAvailable() {
        const [rows] = await db.query(
            "SELECT id, name, age, species, size, description, status FROM pets WHERE status = 'available'"
        );
        return rows;
    }

    static async getAll() {
        const [rows] = await db.query(
            "SELECT id, name, age, species, size, description, status FROM pets"
        );
        return rows;
    }

    static async getById(animalId) {
        const [rows] = await db.query(
            `SELECT id, name, age, species, size, description, status FROM pets WHERE id = ?`,
            [animalId]
        );
        return rows[0];
    }

    static async insert(animalData) {
        const { name, age, species, size, description } = animalData;
        const [result] = await db.query(
            "INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, 'available', ?)",
            [name, age, species, size, description]
        );
        return result.insertId;
    }

    static async modify(animalId, updatedData) {
        const { name, age, species, size, description } = updatedData;
        const [result] = await db.query(
            "UPDATE pets SET name = ?, age = ?, species = ?, size = ?, description = ? WHERE id = ?",
            [name, age, species, size, description, animalId]
        );
        return result.affectedRows > 0;
    }

    static async remove(animalId) {
        const [result] = await db.query(
            "DELETE FROM pets WHERE id = ?",
            [animalId]
        );
        return result.affectedRows > 0;
    }

    static async updateStatusToAdopted(animalId) {
        const [result] = await db.query(
            "UPDATE pets SET status = 'adopted' WHERE id = ?",
            [animalId]
        );
        return result.affectedRows > 0;
    }

}
module.exports = PetsModel;