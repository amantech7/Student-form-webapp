import express from "express";
import cors from "cors";
import path from "path";
import studentRoutes from "./routes/student.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/students", studentRoutes);

export default app;
