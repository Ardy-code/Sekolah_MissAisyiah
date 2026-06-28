const mongoose = require("mongoose");

const fasilitasSchema = new mongoose.Schema({

    id_fasilitas: {
        type: Number,
        unique: true
    },

    upload_gambar: {
        type: String,
        default: null
    },

    nama_fasilitas: {
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
    "Fasilitas",
    fasilitasSchema
);