const pool = require("../config/db")

const imageModel = {
    async uploadImageSkill(client, file, by_skill){
        const result = await client.query(`
            INSERT INTO image_skill
            (originalname, path, filename, size,encoding, by_skill)
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [file.originalname, file.path, file.filename, file.size, file.encoding, by_skill])
    }
}

module.exports = imageModel