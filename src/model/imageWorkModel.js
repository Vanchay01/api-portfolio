const pool = require("../config/db")
const { async } = require("./imageModel")
const { find } = require("./workModel")


const imageWorkModel = {
    async create({originalname, path, filename, size, encoding, by_work}){
        const sql = await pool.query(`
            INSERT INTO image_work(originalname, path, filename, size, encoding, by_work)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [originalname, path, filename, size, encoding, by_work])
        return sql.rows
    },
    async find(){
        const sql = await pool.query(`
            SELECT * FROM image_work ORDER BY created_at DESC
        `)
        return sql.rows
    },
    async findLimit({limit, offset}){
        const sql = await pool.query(`
            SELECT * FROM image_work ORDER BY created_at DESC LIMIT $1 OFFSET $2
        `, [limit, offset])
        return sql.rows
    },
    async deleteOne({id}) {
        const sql = await pool.query(`
            DELETE FROM image_work WHERE id = $1 RETURNING *
        `, [id])
        return sql.rows
    }
}

module.exports = imageWorkModel
