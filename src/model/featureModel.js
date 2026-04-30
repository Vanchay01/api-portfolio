const pool = require("../config/db")

const featureModel = {
    async create({name, description, by_work}){
        const sql = await pool.query(`
            INSERT INTO key_feature(name, description, by_work)
            VALUES($1, $2, $3) RETURNING *
        `, [name, description, by_work])
        return sql.rows
    },
    async find(){
        const sql = await pool.query(
            `SELECT * FROM key_feature ORDER BY created_at DESC`,
        )
        return sql.rows
    },
    async findLimit({limit, offset}){
        const sql = await pool.query(
            `SELECT * FROM key_feature ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
            [limit, offset]
        )
        return sql.rows
    },
    async deleteOne({id}){
        const sql = await pool.query(
            `DELETE FROM key_feature WHERE id = $1 RETURNING *`, 
            [id]
        )
        return sql.rows
    },
    async countDocumnet(){
        const sql = await pool.query(
            `SELECT COUNT(*) FROM key_feature`
        )
        return sql.rows
    }
}

module.exports = featureModel