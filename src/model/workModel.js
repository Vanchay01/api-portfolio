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
            const sql = await pool.query(`
                SELECT
                    w.id            AS id,
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
                    iw.created_at   AS image_created_at,

                    t.id            AS tech_id,
                    t.name          AS tech_name,
                    t.created_at    AS tech_created_at,

                    tt.id           AS tool_id,
                    tt.name         AS tool_name,
                    tt.created_at   AS tool_created_at,

                    kf.id           AS kf_id,
                    kf.name         AS kf_name,
                    kf.description  AS kf_description,
                    kf.created_at   AS kf_created_at

                FROM work w
                    LEFT JOIN image_work iw    ON iw.by_work       = w.id
                    LEFT JOIN technology t     ON t.by_work         = w.id
                    LEFT JOIN technology_tool tt ON tt.by_technology = t.id
                    LEFT JOIN key_feature kf   ON kf.by_work        = w.id
                ORDER BY created_at DESC
            `)
            return sql.rows
        }
        const sql = await pool.query(`
            SELECT
                w.id            AS id,
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
                iw.created_at   AS image_created_at,

                t.id            AS tech_id,
                t.name          AS tech_name,
                t.created_at    AS tech_created_at,

                tt.id           AS tool_id,
                tt.name         AS tool_name,
                tt.created_at   AS tool_created_at,

                kf.id           AS kf_id,
                kf.name         AS kf_name,
                kf.description  AS kf_description,
                kf.created_at   AS kf_created_at

            FROM work w
                LEFT JOIN image_work iw    ON iw.by_work       = w.id
                LEFT JOIN technology t     ON t.by_work         = w.id
                LEFT JOIN technology_tool tt ON tt.by_technology = t.id
                LEFT JOIN key_feature kf   ON kf.by_work        = w.id
            ORDER BY created_at DESC LIMIT $1 OFFSET $2
        `, [limit, offset])

        return sql.rows
    },
    // find name 
    async findName({id, name}){
        const sql = await pool.query(`
            SELECT * FROM work WHERE name = $1 and id != $2
        `, [name, id])
        return sql.rows
    },
    // find one
    async findOne({id, name}){
        const sql = await pool.query(`
            SELECT
                w.id            AS id,
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
                iw.created_at   AS image_created_at,

                t.id            AS tech_id,
                t.name          AS tech_name,
                t.created_at    AS tech_created_at,

                tt.id           AS tool_id,
                tt.name         AS tool_name,
                tt.created_at   AS tool_created_at,

                kf.id           AS kf_id,
                kf.name         AS kf_name,
                kf.description  AS kf_description,
                kf.created_at   AS kf_created_at

            FROM work w
                LEFT JOIN image_work iw    ON iw.by_work       = w.id
                LEFT JOIN technology t     ON t.by_work         = w.id
                LEFT JOIN technology_tool tt ON tt.by_technology = t.id
                LEFT JOIN key_feature kf   ON kf.by_work        = w.id
            WHERE w.id = $1 OR w.name = $2
        `, [id, name])

        return sql.rows
    },
    // update One
    async updateOne({id, name, position, github, demo, framework, description}){
        const sql = await pool.query(`
            UPDATE work 
            SET
                name = $1,
                position = $2,
                github = $3,
                demo = $4,
                framework = $5,
                description = $6
            WHERE id = $7 RETURNING *
        `, [name, position, github, demo, framework, description, id])
        return sql.rows
    }
    
}
module.exports = workModel