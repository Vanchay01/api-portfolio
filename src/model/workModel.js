const pool = require("../config/db");

const workModel = { 
    // save
    async save({client, name, position, github, demo, framework, description}){
        console.log(name, position, github, demo, framework, description)
        const sql = await client.query(`
            INSERT INTO work(name, position, github, demo, framework, description)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING * 
        `, [name, position, github, demo, framework, description])
        return sql.rows
    },

    // find
    async find({page, limit}){
        const offset = (page - 1) * limit
        if(limit === 0){
            const sql = await pool.query("SELECT * FROM work ORDER BY created_at DESC")
            return {
                work: sql.rows,
                total: sql.rowCount
            }
        }
         
        const sql = await pool.query(`
            SELECT * FROM work ORDER BY created_at DESC LIMIT $1 OFFSET $2
        `, [limit, offset])
        const count = await pool.query("SELECT COUNT(*) FROM work")
       
        return {
            work: sql.rows,
            total: Number(count.rows[0].count)
        }
    },
    // find one
    async findOne(id){
        const sql = await pool.query(`
            SELECT
                w.id            AS work_id,
                w.name          AS work_name,
                w.position      AS work_position,
                w.github        AS work_github,
                w.demo          AS work_demo,
                w.framework     AS work_framework,
                w.description   AS work_description,
                w.created_at    AS work_created_at,

                iw.id           AS image_id,
                iw.originalname AS image_originalname,
                iw.path         AS image_path,
                iw.filename     AS image_filename,
                iw.size         AS image_size,
                iw.encoding     AS image_encoding,

                t.id            AS tech_id,
                t.name          AS tech_name,

                tt.id           AS tool_id,
                tt.name         AS tool_name,

                kf.id           AS kf_id,
                kf.name         AS kf_name,
                kf.description  AS kf_description

            FROM work w
                LEFT JOIN image_work iw    ON iw.by_work       = w.id
                LEFT JOIN technology t     ON t.by_work         = w.id
                LEFT JOIN technology_tool tt ON tt.by_technology = t.id
                LEFT JOIN key_feature kf   ON kf.by_work        = w.id
            WHERE w.id = $1
        `, [id])

        return sql.rows
    }
    
}
module.exports = workModel