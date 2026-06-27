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

    aktif_sejak: {
        type: Number,
        required: true
    },

    nomor_hp: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Aktif", "Tidak Aktif"],
        default: "Aktif"
    },

    kata_kata: {
        type: String,
        required: true
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