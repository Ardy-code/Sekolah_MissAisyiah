const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

const artikelRoutes =
require("./routes/artikelRoutes");
app.use("/api", authRoutes);

app.use(
    "/api/artikel",
    artikelRoutes
);
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

app.get("/", (req, res) => {
  res.send("Backend MissAisyiah berjalan");
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server berjalan di port ${process.env.PORT}`);
});