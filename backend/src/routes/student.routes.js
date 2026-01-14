import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import {
  registerStudent,
  fetchStudentCount,
  fetchStudents,
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/register", upload.single("photo"), registerStudent);
router.get("/count", fetchStudentCount);
router.get("/", fetchStudents);

export default router;
