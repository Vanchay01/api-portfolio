const pool = require("../config/db")
const workModel = require("../model/workModel")

const workService = {
    // save full of work
    async saveFull(data, files){
        const client = await pool.connect()
        try {
            await client.query("BEGIN")
            // 1 insert work
            const work = await workModel.save(client, data)

            const by_work = work.rows[0].id

            // 2 insert image
            for (const image of files || []) {
                await client.query(`
                    INSERT INTO image_work(originalname, path, filename, size, encoding, by_work)
                    VALUES $1, $2, $3,, $4, $5, $6
                `, [
                    image.originalname,
                    image.path,
                    image.filename,
                    image.size,
                    image.encoding,
                    by_work
                ])
            }
        } catch (err) {
            
        } finally {
            
        }
    }
}

module.exports = workService