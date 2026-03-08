const pool = require("../config/db");

const workModel = { 
    async findImage(){
        const client = await pool.connect()
        try{
            console.log("2")
            await client.query("BEGIN")
            const query = await client.query(`
                SELECT * FROM image_work ORDER BY created_at DESC
            `)
            await client.query("COMMIT")
            return query.rows
        }catch(err) {   
            await client.query("ROLLBACK")
            throw err
        }finally{
            client.release()
        }
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
    async create({name, files}){
        const client = await pool.connect()
        try{
            await client.query("BEGIN") 
            const work = await client.query(`
                INSERT INTO work(name) VALUES($1) RETURNING *
            `, [name])

            const by_work = work.rows[0].id
            for(const file of files){
                await client.query(`
                    INSERT INTO image_work(originalname, path, filename, size, encoding, by_work)
                    VALUES($1 ,$2 ,$3 ,$4 ,$5 ,$6)
                `, [
                    file.originalname,
                    file.path,
                    file.filename,
                    file.size,
                    file.encoding,
                    by_work
                ])
            }
            await client.query("COMMIT")
            return work.rows
        }catch(err){
            await client.query("ROLLBACK")
            throw err
        }finally{
            client.release()
        }
    }
    
}

module.exports = workModel