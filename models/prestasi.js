const mongoose = require("mongoose");

const PrestasiSchema = new mongoose.Schema({

    id_prestasi: {
        type: Number,
        unique: true
    },

    nama_lomba: {
        type: String,
        required: true
    },

    juara: {
        type: String,
        required: true
    },

    jenis_lomba: {
        type: String,
        required: true
    },

    tahun: {
        type: String,
        required: true
    },

    cabang_lomba: {
        type: String,
        required: true
    },

    tingkat_lomba: {
        type: String,
        required: true
    },

    id_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoginAdmin"
    }

});

module.exports = mongoose.model(
    "Prestasi",
    PrestasiSchema,
    "prestasi"
);