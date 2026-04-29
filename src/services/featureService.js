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
    async deleteOne({id}){
        try {
            const result = await featureModel.deleteOne({id: id})
            return result
        } catch (error) {
            console.error("Error - featureService.js:17", error)
        }
    },
    
}
module.exports = featureService