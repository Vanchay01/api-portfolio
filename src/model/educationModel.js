const pool = require("../config/db")
const { deleteOne } = require("./skillModel")

const educationModel = {
    // Save
    async save(name, image, major, gpa, year){
        const spl = await pool.query(`
            INSERT INTO education(name, image, major, gpa, year)
            VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [name, image, major, gpa, year])
        return spl.rows
    },
    // Find All
    async findAll(offset, limit){
        if( limit === 0 ){
            const sql = await pool.query("SELECT * FROM education ORDER BY created_at DESC")
            
            return {
                education: sql.rows,
                total: sql.rowCount
            }
        }
        const sql = await pool.query(`
            SELECT * FROM education ORDER BY created_at DESC
            LIMIT $1 OFFSET $2    
        `, [limit, offset])
        const count = await pool.query(`SELECT COUNT(*) FORM education`)
        return {
            education: sql.rows,
            total: Number(count.rows[0].count)
        }
    },
    // Find One
    async findOne({id, name}){
        const spl = await pool.query(`SELECT * FROM education WHERE id = $1 OR name = $2`, [id, name])
        return spl.rows
    },
    // Finf Name
    async findName({name, id}){
        const query = await pool.query("SELECT * FROM education WHERE name = $1 and id != $2", [name, id])
        return query.rows
    },
    // Update One
    async updateOne(name, image, major, gpa, year, id){
        const sql = await pool.query(`
            UPDATE education SET name = $1, image = COALESCE($2, image), major = $3, gpa = $4, year = $5
            WHERE id = $6 RETURNING *
        `, [name, image, major, gpa, year, id])
        return sql.rows
    },
    // Delete One
    async deleteOne(id){
        const sql = await pool.query(`
            DELETE FROM education WHERE id = $1 RETURNING *
        `, [id])
        return sql.rows
    },

}

module.exports = educationModel