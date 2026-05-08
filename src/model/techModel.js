const techModel = {
    async create({name, by_work}){
        const sql = await pool.query(
            `INSERT INTO technology(name, by_work)
            VALUES($1, 2$)`,
            [name, by_work]
        )
        return sql.rows
    },
    async find() {
        const sql = await pool.query(
            `SELECT * FROM technology
            ORDER created_at DESC
            `
        )
        return sql.rows
    },
    async findLimit({limit, offset}){
        const sql = await pool.query(
            `SELECT * FROM technology 
            ORDER BY created_at DESC
            LIMIT $1 OFFSET $2`,
            [limit, offset]
        )
        return sql.rows
    },
    async findOne({id, name}){
        const sql = await pool.query(
            `SELECT * FROM technology
            WHERE id = $1 or name = $2`,
            [id, name]
        )
    },
    async deleteOne({id}){
        const sql =  await pool.query(
            `DELETE FROM technology
            WHERRE id = $1
            RETURNING *`
        )
        return sql.rows
    },
    async countDocumnet(){
        const sql = await pool.query(
            `SELECT COUNT(*) FROM technology`
        )
        return sql.rows
    }
}

module.exports = techModel