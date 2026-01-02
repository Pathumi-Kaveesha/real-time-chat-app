import express from "express";
import authRoute from "./routes/auth.route";
import messageRoute from "./routes/message.route";
import cors from "cors";

import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./lib/db";
import cookieParser from "cookie-parser";

dotenv.config({ path: path.resolve(__dirname, ".env") });
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
