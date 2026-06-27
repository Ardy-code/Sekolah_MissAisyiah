const mongoose = require("mongoose");

const AgendaSchema = new mongoose.Schema({

    id_agenda: {
        type: Number,
        unique: true
    },

    judul: {
        type: String,
        required: true
    },

    deskripsi: {
        type: String,
        required: true
    },

    tanggal_agenda: {
        type: Date,
        required: true
    },

    icon_kategori: {
        type: String,
        required: true
    },

    id_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoginAdmin"
    }

});

module.exports = mongoose.model(
    "Agenda",
    AgendaSchema,
    "agenda"
);