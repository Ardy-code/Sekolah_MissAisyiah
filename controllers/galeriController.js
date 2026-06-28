const Galeri = require("../models/Galeri");

// GET galeri berdasarkan ID
const getGaleriById = async (req, res) => {

    try {

        const galeri = await Galeri.findOne({

            id_galeri: req.params.id

        });

        if (!galeri) {

            return res.status(404).json({

                message: "Galeri tidak ditemukan"

            });

        }

        res.status(200).json(galeri);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// GET semua galeri
const getGaleri = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 5;

        const keyword = req.query.search || "";

        const skip = (page - 1) * limit;

        const galeri = await Galeri.find({

            nama_kegiatan: {

                $regex: keyword,

                $options: "i"

            }

        })

        .skip(skip)

        .limit(limit);

        const total = await Galeri.countDocuments({

            nama_kegiatan: {

                $regex: keyword,

                $options: "i"

            }

        });

        res.status(200).json({

            total,

            page,

            totalPage: Math.ceil(total / limit),

            data: galeri

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// CREATE Galeri
const createGaleri = async (req, res) => {

    try {

        const {
            nama_kegiatan,
            kategori
        } = req.body;

        const upload_file =
            req.file ? req.file.filename : null;

        let jenis_file = "";

        // Menentukan jenis file otomatis
        if (req.file) {

            if (
                req.file.mimetype.startsWith("image/")
            ) {

                jenis_file = "Foto";

            } else if (

                req.file.mimetype.startsWith("video/")

            ) {

                jenis_file = "Video";

            }

        }

        // Cari ID terakhir
        const lastGaleri = await Galeri
            .findOne()
            .sort({ id_galeri: -1 });

        let newId = 1;

        if (lastGaleri) {

            newId = lastGaleri.id_galeri + 1;

        }

        const galeri = new Galeri({

            id_galeri: newId,

            upload_file,

            nama_kegiatan,

            kategori,

            jenis_file,

            id_admin: req.admin.id

        });

        await galeri.save();

        res.status(201).json({

            message: "Galeri berhasil ditambahkan",

            galeri

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// UPDATE Galeri
const updateGaleri = async (req, res) => {

    try {

        const galeri = await Galeri.findOne({

            id_galeri: req.params.id

        });

        if (!galeri) {

            return res.status(404).json({

                message: "Galeri tidak ditemukan"

            });

        }

        galeri.nama_kegiatan =
            req.body.nama_kegiatan || galeri.nama_kegiatan;

        galeri.kategori =
            req.body.kategori || galeri.kategori;

        // Jika upload file baru
        if (req.file) {

            galeri.upload_file = req.file.filename;

            if (req.file.mimetype.startsWith("image/")) {

                galeri.jenis_file = "Foto";

            } else if (req.file.mimetype.startsWith("video/")) {

                galeri.jenis_file = "Video";

            }

        }

        await galeri.save();

        res.status(200).json({

            message: "Galeri berhasil diupdate",

            galeri

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// DELETE Galeri
const deleteGaleri = async (req, res) => {

    try {

        const galeri = await Galeri.findOneAndDelete({

            id_galeri: req.params.id

        });

        if (!galeri) {

            return res.status(404).json({

                message: "Galeri tidak ditemukan"

            });

        }

        res.status(200).json({

            message: "Galeri berhasil dihapus"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    createGaleri,
    getGaleri,
    getGaleriById,
    updateGaleri,
    deleteGaleri

};