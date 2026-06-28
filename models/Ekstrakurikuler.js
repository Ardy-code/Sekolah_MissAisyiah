const mongoose = require("mongoose");

const ekstrakurikulerSchema = new mongoose.Schema({

    id_ekstrakurikuler: {
        type: Number,
        unique: true
    },

    upload_gambar: {
        type: String,
        default: null
    },

    nama_ekskul: {
        type: String,
        required: true
    },

    penanggung_jawab: {
        type: String,
        required: true
    },

    deskripsi: {
        type: String,
        required: true
    },

    id_admin: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model(
    "Ekstrakurikuler",
    ekstrakurikulerSchema
);