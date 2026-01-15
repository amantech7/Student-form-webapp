import {
  insertStudent,
  getStudentCount,
  getAllStudents,
} from "../models/student.model.js";
import { success, failure } from "../utils/response.util.js";
import  generateAvatar  from "../services/avatarServices.js";
import axios from "axios";

export const registerStudent = async (req, res) => {
  try {
    const { first_name, middle_name, last_name, dob, phone, course } = req.body;

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
      course: course || null,
      avatar_url: avatarBuffer,
    };

    insertStudent(studentData, (err, result) => {
      if (err) {
        console.error("Insert error:", err);
        return failure(res, "Database Insert Failed");
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
    if (err) return failure(res, "Failed to fetch students");

   
    const toText = (v) => (Buffer.isBuffer(v) ? v.toString("utf8") : v);
    const blobToDataUrl = (buf) => {
      if (!Buffer.isBuffer(buf)) return null;

      // Some older rows might contain SVG; detect and set the right MIME type.
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
      const avatar = s.avatar_url;

      const avatar_url = Buffer.isBuffer(avatar)
        ? blobToDataUrl(avatar)
        : toText(avatar) ?? null;

      return {
        ...s,
        first_name: toText(s.first_name),
        middle_name: toText(s.middle_name),
        last_name: toText(s.last_name),
        phone: toText(s.phone),
        course: toText(s.course),
        dob: toYmd(s.dob),
        avatar_url,
      };
    });

    return success(res, "Students fetched", formatted);
  });
};
