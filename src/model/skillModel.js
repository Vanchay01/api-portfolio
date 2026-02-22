const pool = require("../config/db")


const skillModel = {
    async save(client, {name, rating}){
        const query = await client.query(`INSERT INTO skill(name, rating) VALUES($1, $2) RETURNING *`, [name, rating])
        return query.rows[0]
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