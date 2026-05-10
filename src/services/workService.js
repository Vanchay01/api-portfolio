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
        const SeenTech = new Set()
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
                SeenImage.add(data.feature_id)
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
            if(data.technology_id && !SeenTech.has(data.technology_id)){
                SeenTech.add(data.technology_id, {tools: new Set()})
                work.technology.push({
                    id: 1,
                    name: "sss",
                    tools: []
                })
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
    // find =============================================================
    async serviceFind({page, limit}){
         console.log(page, limit)
        const work = await workModel.find({page: page, limit: limit}) 
        if(work.length === 0){
            return false
        }
        const count = await pool.query("SELECT COUNT(*) FROM work")
        console.log(count)
        const objWork = {
            id: work[0].id,
            name: work[0].name,
            position: work[0].position,
            github: work[0].github,
            demo: work[0].demo,
            framework: work[0].framework,
            description: work[0].description,
            created_at: work[0].created_at,
            key_feature: [],
            technology: [],
            image: [],
        }
        const seenImage = new Map()

        work.forEach(row => {
            // push image to obj_work
            if(row.image_id && !seenImage.has(row.image_id)){
                seenImage.set(row.image_id, true)
                obj_work.image.push({
                    id: row.image_id,
                    originalname: row.image_originalname,
                    path: row.image_path,
                    filename: row.image_filename,
                    size: row.image_size,
                    encoding: row.image_encoding,
                    created_at: row.image_created_at,
                })
            }
        })
        
        return {
            work: objWork,
            total: Number(count.rows[0].count)
        }
    },
    // get by id =============================================================
    async serviceFindOne(id){
        const work = await workModel.findOne(id)
        if(work.length === 0){
            return false
        }
        // object work for find by id
        const obj_work = {
            id: work[0].id,
            name: work[0].name,
            position: work[0].position,
            github: work[0].github,
            demo: work[0].demo,
            framework: work[0].framework,
            description: work[0].description,
            created_at: work[0].created_at,
            key_feature: [],
            technology: [],
            image: [],
        }
        // map
        const seenKeyFeature = new Map()
        const seenTechs = new Map(); 
        const seenTools = new Map();
        const seenImage = new Map()
        
        work.forEach(row => {
            // push key feature to obj_work
            if(row.kf_id && !seenKeyFeature.has(row.kf_id)){ // it's mean it has row.kf_id and seenKeyFeature no has row.kf_id
                seenKeyFeature.set(row.kf_id) // if seenKeyFeature has no row.kf_id, so we add row.kf_id into seenKeyFeature with .set()
                obj_work.key_feature.push({
                    id: row.kf_id,
                    name: row.kf_name,
                    description: row.kf_description,
                    created_at: row.kf_created_at
                })
            }
            // push technology to obj_work
            if (row.tech_id && !seenTechs.has(row.tech_id)) {
                seenTechs.set(row.tech_id, { tools: new Map() });
                obj_work.technology.push({
                    id: row.tech_id,
                    name: row.tech_name,
                    created_at: row.tech_created_at,    
                    tools: []
                });
            }
            // push technilogy tools into technology 
            if (row.tool_id && seenTechs.has(row.tech_id)) {
                const techEntry = seenTechs.get(row.tech_id);
                if (!techEntry.tools.has(row.tool_id)) {
                    techEntry.tools.set(row.tool_id, true);
                    const tech = obj_work.technology.find(t => t.id === row.tech_id);
                    tech.tools.push({ 
                        id: row.tool_id, 
                        name: row.tool_name,
                        created_at: row.tool_created_at
                    });
                }
            }
            // push image to obj_work
            if(row.image_id && !seenImage.has(row.image_id)){
                seenImage.set(row.image_id, true)
                obj_work.image.push({
                    id: row.image_id,
                    originalname: row.image_originalname,
                    path: row.image_path,
                    filename: row.image_filename,
                    size: row.image_size,
                    encoding: row.image_encoding,
                    created_at: row.image_created_at,
                })
            }
        })
        return obj_work
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