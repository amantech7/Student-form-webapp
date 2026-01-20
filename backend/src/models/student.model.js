import db from "../config/db.js";

export function insertStudent(student, callback) {
  const sql = `
    INSERT INTO students (
      first_name, middle_name, last_name, dob, phone, email,company_name, avatar_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      student.first_name,
      student.middle_name,
      student.last_name,
      student.dob,
      student.phone,
      student.email,
     student.company_name,
      student.avatar_url 
    ],
    callback
  );
}

export function getAllStudents(callback) {
  db.query("SELECT * FROM students ORDER BY id DESC", callback);
}

export function getStudentCount(callback) {
  db.query("SELECT COUNT(*) AS count FROM students", callback);
}


//function to get student by ID
export const getStudentById = (id, callback) => {
  const query = "SELECT * FROM students WHERE id = ?";
  db.query(query, [id], (err, result) => {
    callback(err, result);
  });
};