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
    async find(){
        const query = `
            SELECT 
            w.id,
            w.name,
            w.created_at,
            COALESCE(
                json_agg(
                json_build_object(
                    'id', i.id,
                    'originalname', i.originalname,
                    'filename', i.filename,
                    'path', i.path,
                    'size', i.size
                )
                ) FILTER (WHERE i.id IS NOT NULL),
                '[]'
            ) AS images
            FROM work w
            LEFT JOIN image_work i
            ON w.id = i.by_work
            GROUP BY w.id
            ORDER BY w.created_at DESC
        `;

        const result = await pool.query(query);

        return result.rows;
    },
}

module.exports = workModel