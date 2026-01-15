import db from "../config/db.js";

export function insertStudent(student, callback) {
  const sql = `
    INSERT INTO students (
      first_name, middle_name, last_name, dob, phone, course, avatar_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      student.first_name,
      student.middle_name,
      student.last_name,
      student.dob,
      student.phone,
      student.course,
      student.avatar_url 
    ],
    callback
  );
}

export function getAllStudents(callback) {
  db.query("SELECT * FROM students ORDER BY created_at DESC", callback);
}

export function getStudentCount(callback) {
  db.query("SELECT COUNT(*) AS count FROM students", callback);
}
