const imageWorkModel = require("../model/imageWorkModel")

const imageWorkService = {
    async createrService({image, by_work}){
        try {
            const result = []
            for(let i of image){
                const res = await imageWorkModel.create({
                    originalname: i.originalname,
                    path: i.path,
                    filename: i.filename,
                    size: i.size,
                    encoding: i.encoding,
                    by_work: by_work,
                })
                result.push(res)
            }
            return result
            
        } catch (err) {
            console.error("Error:", err.message)
        }
    }
}
module.exports = imageWorkService