import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const HOST = process.env.DB_HOST || "localhost";
const USER = process.env.DB_USER || "root";
const PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "studentdb";

console.log("DB CONFIG:", { host: HOST, user: USER, database: DB_NAME });

const db = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB_NAME,
  charset: "binary" 
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Connection Error:", err);
    return;
  }
  console.log("Connected to MySQL server");


  // Ensure database and table exist
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255),
      middle_name VARCHAR(255),
      last_name VARCHAR(255),
      dob DATE,
      phone VARCHAR(20),
      email VARCHAR(255),
      company_name VARCHAR(255),
      avatar_url MEDIUMBLOB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createTableSql, (err) => {
    if (err) {
      console.log("Error creating students table:", err);
    } else {
      console.log("Database and students table are ready");
      
      // Migrate existing avatar_url column from TEXT to MEDIUMBLOB if needed
      db.query(
        `SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS 
         WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'students' AND COLUMN_NAME = 'avatar_url'`,
        [DB_NAME],
        (err, results) => {
          if (!err && results.length > 0) {
            const rawType = results[0].COLUMN_TYPE;
            const columnType = Buffer.isBuffer(rawType)
              ? rawType.toString("utf8").toLowerCase()
              : String(rawType).toLowerCase();

            if (columnType.includes("text") || columnType.includes("varchar")) {
              db.query(
                `ALTER TABLE students MODIFY COLUMN avatar_url MEDIUMBLOB`,
                (alterErr) => {
                  if (alterErr) {
                    console.log("Migration warning (column may already be BLOB):", alterErr.message);
                  } else {
                    console.log("Migrated avatar_url column to MEDIUMBLOB");
                  }
                }
              );
            }
          }
        }
      );

    }
  }   );
}); 

export default db;
