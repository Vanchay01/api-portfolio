const pool = require("../config/db")

const featureModel = {
    async create({name, description, by_work}){
        const sql = await pool.query(`
            INSERT INTO key_feature(name, description, by_work)
            VALUES($1, $2, $3) RETURNING *
        `, [name, description, by_work])
        return sql.rows
    }
}

module.exports = featureModel