import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import app from "./app.js";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log("Created uploads directory at", UPLOAD_DIR);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
