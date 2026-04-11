const pool = require("../config/db")
const scriptDB = require("../config/scriptDB")


const skillModel = {
    // Save
    async save({name, rating, image}){
        const query = await pool.query(`
            INSERT INTO skill(name, rating, image)
            VALUES($1, $2, $3) RETURNING *
        `, [name, rating, image])
        return query.rows
    },
    // Find Name
    async findName({name, id}){
        const query = await pool.query("SELECT * FROM skill WHERE name = $1 and id != $2", [name, id])
        return query.rows
    },
    // Find One
    async findOne({id, name}){
        const query = await pool.query(`SELECT * FROM skill WHERE id = $1 OR name = $2`, [id, name])
        return query.rows
    },
    // Find All
    async find({page, limit}){
        const offset = (page - 1) * limit
        if(limit === 0){
            const query = await pool.query(`SELECT * FROM skill ORDER BY created_at DESC`)
            return {
                skill: query.rows,
                total: query.rowCount
            }
        }
        const query = await pool.query(`SELECT * FROM skill ORDER BY created_at DESC LIMIT $1 OFFSET $2`, [limit, offset])
        const count = await pool.query("SELECT COUNT(*) FROM skill")
        return {
            skill: query.rows,
            total: Number(count.rows[0].count)
        }
    },
    // Update One
    async updateOne({id, name, rating, image}) {
        const query = await pool.query(`
            UPDATE skill 
            SET 
                name = $1, 
                rating = $2, 
                image = COALESCE($3, image)
            WHERE id =  $4 RETURNING *
        `, [name, rating, image, id])
        return query.rows
    },
    // Delete One
    async deleteOne({id}){
        const query = await pool.query(`DELETE FROM skill WHERE id = $1 RETURNING *`, [id])
        return query.rows
    },
}

module.exports = skillModel