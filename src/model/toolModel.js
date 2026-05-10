const pool = require("../config/db")

const toolModel = {
    async create({name, by_technology}){
        console.log(by_technology)
        const sql = await pool.query(`
            INSERT INTO technology_tool(name, by_technology)
            VALUES($1, $2) RETURNING *
        `, [name, by_technology])
        return sql.rows
    },
    async find(){  
        const sql = await pool.query(
            `SELECT * FROM technology_tool ORDER BY created_at DESC`
        )
        return sql.rows
    },
    async findLimit({limit, offset}){
        const sql = await pool.query(
            `SELECT * FROM technology_tool 
            ORDER BY created_at DESC 
            LIMIT $1 OFFSET $2`,
            [limit, offset]
        )
        return sql.rows
    },
    async deleteOne({id}){
        const sql = await pool.query(`
            DELETE FROM technology_tool 
            WHERE id = $1 RETURNING *
        `, [id])
        return sql.rows 
    },
    async countDocumnet(){
        const sql = await pool.query(
            `SELECT COUNT(*) FROM technology_tool`
        )
        return sql.rows
    }
}

module.exports = toolModel