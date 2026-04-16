const pool = require("../config/db")
const workModel = require("../model/workModel")

const workService = {
    // save full of work
    async saveFull({name, position, github, demo, framework, description, image}){
        const client = await pool.connect()
        try {
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
    // get by id
    async serviceFind(id){
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
            if(row.kf_id && !seenKeyFeature.has(row.kf_id)){
                seenKeyFeature.set(row.kf_id)
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
    }
}

module.exports = workService