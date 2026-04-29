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
    async deleteOne({id}){
        try{
            const result = await toolModel.deleteOne({id: id})
            return result 
        } catch (error){
            console.error("===>ERROR: - toolService.js:18", error.message)
        }
    }
}

module.exports = toolService