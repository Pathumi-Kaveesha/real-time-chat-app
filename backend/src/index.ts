import express from "express";
import authRoute from "./routes/auth.route";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./lib/db";
import cookieParser from "cookie-parser";

dotenv.config({ path: path.resolve(__dirname, ".env") });
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
