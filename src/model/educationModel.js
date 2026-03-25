const pool = require("../config/db")

const educationModel = {
    // Save
    async save(name, image, major, gpa, year){
        const spl = await pool.query(`
            INSERT INTO education(name, image, major, gpa, year)
            VALUE($1, $2, $3, $4, $5)    
        `, [name, image, major, gpa, year])
        return spl.rows
    },
    // Find All
    async findAll(page, limit){
        const offset = (page - 1) * limit
        
        const count = await pool.query(`SELECT COUNT(*) FORM education`)
        if( limit === 0 ){
            const sql = await pool.query("SELECT * FROM education ORDER BY created_at DESC")
            return res.json({
                education: sql.rows,
                total: Number(count.rows[0].count)
            })
        }

        const sql = await pool.query(`
            SELECT * FROM education ORDER BY created_at DESC
            LIMIT $1 OFFSET $2    
        `, [limit, offset])
        return res.json({
            education: sql.rows,
            total: Number(count.rows[0].count)
        })
    },
    // Find One
    async findOne(id, name){
        const spl = await pool.query(`
            SELECT * FORM education WHERE id = $1
        `, [id])
        return spl.rows
    }

}

module.exports = educationModel