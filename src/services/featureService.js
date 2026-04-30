const featureModel = require("../model/featureModel")

const featureService = {
    async create({name, description, by_work}){
        try {
            const result = await featureModel.create({name: name, description: description, by_work: by_work})
            return result
        } catch (error) {
            console.error("Error - featureService.js:9", error)
        }
    },
    async find({page, limit}){
        try {
            const offset = (page - 1) * limit
            if(!limit || limit === 0){
                const result = await featureModel.find()
                const count = await featureModel.countDocumnet()
                return {
                    feature: result,
                    total: Number(count[0].count)
                }
            }
            const result = await featureModel.findLimit({limit: limit, offset: offset})
            const count = await featureModel.countDocumnet()
            return {
                feature: result,
                total: Number(count[0].count)
            }
        } catch (error) {
            console.error("Error - featureService.js:30", error)
        }
    },
    async deleteOne({id}){
        try {
            const result = await featureModel.deleteOne({id: id})
            return result
        } catch (error) {
            console.error("Error - featureService.js:38", error)
        }
    },
    
}
module.exports = featureService