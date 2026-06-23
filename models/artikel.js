const mongoose = require("mongoose");

const ArtikelSchema = new mongoose.Schema({

    id_artikel: {
        type: Number,
        unique: true
    },

    upload_gambar: {
        type: String
    },

    judul: {
        type: String,
        required: true
    },

    deskripsi: {
        type: String,
        required: true
    },

    tanggal_publish: {
        type: Date,
        default: Date.now
    },

    id_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoginAdmin"
    }

});

module.exports = mongoose.model(
    "Artikel",
    ArtikelSchema,
    "artikel"
);