import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route";
import messageRoute from "./routes/message.route";
import { connectDB } from "./lib/db";
import { app, server} from "./lib/socket";


//increase payload limits for large files
app.use(express.json({ limit: "10mb" })); // for JSON
app.use(express.urlencoded({ limit: "10mb", extended: true })); // for form data

app.use(cookieParser());

// Configure CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
 
const PORT = process.env.PORT || 5000;
server.listen(PORT, async() => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
