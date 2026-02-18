const pool = require("../config/db")


const skillModel = {
    async find(){
        const query = await pool.query(`SELECT * FROM skill order by created_at DESC`)
        return query.rows
    },
    async deleteOne({id}){
        const query = await pool.query(`DELETE FROM skill WHERE id = $1 RETURNING *`, [id])
        return query.rows
    }
}

module.exports = skillModel