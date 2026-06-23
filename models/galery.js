const mongoose = require("mongoose");

const galerySchema = new mongoose.Schema({
  id_galeri: Number,

  upload_fotovideo: String,

  nama_kegiatan: String,

  kategori: String,

  file: String,

  id_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoginAdmin"
  }
});

module.exports = mongoose.model(
  "galery",
  galerySchema,
  "galery"
);