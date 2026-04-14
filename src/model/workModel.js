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
                w.name          AS name,
                w.position      AS position,
                w.github        AS github,
                w.demo          AS demo,
                w.framework     AS framework,
                w.description   AS description,
                w.created_at    AS created_at,

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

        const rows = sql.rows;
        console.log(rows)

        if(rows.length === 0) return 0

        // object of work
        const work = {
            id: rows[0].work_id,
            name: rows[0].name,
            position: rows[0].position,
            github: rows[0].github,
            demo: rows[0].demo,
            framework: rows[0].framework,
            description: rows[0].description,
            created_at: rows[0].created_at,
            image: [],
            key_feature: []
        }
        // get image
        rows.forEach(row => {
            if(row.image_id){
                work.image.push({
                    id: row.image_id,
                    originalname: row.image_originalname,
                    path: row.image_path,
                    filename: row.image_filename,
                    size: row.image_size,
                    encoding: row.image_encoding,
                })
            }
        })

        // get key_feature
        rows.forEach(row => {
            if(row.kf_id){
                work.key_feature.push({
                    id: row.kf_id,
                    name: row.kf_name,
                    description: row.kf_description,
                })
            }
        })
        return work
    }
    
}
module.exports = workModel