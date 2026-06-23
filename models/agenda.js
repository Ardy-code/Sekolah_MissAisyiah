const mongoose = require("mongoose");

const agendaSchema = new mongoose.Schema({
  id_agenda: {
    type: Number,
    unique: true
  },

  judul: String,

  deskripsi: String,

  tanggal_upload: {
    type: Date,
    default: Date.now
  },

  icon_kategori: String,

  id_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoginAdmin"
  }
});

module.exports = mongoose.model(
  "agenda",
  agendaSchema,
  "agenda"
);