const pool = require("../config/db")
const workModel = require("../model/workModel")

const workService = {
    // save full of work
    async saveFull({name, position, github, demo, framework, description, image}){
        const client = await pool.connect()
        try {
            await client.query("BEGIN")
            // 1 insert work
            const work = await workModel.save({client: client, name: name, position: position, github: github, demo: demo, framework: framework, description: description})
            
            const by_work = work[0].id
            console.log("vanchaysss: ", image)
            // 2 insert image
            for (const image of image || []) {
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
            await client.query("COMMIT")
            return work
        } catch (err) {
            await client.query("ROLLBACK")
            throw err
        } finally {
           client.release() 
        }
    }
}

module.exports = workService