import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import notesRoutes from "./routes/notes.routes.js";

const app = express();

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/notes_db";
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB connection error:", error.message));

app.use(express.json());
app.use(cors());

app.use("/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("Notes API is running");
});

export default app;
