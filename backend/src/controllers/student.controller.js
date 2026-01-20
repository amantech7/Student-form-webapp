import {
  insertStudent,
  getStudentCount,
  getAllStudents,
  getStudentById, // Add this import to your model (see note below)
} from "../models/student.model.js";
import { success, failure } from "../utils/response.util.js";
import generateAvatar from "../services/avatarServices.js";
import axios from "axios";

export const registerStudent = async (req, res) => {
  try {
    const { first_name, middle_name, last_name, dob, phone, email, company_name } = req.body;

    // Generate DiceBear URL
    const seed = first_name + last_name + phone;
    const avatarUrl = generateAvatar(seed);

    // FETCH avatar image as binary
    const avatarResponse = await axios.get(avatarUrl, {
      responseType: "arraybuffer"
    });

    const avatarBuffer = Buffer.from(avatarResponse.data);

    const studentData = {
      first_name,
      middle_name: middle_name || null,
      last_name,
      dob: dob || null,
      phone,
      email: email || null,
      company_name: company_name || null,
      avatar_url: avatarBuffer,
    };

    insertStudent(studentData, (err, result) => {
      if (err) {
        console.error("Insert error:", err);
        console.error("Error details:", err.message);
        console.error("Error code:", err.code);
        return failure(res, err.message || "Database Insert Failed");
      }

      return success(res, "Student Registered Successfully", {
        id: result.insertId,
      });
    });

  } catch (error) {
    console.error("Register student error:", error);
    return failure(res, "Registration Failed");
  }
};

// this will  Fetch total student count
export const fetchStudentCount = (req, res) => {
  getStudentCount((err, result) => {
    if (err) return failure(res, "Failed to fetch count");
    return success(res, "Student count fetched", result[0]);
  });
};

export const fetchStudents = (req, res) => {
  getAllStudents((err, results) => {
    if (err) {
      console.error("Database error in fetchStudents:", err);
      return failure(res, "Failed to fetch students");
    }

    if (!results || !Array.isArray(results)) {
      return success(res, "Students fetched", []);
    }

    const toText = (v) => {
      if (v === null || v === undefined) return null;
      if (Buffer.isBuffer(v)) {
        const str = v.toString("utf8");
        return str.length > 0 ? str : null;
      }
      return String(v);
    };
    
    const blobToDataUrl = (buf) => {
      if (!Buffer.isBuffer(buf)) return null;

      const head = buf.subarray(0, 32).toString("utf8").trimStart();
      const isSvg = head.startsWith("<svg") || head.startsWith("<?xml");
      const mime = isSvg ? "image/svg+xml" : "image/png";

      return `data:${mime};base64,${buf.toString("base64")}`;
    };

    const toYmd = (v) => {
      if (!v) return null;
      if (v instanceof Date) return v.toISOString().slice(0, 10);
      if (typeof v === "string" && v.length >= 10) return v.slice(0, 10);
      return String(v);
    };

    const formatted = results.map((s) => {
      try {
        const avatar = s.avatar_url;
        const avatar_url = Buffer.isBuffer(avatar)
          ? blobToDataUrl(avatar)
          : toText(avatar) ?? null;

        return {
          id: s.id,
          first_name: toText(s.first_name),
          middle_name: toText(s.middle_name),
          last_name: toText(s.last_name),
          phone: toText(s.phone),
          email: toText(s.email),
          company_name: toText(s.company_name),
          dob: toYmd(s.dob),
          avatar_url,
          created_at: s.created_at,
        };
      } catch (error) {
        console.error("Error formatting student:", error, s);
        return null;
      }
    }).filter(s => s !== null);

    return success(res, "Students fetched", formatted);
  });
};

//  Fetch single student by ID
export const fetchStudentById = (req, res) => {
  const { id } = req.params;
  getStudentById(id, (err, result) => {
    if (err) return failure(res, "Failed to fetch student");

    if (!result || result.length === 0) {
      return failure(res, "Student not found", { id }, 404);
    }

    const s = result[0];

    const toText = (v) => {
      if (v === null || v === undefined) return null;
      if (Buffer.isBuffer(v)) {
        const str = v.toString("utf8");
        return str.length > 0 ? str : null;
      }
      return String(v);
    };
    
    const blobToDataUrl = (buf) => {
      if (!Buffer.isBuffer(buf)) return null;

      const head = buf.subarray(0, 32).toString("utf8").trimStart();
      const isSvg = head.startsWith("<svg") || head.startsWith("<?xml");
      const mime = isSvg ? "image/svg+xml" : "image/png";

      return `data:${mime};base64,${buf.toString("base64")}`;
    };

    const toYmd = (v) => {
      if (!v) return null;
      if (v instanceof Date) return v.toISOString().slice(0, 10);
      if (typeof v === "string" && v.length >= 10) return v.slice(0, 10);
      return String(v);
    };

    const avatar = s.avatar_url;
    const avatar_url = Buffer.isBuffer(avatar)
      ? blobToDataUrl(avatar)
      : toText(avatar) ?? null;

    const formatted = {
      id: s.id,
      first_name: toText(s.first_name),
      middle_name: toText(s.middle_name),
      last_name: toText(s.last_name),
      phone: toText(s.phone),
      email: toText(s.email),
      company_name: toText(s.company_name),
      dob: toYmd(s.dob),
      avatar_url,
      created_at: s.created_at,
    };

    return success(res, "Student fetched", formatted);
  });
};