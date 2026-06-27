const Pengumuman = require("../models/Pengumuman");

// ===============================
// GET semua pengumuman
// ===============================
const getPengumuman = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const keyword = req.query.search || "";

        const skip = (page - 1) * limit;

        const pengumuman = await Pengumuman.find({

            nama_pengumuman: {
                $regex: keyword,
                $options: "i"
            }

        })
            .skip(skip)
            .limit(limit);

        const total = await Pengumuman.countDocuments({

            nama_pengumuman: {
                $regex: keyword,
                $options: "i"
            }

        });

        res.status(200).json({

            total,
            page,
            totalPage: Math.ceil(total / limit),
            data: pengumuman

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// GET pengumuman berdasarkan ID
// ===============================
const getPengumumanById = async (req, res) => {

    try {

        const pengumuman = await Pengumuman.findOne({

            id_pengumuman: req.params.id

        });

        if (!pengumuman) {

            return res.status(404).json({

                message: "Pengumuman tidak ditemukan"

            });

        }

        res.status(200).json(pengumuman);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// CREATE pengumuman
// ===============================
const createPengumuman = async (req, res) => {

    try {

        const {

            nama_pengumuman,
            deskripsi

        } = req.body;

        const upload_gambar =
            req.file ? req.file.filename : null;

        const lastPengumuman = await Pengumuman
            .findOne()
            .sort({ id_pengumuman: -1 });

        let newId = 1;

        if (lastPengumuman) {

            newId = lastPengumuman.id_pengumuman + 1;

        }

        const pengumuman = new Pengumuman({

            id_pengumuman: newId,

            nama_pengumuman,

            deskripsi,

            upload_gambar,

            id_admin: req.admin.id

        });

        await pengumuman.save();

        res.status(201).json({

            message: "Pengumuman berhasil ditambahkan",

            pengumuman

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// UPDATE pengumuman
// ===============================
const updatePengumuman = async (req, res) => {

    try {

        const pengumuman = await Pengumuman.findOneAndUpdate(

            {

                id_pengumuman: req.params.id

            },

            req.body,

            {

                returnDocument: "after"

            }

        );

        if (!pengumuman) {

            return res.status(404).json({

                message: "Pengumuman tidak ditemukan"

            });

        }

        res.status(200).json({

            message: "Pengumuman berhasil diupdate",

            pengumuman

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// DELETE pengumuman
// ===============================
const deletePengumuman = async (req, res) => {

    try {

        const pengumuman = await Pengumuman.findOneAndDelete({

            id_pengumuman: req.params.id

        });

        if (!pengumuman) {

            return res.status(404).json({

                message: "Pengumuman tidak ditemukan"

            });

        }

        res.status(200).json({

            message: "Pengumuman berhasil dihapus"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getPengumuman,
    getPengumumanById,
    createPengumuman,
    updatePengumuman,
    deletePengumuman

};