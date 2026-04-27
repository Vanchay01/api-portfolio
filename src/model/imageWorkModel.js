const pool = require("../config/db")


const imageWorkModel = {
    async create({originalname, path, filename, size, encoding, by_work}){
        const sql = await pool.query(`
            INSERT INTO image_work(originalname, path, filename, size, encoding, by_work)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [originalname, path, filename, size, encoding, by_work])
        return sql.rows
    }
}

module.exports = imageWorkModel
