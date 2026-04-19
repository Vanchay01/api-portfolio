const pool = require("../config/db")
const { addSkill } = require("../controllers/skillCon")
const workModel = require("../model/workModel")
const fs = require("fs/promises");

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
            if(row.kf_id && !seenKeyFeature.has(row.kf_id)){ // it's mean it has row.kf_id and seenKeyFeature has no row.kf_id
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
            
            // delete image
            for (let imageId of deleteImage){
                const result = await client.query(`
                    SELECT * FROM image_work WHERE id = $1 AND by_work = $2
                `, [imageId, id])
                    
                if (result.rows.length > 0) {
                    const image = result.rows[0];
                    console.log("ss.rows")
                    console.log("ss.rowsdd", image.path)
                    await fs.unlink(image.path);
                    console.log("ss.rowsddssssssss", image.path)
                    const ss = await client.query(
                        "DELETE FROM image_work WHERE id = $1 RETURNING *",
                        [imageId]
                    );
                    
                    console.log(ss.rows)
                }
            }
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
// router.put("/work/:id", upload.array("images", 10), async (req, res) => {
//   const client = await db.connect();

//   try {
//     const workId = req.params.id;

//     const {
//       name,
//       position,
//       github,
//       demo,
//       framework,
//       description
//     } = req.body;

//     const deleteImages = req.body.deleteImages
//       ? JSON.parse(req.body.deleteImages)
//       : [];

//     const newImages = req.files || [];

//     await client.query("BEGIN");

//     // 🔹 1. UPDATE work table
//     await client.query(
//       `UPDATE work SET
//         name = $1,
//         position = $2,
//         github = $3,
//         demo = $4,
//         framework = $5,
//         description = $6
//       WHERE id = $7`,
//       [name, position, github, demo, framework, description, workId]
//     );

//     // 🔹 2. DELETE images
//     for (let imgId of deleteImages) {
//       const result = await client.query(
//         "SELECT * FROM image_work WHERE id = $1 AND by_work = $2",
//         [imgId, workId]
//       );

//       if (result.rows.length > 0) {
//         const image = result.rows[0];

//         await fs.unlink(image.path);

//         await client.query(
//           "DELETE FROM image_work WHERE id = $1",
//           [imgId]
//         );
//       }
//     }

//     // 🔹 3. ADD new images
//     for (let file of newImages) {
//       await client.query(
//         `INSERT INTO image_work 
//         (originalname, path, filename, size, encoding, by_work)
//         VALUES ($1,$2,$3,$4,$5,$6)`,
//         [
//           file.originalname,
//           file.path,
//           file.filename,
//           file.size,
//           file.encoding,
//           workId
//         ]
//       );
//     }

//     await client.query("COMMIT");

//     res.json({ message: "Work updated fully ✅" });

//   } catch (err) {
//     await client.query("ROLLBACK");
//     console.error(err);
//     res.status(500).json({ error: "Update failed ❌" });
//   } finally {
//     client.release();
//   }
// });
module.exports = workService