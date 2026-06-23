const mongoose = require("mongoose");

const pengumumanSchema = new mongoose.Schema({
  id_pengumuman: Number,

  upload_gambar: String,

  nama_pengumuman: String,

  deskripsi: String,

  id_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoginAdmin"
  }
});

module.exports = mongoose.model(
  "pengumuman",
  pengumumanSchema,
  "pengumuman"
);