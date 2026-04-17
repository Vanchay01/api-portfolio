const pool = require("../config/db");

const profileModel = {
    // add
    async save({name, username, phone, email, address, about, date, password, image}){
        const query = await pool.query(`
            INSERT INTO profile(name, username, phone, email, address, about, date, password, image)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
        `, [name, username, phone, email, address, about, date, password, image])
        return query.rows
    },
    // find all
    async find(offset, limit){
        if (limit === 0){
            const sql = await pool.query("SELECT * FROM profile ORDER BY created_at DESC")
            return {
                profile: sql.rows,
                total: sql.rowCount
            }
        }
        
        const sql = await pool.query(`
            SELECT * FROM profile ORDER BY created_at DESC
            LIMIT $1 OFFSET $2
        `, [limit, offset])
        const count = await pool.query("SELECT COUNT(*) FROM profile")
        return {
            profile: sql.rows,
            total: Number(count.rows[0].count)
        }
    },
    // find one
    async findOne({id, name}){
        const sql = await pool.query("SELECT * FROM profile WHERE id = $1 OR name = $2", [id, name])
        return sql.rows
    },
    async findName({id, name}){
        const sql = await pool.query(`SELECT * FROM profile WHERE name = $1 and id != $2`, [id, name])
        return sql.rows
    },
    // update
    async updateOne(name, username, phone, email, address, about, date, password, image, id){
        const sql = await pool.query(`
            UPDATE profile SET 
                name = $1,
                username = $2,
                phone = $3,
                email = $4,
                address = $5,
                about = $6,
                date = $7,
                password = $8,
                image = $9
            WHERE id = $10 RETURNING *
        `, [name, username, phone, email, address, about, date, password, image, id]) 
        
        return sql.rows
    },
    // deletc one
    async deleteOne(id){
        const sql = await pool.query(`DELETE FROM profile WHERE id = $1 RETURING *`, [id])
        return sql.rows
    }
    
}

module.exports = profileModel