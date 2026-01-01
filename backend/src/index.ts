import express from "express";
import authRoute from "./routes/auth.route";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./lib/db";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

app.use("/api/auth", authRoute);
app.use(express.json);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
