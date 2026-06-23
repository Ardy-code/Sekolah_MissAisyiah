const mongoose = require("mongoose");

const guruSchema = new mongoose.Schema({
  id_informasi_guru: Number,

  nama_guru: String,

  jabatan: String,

  jenis_kelamin: String,

  aktif_sejak: Number,

  nomor_hp: String,

  status: String,

  kata_kata_guru: String,

  id_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoginAdmin"
  }
});

module.exports = mongoose.model(
  "guru",
  guruSchema,
  "guru"
);