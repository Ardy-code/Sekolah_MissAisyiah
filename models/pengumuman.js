const mongoose = require("mongoose");

const PengumumanSchema = new mongoose.Schema({

    id_pengumuman: {
        type: Number,
        unique: true
    },

    upload_gambar: {
        type: String
    },

    nama_pengumuman: {
        type: String,
        required: true
    },

    deskripsi: {
        type: String,
        required: true
    },

    id_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoginAdmin"
    }

});

module.exports = mongoose.model(
    "Pengumuman",
    PengumumanSchema,
    "pengumuman"
);