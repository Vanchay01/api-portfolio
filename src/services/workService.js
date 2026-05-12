const workModel = require("../model/workModel")


const workService = {
    async findOne({id}){
        const result = await workModel.findOne({id: id})
        const work = {
            id: result[0].id,
            name: result[0].name,
            position: result[0].position,
            github: result[0].github,
            demo: result[0].demo,
            framework: result[0].framework,
            description: result[0].description,
            created_at: result[0].created_at,
            image: [],
            key_feature: [],
            technology: []
        }
        const SeenFeature = new Set()
        const SeenImage = new Set()
        const SeenTechnology = new Map()
        result.forEach((data) => {
            if(data.feature_id && !SeenFeature.has(data.feature_id)){
                SeenFeature.add(data.feature_id)
                work.key_feature.push({
                    id: data.feature_id,
                    name: data.feature_name,
                    description: data.feature_description,
                    created_at: data.feature_created_at
                })
            }
            if(data.image_id && !SeenImage.has(data.image_id)){
                SeenImage.add(data.image_id)
                work.image.push({
                    id: data.image_id,
                    originalname: data.image_originalname,
                    filename: data.image_filename,
                    path: data.image_path,
                    size: data.image_size,
                    encoding: data.image_encoding,
                    created_at: data.image_created_at
                })
            }
            if(data.technology_id && !SeenTechnology.has(data.technology_id)){
                SeenTechnology.set(data.technology_id, {tools: new Map()})
                work.technology.push({
                    id: data.technology_id,
                    name: data.technology_name,
                    tools: []
                })
            }
            if(data.tool_id && SeenTechnology.has(data.technology_id)){
                const techEntry = SeenTechnology.get(data.technology_id)
                if(!techEntry.tools.has(data.tool_id)){
                    techEntry.tools.set(data.tool_id, true)
                    const tech = work.technology.find(find => find.id === data.technology_id)
                    tech.tools.push({
                        id: data.tool_id,
                        name: data.tool_name,
                        created_at: data.tool_created_at
                    })
                }
            }
        })
        return work
    },
    // save full of work
    async saveFull({name, position, github, demo, framework, description, image}){
        const client = await pool.connect()
        try {
            // existsing name
            const existsing = await workModel.findOne({name: name})
            if(existsing.length > 0){
                return false
            }
            await client.query("BEGIN")
            // 1 insert work
            const work = await workModel.save({client: client, name: name, position: position, github: github, demo: demo, framework: framework, description: description})
            const by_work = work[0].id
            // 2 insert image
            for (const s of image || []) {
                await client.query(`
                    INSERT INTO image_work(originalname, path, filename, size, encoding, by_work)
                    VALUES ($1, $2, $3, $4, $5, $6)
                `, [
                    s.originalname,
                    s.path,
                    s.filename,
                    s.size,
                    s.encoding,
                    by_work,
                ])
            }
            await client.query("COMMIT")
            return work
        } catch (err) {
            await client.query("ROLLBACK")
            throw err
        } finally {
           client.release() 
        }
    },
    // find
    async find(){
        try {
            const result = await workModel.find()
            const count = await workModel.countDocument()
            const workMap = new Map()
            result.forEach((work) => {
                if(!workMap.has(work.id)){
                    workMap.set(work.id, {
                        id: work.id,
                        name: work.name,
                        position: work.position,
                        github: work.github,
                        demo: work.demo,
                        framework: work.framework,
                        description: work.description,
                        created_at: work.created_at,
                        images: [],
                        features: [],
                        technologies: [],
                    })
                }
                const newWork = workMap.get(work.id)
                // image
                if(work.image_id){
                    const imageExists = newWork.images.find(
                        (img) => img.id === work.image_id
                    )
                    if(!imageExists || imageExists === undefined){
                        newWork.images.push({
                            id: work.image_id,
                            originalname: work.image_originalname,
                            path: work.image_path,
                            filename: work.image_filename,
                            size: work.image_size,
                            encoding: work.image_encoding,
                            created_at: work.image_created_at,
                        })
                    }
                }
                // feature
                if(work.feature_id){
                    const featureExists = newWork.features.find((feature) => feature.id === work.feature_id)
                    if(!featureExists){
                        newWork.features.push({
                            id: work.feature_id,
                            name: work.feature_name,
                            description: work.feature_description,
                            created_at: work.feature_created_at
                        })
                    }
                }
                // technology
                if(work.technology_id){
                    let technology = newWork.technologies.find(tech => tech.id === work.technology_id)
                    if(!technology){
                        technology = {
                            id: work.technology_id,
                            name: work.technology_name,
                            created_at: work.technology_created_at,
                            tools: []
                        }
                        newWork.technologies.push(technology);
                    }
                    if(work.tool_id){
                        const toolExists = technology.tools.find(tool => tool.id === work.tool_id)
                        if(!toolExists){
                            technology.tools.push({
                                id: work.tool_id,
                                name: work.tool_name,
                                created_at: work.tool_created_at,
                            })
                        }
                    }
                } // end technology
            // == end    
            })
            return {
                work: Array.from(workMap.values()),
                total: Number(count[0].count)
            }
        } catch (err) {
            console.error("Error:: - workService.js:186", err.message)
        }
    },
    // find limit
    async findLimit({page, limit}){
        try {
            const offset = (page - 1) * limit
            const result = await workModel.findLimit({limit: limit, offset: offset})
            const count = await workModel.countDocument()
            const workMap = new Map()
            result.forEach((work) => {
                if(!workMap.has(work.id)){
                    workMap.set(work.id, {
                        id: work.id,
                        name: work.name,
                        position: work.position,
                        github: work.github,
                        demo: work.demo,
                        framework: work.framework,
                        description: work.description,
                        created_at: work.created_at,
                        images: [],
                        features: [],
                        technologies: [],
                    })
                }
                const newWork = workMap.get(work.id)
                // image
                if(work.image_id){
                    const imageExists = newWork.images.find(
                        (img) => img.id === work.image_id
                    )
                    if(!imageExists || imageExists === undefined){
                        newWork.images.push({
                            id: work.image_id,
                            originalname: work.image_originalname,
                            path: work.image_path,
                            filename: work.image_filename,
                            size: work.image_size,
                            encoding: work.image_encoding,
                            created_at: work.image_created_at,
                        })
                    }
                }
                // feature
                if(work.feature_id){
                    const featureExists = newWork.features.find((feature) => feature.id === work.feature_id)
                    if(!featureExists){
                        newWork.features.push({
                            id: work.feature_id,
                            name: work.feature_name,
                            description: work.feature_description,
                            created_at: work.feature_created_at
                        })
                    }
                }
                // technology
                if(work.technology_id){
                    let technology = newWork.technologies.find(tech => tech.id === work.technology_id)
                    if(!technology){
                        technology = {
                            id: work.technology_id,
                            name: work.technology_name,
                            created_at: work.technology_created_at,
                            tools: []
                        }
                        newWork.technologies.push(technology);
                    }
                    if(work.tool_id){
                        const toolExists = technology.tools.find(tool => tool.id === work.tool_id)
                        if(!toolExists){
                            technology.tools.push({
                                id: work.tool_id,
                                name: work.tool_name,
                                created_at: work.tool_created_at,
                            })
                        }
                    }
                } // end technology
            // == end    
            })
            return {
                work: Array.from(workMap.values()),
                total: Number(count[0].count)
            }
        } catch (err) {
            console.error("Error:: - workService.js:272", err.message)
        }
    },
    // update
    async serviceUpdate({id, name, position, github, demo, framework, description, deleteImage, image}){
        const client = await pool.connect()
        try{
            await client.query(`BEGIN`)
            // check existing name work
            const existing = await workModel.findName({id: id, name: name})
            if(existing.length > 0) return null
            // update work
            const update = await workModel.updateOne({
                id: id, 
                name: name, 
                position: position, 
                github: github, 
                demo: demo, 
                framework: framework, 
                description: description
            })
            await client.query("COMMIT");
            return update
        }catch(err) {
            await client.query("ROLLBACK")
            throw err
        }finally{
            client.release() 
        }
    }
}
module.exports = workService