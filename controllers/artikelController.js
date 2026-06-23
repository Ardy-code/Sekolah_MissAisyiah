const Artikel = require("../models/Artikel");

// GET semua artikel
const getArtikel = async (req, res) => {

    try {

        const artikel = await Artikel.find();

        res.status(200).json(artikel);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// CREATE artikel
const createArtikel = async (req, res) => {

    try {

        const {
            judul,
            deskripsi,
            upload_gambar
        } = req.body;

        const lastArtikel = await Artikel
            .findOne()
            .sort({ id_artikel: -1 });

        let newId = 1;

        if (lastArtikel) {
            newId = lastArtikel.id_artikel + 1;
        }

        const artikel = new Artikel({

            id_artikel: newId,

            judul,

            deskripsi,

            upload_gambar,

            id_admin: req.admin.id

        });

        await artikel.save();

        res.status(201).json({
            message: "Artikel berhasil ditambahkan",
            artikel
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// UPDATE artikel
const updateArtikel = async (req, res) => {

    try {

        const artikel = await Artikel.findOneAndUpdate(
            {
                id_artikel: req.params.id
            },
            req.body,
            {
                new: true
            }
        );

        if (!artikel) {
            return res.status(404).json({
                message: "Artikel tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "Artikel berhasil diupdate",
            artikel
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// DELETE artikel
const deleteArtikel = async (req, res) => {

    try {

        const artikel = await Artikel.findOneAndDelete({
            id_artikel: req.params.id
        });

        if (!artikel) {
            return res.status(404).json({
                message: "Artikel tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "Artikel berhasil dihapus"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getArtikel,
    createArtikel,
    updateArtikel,
    deleteArtikel
};