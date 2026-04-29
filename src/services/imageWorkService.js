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
            console.error("==> Error: - imageWorkService.js:21", err.message)
        }
    },
    async find({page, limit}){
        try {
            const offset = (page - 1) * limit
            if(!limit || limit === 0 ){
                const result = await imageWorkModel.find()
                return result
            }
            const result = await imageWorkModel.findLimit({limit: limit, offset: offset})
            return result
        } catch (error) {
            console.error("==> Error: - imageWorkService.js:34", error.message)
        }
    },
    async deleteOneService({id}){
        try {
            const result = await imageWorkModel.deleteOne({id: id})
            return result         
        } catch (error) {
            console.error("==> Error: - imageWorkService.js:42", error.message)
        }
    }
}
module.exports = imageWorkService