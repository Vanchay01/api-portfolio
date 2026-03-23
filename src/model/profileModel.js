const pool = require("../config/db");

const profileModel = {
    async save({name, title, about, image}){
        const query = await pool.query(`
            INSERT INTO profile(name, title, about, image)
            VALUES($1, $2, $3, $4) RETURNING *
        `, [name, title, about, image])
        return query.rows
    },
    async find(){
        const query = await pool.query("SELECT * FROM profile ORDER BY created_at DESC")
        return query.rows
    }
    
}

module.exports = profileModel