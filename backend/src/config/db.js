import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2";

const HOST = process.env.DB_HOST || "localhost";
const USER = process.env.DB_USER || "root";
const PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "student_db";

console.log("DB CONFIG:", { host: HOST, user: USER, database: DB_NAME });

// initial connection to server to make sure database exists
const db = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Connection Error:", err);
    return;
  }
  console.log("Connected to MySQL server");

  // create database if not exists and then create students table
  db.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`, (err) => {
    if (err) {
      console.log("Error creating database:", err);
      return;
    }

    db.changeUser({ database: DB_NAME }, (err) => {
      if (err) {
        console.log("Error switching database:", err);
        return;
      }

      const createTableSql = `
        CREATE TABLE IF NOT EXISTS students (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(255),
          middle_name VARCHAR(255),
          last_name VARCHAR(255),
          dob DATE,
          phone VARCHAR(20),
          course VARCHAR(100),
          avatar_url VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      db.query(createTableSql, (err) => {
        if (err) {
          console.log("Error creating students table:", err);
        } else {
          console.log("Database and students table are ready");
        }
      });
    });
  });
});

export default db;
