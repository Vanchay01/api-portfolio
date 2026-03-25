const pool = require("../config/db");

const profileModel = {
    async save({name, username, phone, email, address, about, date, password, image}){
        const query = await pool.query(`
            INSERT INTO profile(name, username, phone, email, address, about, date, password, image)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
        `, [name, username, phone, email, address, about, date, password, image])
        return query.rows
    },
    async find(){
        const query = await pool.query("SELECT * FROM profile ORDER BY created_at DESC")
        return query.rows
    },
    async updateOne(name, username, phone, email, address, about, date, password, image, id){
        console.log(phone)
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
    }
    
}

module.exports = profileModel