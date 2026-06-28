const mongoose = require("mongoose");

const GuruSchema = new mongoose.Schema({

    id_guru: {
        type: Number,
        unique: true
    },

    foto_guru: {
        type: String
    },

    nama_guru: {
        type: String,
        required: true
    },

    jenis_kelamin: {
        type: String,
        required: true
    },

    jabatan: {
        type: String
    },

    mata_pelajaran: {
        type: String
    },

    aktif_sejak: {
        type: String
    },

    nomor_hp: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Aktif", "Tidak Aktif", "Cuti", "Pensiun"],
        default: "Aktif"
    },

    kata_kata: {
        type: String,
        required: true
    },

    bio: {
        type: String
    },

    id_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoginAdmin"
    }

});

module.exports = mongoose.model(
    "Guru",
    GuruSchema,
    "guru"
);