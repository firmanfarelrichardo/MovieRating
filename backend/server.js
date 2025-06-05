import path from "path";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.route.js";
import usersRoutes from "./routes/user.route.js";
import postsRoutes from "./routes/post.route.js";
import notificationsRoutes from "./routes/notification.route.js";
import connectMongoDB from "./db/connectToMongo.js";

dotenv.config(); // Load .env file

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup Express app
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(); // untuk kebutuhan path statis

// Middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/notifications", notificationsRoutes);

// Cek mode produksi
const env = process.env.NODE_ENV?.trim() || "";

if (env === "production") {
  console.log("Entering production block");

  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend", "dist", "index.html"));
  });

  console.log("NODE_ENV:", env, "__dirname:", __dirname);
} else {
  console.log("Not in production");
}

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGO_URI, {/* opsi lain jika ada */})
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server setelah koneksi ke MongoDB berhasil
    app.listen(PORT, () => {
      console.log("Server is running at port", PORT);
    });
  })
  .catch((error) => {
    console.log("error connection to mongoDB", error.message);
    process.exit(1); // agar proses exit jika gagal koneksi

  });
