const pool = require("../config/db")


const skillModel = {
    async find(){
        const query = await pool.query(`SELECT * FROM skill`)
        return query.rows
    },
}

module.exports = skillModel