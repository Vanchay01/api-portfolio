const pool = require("../config/db");

export const workModel = {
    async save({name, image, position, github, demo, framework, description}){
        const query = await pool.query(`
            INSERT INTO work(name, image, position, github, demo, framework, description)
            VALUS(1$, 2$, 3$, 4$, 5$, 6$, 7$)
        `[name, image, position, github, demo, framework, description])

        return query.rows[0]
    },
    async find(){
        const query = await pool.query(`
            SELECT * FROM work ORDER BY cearted_at DESC
        `)
        return query.rows[0]
    }
    
}