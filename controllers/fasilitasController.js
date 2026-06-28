const Fasilitas = require("../models/Fasilitas");

// GET fasilitas berdasarkan ID
const getFasilitasById = async (req, res) => {

    try {

        const fasilitas = await Fasilitas.findOne({
            id_fasilitas: req.params.id
        });

        if (!fasilitas) {

            return res.status(404).json({
                message: "Fasilitas tidak ditemukan"
            });

        }

        res.status(200).json(fasilitas);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET semua fasilitas
const getFasilitas = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 5;

        const keyword = req.query.search || "";

        const skip = (page - 1) * limit;

        const fasilitas = await Fasilitas.find({

            nama_fasilitas: {
                $regex: keyword,
                $options: "i"
            }

        })
        .skip(skip)
        .limit(limit);

        const total = await Fasilitas.countDocuments({

            nama_fasilitas: {
                $regex: keyword,
                $options: "i"
            }

        });

        res.status(200).json({

            total,

            page,

            totalPage: Math.ceil(total / limit),

            data: fasilitas

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// CREATE
const createFasilitas = async (req, res) => {

    try {

        const {

            nama_fasilitas,

            deskripsi

        } = req.body;

        const upload_gambar =
            req.file ? req.file.filename : null;

        const lastFasilitas = await Fasilitas
            .findOne()
            .sort({ id_fasilitas: -1 });

        let newId = 1;

        if (lastFasilitas) {

            newId = lastFasilitas.id_fasilitas + 1;

        }

        const fasilitas = new Fasilitas({

            id_fasilitas: newId,

            upload_gambar,

            nama_fasilitas,

            deskripsi,

            id_admin: req.admin.id

        });

        await fasilitas.save();

        res.status(201).json({

            message: "Fasilitas berhasil ditambahkan",

            fasilitas

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// UPDATE fasilitas
const updateFasilitas = async (req, res) => {

    try {

        const fasilitas = await Fasilitas.findOne({
            id_fasilitas: req.params.id
        });

        if (!fasilitas) {

            return res.status(404).json({
                message: "Fasilitas tidak ditemukan"
            });

        }

        fasilitas.nama_fasilitas =
            req.body.nama_fasilitas || fasilitas.nama_fasilitas;

        fasilitas.deskripsi =
            req.body.deskripsi || fasilitas.deskripsi;

        // Jika upload gambar baru
        if (req.file) {

            fasilitas.upload_gambar = req.file.filename;

        }

        await fasilitas.save();

        res.status(200).json({

            message: "Fasilitas berhasil diupdate",

            fasilitas

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// DELETE fasilitas
const deleteFasilitas = async (req, res) => {

    try {

        const fasilitas = await Fasilitas.findOneAndDelete({

            id_fasilitas: req.params.id

        });

        if (!fasilitas) {

            return res.status(404).json({

                message: "Fasilitas tidak ditemukan"

            });

        }

        res.status(200).json({

            message: "Fasilitas berhasil dihapus"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    createFasilitas,
    getFasilitas,
    getFasilitasById,
    updateFasilitas,
    deleteFasilitas

};