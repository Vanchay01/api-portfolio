const pool = require("../config/db");

const workModel = { 
    // save
    async save({client, name, position, github, demo, framework, description}){
        const sql = await client.query(`
            INSERT INTO work(name, position, github, demo, framework, description)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING * 
        `, [name, position, github, demo, framework, description])
        return sql.rows
    },
    // find 
    async find(){
        console.log('asdasd - workModel.js:14')
        const sql = await pool.query(
            `SELECT 
                w.id            AS id,
                w.name          AS name,
                w.position      AS position,
                w.github        AS github,
                w.demo          AS demo,
                w.framework     AS framework,
                w.description   AS description,
                w.created_at    AS created_at,
                
                img.id           AS image_id,
                img.originalname AS image_originalname,
                img.path         AS image_path,
                img.filename     AS iamge_filename,
                img.size         AS image_size,
                img.encoding     AS image_encoding,
                img.created_at   AS image_created_at,

                feature.id          AS feature_id,
                feature.name        AS feature_name,
                feature.created_at  AS feature_created_at

            FROM work w
                LEFT JOIN image_work img 
                    ON img.id = w.id
                LEFT JOIN key_feature feature 
                    ON feature.id = w.id
            ORDER BY w.created_at DESC`
        )
        console.log(sql.rows)
        return sql.rows
    },
    async findLimit({limit, offset}){
      const sql = await pool.query(
        `SELECT 
            w.id            AS id,
            w.name          AS name,
            w.position      AS position,
            w.github        AS github,
            w.demo          AS demo,
            w.framework     AS framework,
            w.description   AS description,
            w.created_at    AS created_at,
            
            img.id           AS image_id,
            img.originalname AS image_originalname,
            img.path         AS image_path,
            img.filename     AS iamge_filename,
            img.size         AS image_size,
            img.encoding     AS image_encoding,
            img.created_at   AS image_created_at,
            
            feature.id          AS feature_id,
            feature.name        AS feature_name,
            feature.created_at  AS feature_created_at

        FROM work w
            LEFT JOIN image_work img 
                ON img.id = w.id
            LEFT JOIN key_feature feature 
                ON feature.id = w.id
        ORDER BY w.created_at DESC
        LIMIT $1 OFFSET $2`,
        [limit, offset]
      )
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

                img.id           AS image_id,
                img.originalname AS image_originalname,
                img.path         AS image_path,
                img.filename     AS image_filename,
                img.size         AS image_size,
                img.encoding     AS image_encoding,
                img.created_at   AS image_created_at,
                
                feature.id           AS feature_id,
                feature.name         AS feature_name,
                feature.description  AS feature_description,
                feature.created_at   AS feature_created_at,

                tech.id            AS technology_id,
                tech.name          AS technology_name,
                tech.created_at    AS technology_created_at,

                tool.id           AS tool_id,
                tool.name         AS tool_name,
                tool.created_at   AS tool_created_at

            FROM work w
                LEFT JOIN image_work img
                    ON img.by_work = w.id
                LEFT JOIN key_feature feature 
                    ON feature.by_work = w.id
                LEFT JOIN technology tech
                    ON tech.by_work = w.id
                LEFT JOIN technology_tool tool
                    ON tool.by_technology = tech.id
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
    },
    async deleteOne({id}){
        const sql = await pool.query(`
            DELETE FROM work WHERE id = $1 RETURNING *
        `, [id])
        return sql.rows
    },
    async countDocument(){
        const sql = await pool.query(
            `SELECT COUNT(*) FROM work`
        )
        return sql.rows[0].count
    }
}
module.exports = workModel