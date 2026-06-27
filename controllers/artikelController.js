const Artikel = require("../models/Artikel");


// GET artikel berdasarkan id_artikel
const getArtikelById = async (req, res) => {

    try {

        const artikel = await Artikel.findOne({
            id_artikel: req.params.id
        });

        if (!artikel) {
            return res.status(404).json({
                message: "Artikel tidak ditemukan"
            });
        }

        res.status(200).json(artikel);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const getArtikel = async (req, res) => {

    try {

     

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const keyword = req.query.search || "";

       

        const skip = (page - 1) * limit;

        const artikel = await Artikel.find({
            judul: {
                $regex: keyword,
                $options: "i"
            }
        })
        .skip(skip)
        .limit(limit);

       

        const total = await Artikel.countDocuments({
            judul: {
                $regex: keyword,
                $options: "i"
            }
        });

        res.status(200).json({
            total,
            page,
            totalPage: Math.ceil(total / limit),
            data: artikel
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const createArtikel = async (req, res) => {

    try {

       const {
    judul,
    deskripsi
} = req.body;

const upload_gambar =
    req.file ? req.file.filename : null;
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
        returnDocument: "after"
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
    getArtikelById,
    getArtikel,
    createArtikel,
    updateArtikel,
    deleteArtikel
};