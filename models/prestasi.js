const mongoose = require("mongoose");

const prestasiSchema = new mongoose.Schema({
  id_prestasi: Number,

  nama_lomba: String,

  juara: String,

  jenis_lomba: String,

  tanggal_lomba: Date,

  cabang_lomba: String,

  tingkat_lomba: String,

  id_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoginAdmin"
  }
});

module.exports = mongoose.model(
  "prestasi",
  prestasiSchema,
  "prestasi"
);