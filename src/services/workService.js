const pool = require("../config/db")
const workModel = require("../model/workModel")

const workService = {
    // save full of work
<<<<<<< HEAD
    async saveFull({name, position, github, demo, framework, description, image}){
=======
    async saveFull(name, position, github, demo, framework, description, files){
>>>>>>> 23d1b8b5eb81178936b6e60d3016a8b5fe87b75a
        const client = await pool.connect()
        try {
            await client.query("BEGIN")
            // 1 insert work
<<<<<<< HEAD
            const work = await workModel.save({client: client, name: name, position: position, github: github, demo: demo, framework: framework, description: description})
            
            const by_work = work[0].id
            console.log("vanchaysss: ", image)
=======
            const work = await workModel.save(client, name, position, github, demo, framework, description)
            const by_work = work[0].id
>>>>>>> 23d1b8b5eb81178936b6e60d3016a8b5fe87b75a
            // 2 insert image
            for (const image of image || []) {
                await client.query(`
                    INSERT INTO image_work(originalname, path, filename, size, encoding, by_work)
                    VALUES ($1, $2, $3, $4, $5, $6)
                `, [
                    image.originalname,
                    image.path,
                    image.filename,
                    image.size,
                    image.encoding,
                    by_work,
                ])
            }
            await client.query("COMMIT")
            return work
        } catch (err) {
            await client.query("ROLLBACK")
            throw err
        } finally {
<<<<<<< HEAD
           client.release() 
=======
            client.release()
>>>>>>> 23d1b8b5eb81178936b6e60d3016a8b5fe87b75a
        }
    }
}

module.exports = workService