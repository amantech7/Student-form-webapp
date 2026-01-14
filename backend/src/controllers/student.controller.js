import {
  insertStudent,
  getStudentCount,
  getAllStudents,
} from "../models/student.model.js";
import { success, failure } from "../utils/response.util.js";

export const registerStudent = async (req, res) => {
  try {
    const { first_name, middle_name, last_name, dob, phone, course } = req.body;

    // Build seed for consistent avatar generation
    const seed = `${first_name}${last_name}${Date.now()}`;

    // Generate avatar URL using Dicebear Avataaars API
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

    const studentData = {
      first_name,
      middle_name: middle_name || null,
      last_name,
      dob: dob || null,
      phone: phone || null,
      course: course || null,
      avatar_url: avatarUrl, 
    };

    insertStudent(studentData, (err, result) => {
      if (err) {
        console.error("Insert error:", err);
        return failure(res, "Database Insert Failed");
      }

      return success(res, "Student Registered Successfully", {
        id: result.insertId,
        ...studentData,
      });
    });

  } catch (error) {
    console.error("Register student error:", error);
    return failure(res, "Registration Failed");
  }
};

export const fetchStudentCount = (req, res) => {
  getStudentCount((err, result) => {
    if (err) return failure(res, "Failed to fetch count");
    return success(res, "Student count fetched", result[0]);
  });
};

export const fetchStudents = (req, res) => {
  getAllStudents((err, results) => {
    if (err) return failure(res, "Failed to fetch students");
    return success(res, "Students fetched", results);
  });
};
