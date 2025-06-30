const db = require('../config/database');

class UserModel {
    static async retrieveByEmail(email) {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0];
    }

    static async insert(userData) {
        const { name, email, password, phone, role } = userData;
        const finalRole = role || 'adopter'; 

        const [result] = await db.query(
            "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
            [name, email, password, phone, finalRole]
        );
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await db.query(
            "SELECT id, name, email, phone, role FROM users;"
        );
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query(
            `SELECT id, name, email, phone, role FROM users WHERE id = ?`,
            [id]
        );
        return rows[0];
    }

    static async modify(id, updatedData) {
        const { name, email, password, phone } = updatedData;
        
        const [result] = await db.query(
            "UPDATE users SET name = ?, email = ?, password = ?, phone = ? WHERE id = ?",
            [name, email, password, phone, id]
        );
        return result.affectedRows > 0;
    }

    static async remove(id) {
        const [result] = await db.query(
            "DELETE FROM users WHERE id = ?",
            [id]
        );
        return result.affectedRows > 0;
    }
}
module.exports = UserModel;
