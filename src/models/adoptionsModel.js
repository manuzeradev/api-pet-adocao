const db = require("../config/database");

class AdoptionsModel {

    static async retrieveAll() {
        const [rows] = await db.query(
            "SELECT id, user_id, pet_id, adoption_date FROM adoptions"
        );
        return rows;
    }

    static async insert(adoptionData) {
        const { user_id, pet_id, adoption_date } = adoptionData;
        const [result] = await db.query(
            "INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, ?)",
            [user_id, pet_id, adoption_date]
        );
        return result.insertId;
    }

}

module.exports = AdoptionsModel;