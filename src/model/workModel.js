const pool = require("../config/db");

const workModel = { 
    // save
    async save(client, name, position, github, demo, framework, description){
        const sql = await client.query(`
            INSERT INTO work(name, position, github, demo, framework, description)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING * 
        `, [name, position, github, demo, framework, description])
        return sql.rows
    },
    // find one
    async findOne({id, name}){
        const sql = await pool.query(`
            SELECT * FROM work WHERE id = $1 OR name = $2    
        `, [id, name])
        return sql.rows
    },
    async find(pages, limit){
        const offset = (pages - 1) * limit;
        if(limit === 0 || pages === 0){
            console.log("1")
            const sql = await pool.query(`
                SELECT * FROM work ORDER BY created_at DESC    
            `,)
            return {
                work: sql.rows,
                total: sql.rowCount
            }
        }
        console.log("2")
        const sql = await pool.query(`
            SELECT * FROM work ORDER BY created_at DESC OFFSET $1 LIMIT $2
        `, [offset, limit])
        const sql_count = await pool.query(`
            SELECT COUNT(*) FROM work
        `)
        return {
            work: sql.rows,
            total: Number(sql_count.rows[0].count)
        }
    },


}

module.exports = workModel