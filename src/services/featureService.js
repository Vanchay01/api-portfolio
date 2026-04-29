const featureModel = require("../model/featureModel")

const featureService = {
    async create({name, description, by_work}){
        const result = await featureModel.create({name: name, description: description, by_work: by_work})
        return result
    }
}
module.exports = featureService