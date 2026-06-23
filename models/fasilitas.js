const mongoose = require("mongoose");

const fasilitasSchema = new mongoose.Schema({
  id_fasilitas: Number,

  upload_gambar: String,

  nama_fasilitas: String,

  deskripsi: String,

  id_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoginAdmin"
  }
});

module.exports = mongoose.model(
  "fasilitas",
  fasilitasSchema,
  "fasilitas"
);