const pool = require("../config/db")


const skillModel = {
    async save({name, rating, image}){
        const query = await pool.query(`
            INSERT INTO skill(name, rating, image)
            VALUES($1, $2, $3) RETURNING *
        `, [name, rating, image])
        return query.rows
    },
    async findOne({id}){
        const query = await pool.query(`SELECT * FROM skill WHERE id = $1`, [id])
        return query.rows
    },
    async find(){
        const query = await pool.query(`SELECT * FROM skill ORDER BY created_at DESC`)
        return query.rows
    },
    async deleteOne({id}){
        const query = await pool.query(`DELETE FROM skill WHERE id = $1 RETURNING *`, [id])
        return query.rows
    }
}

module.exports = skillModel