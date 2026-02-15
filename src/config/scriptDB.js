const pool = require("../config/db.js");

const scriptDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profile (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        name VARCHAR(255),
        image TEXT,
        phone VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        address VARCHAR(255),
        about TEXT,
        date DATE,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        image TEXT,
        major VARCHAR(255),
        gpa VARCHAR(255),
        year VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS skill (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        image TEXT,
        rating DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS work (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        position VARCHAR(150),
        image TEXT,
        github TEXT,
        demo TEXT,
        framework VARCHAR(255),
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS technology (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        by_work INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_technology_work
          FOREIGN KEY (by_work) REFERENCES work(id)
          ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS technology_tool (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        by_technology INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_tool_technology
          FOREIGN KEY (by_technology) REFERENCES technology(id)
          ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS key_feature (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NULL,
        by_work INT NOT NULL,
        description TEXT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_feature_work
            FOREIGN KEY (by_work) REFERENCES work(id)
            ON DELETE CASCADE
      );
    `);

    console.log("✅ All tables created successfully");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
};

module.exports = scriptDB;
