const Ekstrakurikuler = require("../models/Ekstrakurikuler");

// GET ekstrakurikuler berdasarkan ID
const getEkstrakurikulerById = async (req, res) => {

    try {

        const ekstrakurikuler = await Ekstrakurikuler.findOne({

            id_ekstrakurikuler: req.params.id

        });

        if (!ekstrakurikuler) {

            return res.status(404).json({

                message: "Ekstrakurikuler tidak ditemukan"

            });

        }

        res.status(200).json(ekstrakurikuler);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// GET semua ekstrakurikuler
const getEkstrakurikuler = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 5;

        const keyword = req.query.search || "";

        const skip = (page - 1) * limit;

        const ekstrakurikuler = await Ekstrakurikuler.find({

            nama_ekskul: {

                $regex: keyword,

                $options: "i"

            }

        })
        .skip(skip)
        .limit(limit);

        const total = await Ekstrakurikuler.countDocuments({

            nama_ekskul: {

                $regex: keyword,

                $options: "i"

            }

        });

        res.status(200).json({

            total,

            page,

            totalPage: Math.ceil(total / limit),

            data: ekstrakurikuler

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// CREATE
const createEkstrakurikuler = async (req, res) => {

    try {

        const {

            nama_ekskul,

            penanggung_jawab,

            deskripsi

        } = req.body;

        const upload_gambar =
            req.file ? req.file.filename : null;

        const lastData = await Ekstrakurikuler
            .findOne()
            .sort({ id_ekstrakurikuler: -1 });

        let newId = 1;

        if (lastData) {

            newId =
                lastData.id_ekstrakurikuler + 1;

        }

        const ekstrakurikuler =
            new Ekstrakurikuler({

                id_ekstrakurikuler: newId,

                upload_gambar,

                nama_ekskul,

                penanggung_jawab,

                deskripsi,

                id_admin: req.admin.id

            });

        await ekstrakurikuler.save();

        res.status(201).json({

            message:
                "Ekstrakurikuler berhasil ditambahkan",

            ekstrakurikuler

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// UPDATE Ekstrakurikuler
const updateEkstrakurikuler = async (req, res) => {

    try {

        const ekstrakurikuler = await Ekstrakurikuler.findOne({

            id_ekstrakurikuler: req.params.id

        });

        if (!ekstrakurikuler) {

            return res.status(404).json({

                message: "Ekstrakurikuler tidak ditemukan"

            });

        }

        ekstrakurikuler.nama_ekskul =
            req.body.nama_ekskul || ekstrakurikuler.nama_ekskul;

        ekstrakurikuler.penanggung_jawab =
            req.body.penanggung_jawab || ekstrakurikuler.penanggung_jawab;

        ekstrakurikuler.deskripsi =
            req.body.deskripsi || ekstrakurikuler.deskripsi;

        // Jika upload gambar dari frontend
        if (req.file) {

            ekstrakurikuler.upload_gambar = req.file.filename;

        }

        // Jika tes menggunakan Body JSON
        else if (req.body.upload_gambar) {

            ekstrakurikuler.upload_gambar =
                req.body.upload_gambar;

        }

        await ekstrakurikuler.save();

        res.status(200).json({

            message: "Ekstrakurikuler berhasil diupdate",

            ekstrakurikuler

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// DELETE Ekstrakurikuler
const deleteEkstrakurikuler = async (req, res) => {

    try {

        const ekstrakurikuler =
            await Ekstrakurikuler.findOneAndDelete({

                id_ekstrakurikuler: req.params.id

            });

        if (!ekstrakurikuler) {

            return res.status(404).json({

                message: "Ekstrakurikuler tidak ditemukan"

            });

        }

        res.status(200).json({

            message: "Ekstrakurikuler berhasil dihapus"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    createEkstrakurikuler,
    getEkstrakurikuler,
    getEkstrakurikulerById,
    updateEkstrakurikuler,
    deleteEkstrakurikuler

};