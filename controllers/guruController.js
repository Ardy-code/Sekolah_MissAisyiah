const Guru = require("../models/Guru");


// GET semua guru
const getGuru = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 5;

        const keyword = req.query.search || "";

        const skip = (page - 1) * limit;

        const guru = await Guru.find({

            nama_guru: {
                $regex: keyword,
                $options: "i"
            }

        })
        .skip(skip)
        .limit(limit);

        const total = await Guru.countDocuments({

            nama_guru: {
                $regex: keyword,
                $options: "i"
            }

        });

        res.status(200).json({

            total,

            page,

            totalPage: Math.ceil(total / limit),

            data: guru

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// GET Guru berdasarkan ID
const getGuruById = async (req, res) => {

    try {

        const guru = await Guru.findOne({
            id_guru: req.params.id
        });

        if (!guru) {
            return res.status(404).json({
                message: "Guru tidak ditemukan"
            });
        }

        res.status(200).json(guru);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// CREATE Guru
const createGuru = async (req, res) => {

    try {

        const {

            nama_guru,
            jenis_kelamin,
            aktif_sejak,
            nomor_hp,
            status,
            kata_kata

        } = req.body;

        const foto_guru =
            req.file ? req.file.filename : null;

        const lastGuru = await Guru
            .findOne()
            .sort({ id_guru: -1 });

        let newId = 1;

        if (lastGuru) {
            newId = lastGuru.id_guru + 1;
        }

        const guru = new Guru({

            id_guru: newId,

            foto_guru,

            nama_guru,

            jenis_kelamin,

            aktif_sejak,

            nomor_hp,

            status,

            kata_kata,

            id_admin: req.admin.id

        });

        await guru.save();

        res.status(201).json({

            message: "Guru berhasil ditambahkan",

            guru

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// UPDATE Guru
const updateGuru = async (req, res) => {

    try {

        const guru = await Guru.findOne({
            id_guru: req.params.id
        });

        if (!guru) {

            return res.status(404).json({
                message: "Guru tidak ditemukan"
            });

        }

        guru.nama_guru =
            req.body.nama_guru || guru.nama_guru;

        guru.jenis_kelamin =
            req.body.jenis_kelamin || guru.jenis_kelamin;

        guru.aktif_sejak =
            req.body.aktif_sejak || guru.aktif_sejak;

        guru.nomor_hp =
            req.body.nomor_hp || guru.nomor_hp;

        guru.status =
            req.body.status || guru.status;

        guru.kata_kata =
            req.body.kata_kata || guru.kata_kata;

        // Jika upload foto baru
        if (req.file) {

            guru.foto_guru = req.file.filename;

        }

        await guru.save();

        res.status(200).json({

            message: "Guru berhasil diupdate",

            guru

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// DELETE Guru
const deleteGuru = async (req, res) => {

    try {

        const guru = await Guru.findOneAndDelete({
            id_guru: req.params.id
        });

        if (!guru) {

            return res.status(404).json({
                message: "Guru tidak ditemukan"
            });

        }

        res.status(200).json({

            message: "Guru berhasil dihapus"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
module.exports = {

    createGuru,
    getGuru,
    getGuruById,
    updateGuru,
    deleteGuru

};