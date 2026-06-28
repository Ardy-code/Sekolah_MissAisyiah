const mongoose = require("mongoose");

const galeriSchema = new mongoose.Schema({

    id_galeri: {
        type: Number,
        unique: true
    },

    upload_file: {
        type: String,
        default: null
    },

    nama_kegiatan: {
        type: String,
        required: true
    },

    kategori: {
        type: String,
        enum: [
            "Dalam Kelas",
            "Diluar Kelas"
        ],
        required: true
    },

    jenis_file: {
        type: String,
        enum: [
            "Foto",
            "Video"
        ]
    },

    id_admin: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model(
    "Galeri",
    galeriSchema
);