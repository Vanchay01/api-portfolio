const toolModel = require("../model/toolModel")


const toolService = {
    async create({name, by_technology}){
        try {
            const result = await toolModel.create({name: name, by_technology: by_technology})
            return result
        } catch (error) {
            console.error("==>ERROR: - toolService.js:10", error.message)
        }
    },
    async find({page, limit}){
        try {
            const offset = (page - 1) * limit
            if(!limit || limit === 0){
                const result = await toolModel.find()
                const count = await toolModel.countDocumnet()
                return {
                    tool: result,
                    total: Number(count[0].count)
                }
            }
            const result = await toolModel.findLimit({limit: limit, offset: offset})
            const count = await toolModel.countDocumnet()
            return {
                tool: result,
                total: Number(count[0].count)
            }
        } catch (error) {
            console.error("===>ERROR: - toolService.js:31", error.message)
        }  
    },
    async deleteOne({id}){
        try{
            const result = await toolModel.deleteOne({id: id})
            return result 
        } catch (error){
            console.error("===>ERROR: - toolService.js:39", error.message)
        }
    }
}

module.exports = toolService