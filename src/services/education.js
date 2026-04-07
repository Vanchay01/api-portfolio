const educationModel = require("../model/educationModel")


const educationService = {
    async save(name, major, gpa, year, files){
        const client = await pool.connect()
        try {
            await client.query("BEGIN")
            const education = await educationModel.save(client, name, major, gpa, year)
            const by_education = education[0].id

            for(const image of files || []){
                await client.query(`
                    INSERT INTO image_education(originalname, path, filename, size, encoding, by_education)
                    VALUES ($1, $2, $3, $4, $5, $6)
                `, [
                    image.originalname,
                    image.path,
                    image.filename,
                    image.size,
                    image.encoding,
                    by_education,
                ])
            }
        } catch (err) {
            await client.query("COMMIT")
            throw err
        } finally {
            client.release()
        }
    }
}

module.exports = educationService