const pool = require("../config/db")


const skillModel = {
    async save({name, image, rating}){
        const query = await pool.query(`INSERT INTO skill(name, image, rating) VALUES($1, $2, $3) RETURNING *`, [name, image, rating])
        return query.rows
    },
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