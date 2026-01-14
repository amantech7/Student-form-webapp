import db from "../config/db.js";

// Insert a new student into database
export function insertStudent(studentData, callback) {
  const query = `
    INSERT INTO students 
    (first_name, middle_name, last_name, dob, phone, course, avatar_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    studentData.first_name,
    studentData.middle_name,
    studentData.last_name,
    studentData.dob,
    studentData.phone,
    studentData.course,
    studentData.avatar_url,
  ];

  db.query(query, values, callback);
}

// Get student count
export function getStudentCount(callback) {
  const query = "SELECT COUNT(*) AS total FROM students";
  db.query(query, callback);
}

// Get all students
export function getAllStudents(callback) {
  const query = "SELECT * FROM students ORDER BY id DESC";
  db.query(query, callback);
}
