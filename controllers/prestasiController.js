const Prestasi = require("../models/Prestasi");



// GET semua prestasi
const getPrestasi = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 5;

        const keyword = req.query.search || "";

        const skip = (page - 1) * limit;

        const prestasi = await Prestasi.find({

            nama_lomba: {
                $regex: keyword,
                $options: "i"
            }

        })

        .skip(skip)
        .limit(limit);

        const total = await Prestasi.countDocuments({

            nama_lomba: {
                $regex: keyword,
                $options: "i"
            }

        });

        res.status(200).json({

            total,

            page,

            totalPage: Math.ceil(total / limit),

            data: prestasi

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// GET prestasi berdasarkan ID
const getPrestasiById = async (req, res) => {

    try {

        const prestasi = await Prestasi.findOne({

            id_prestasi: req.params.id

        });

        if (!prestasi) {

            return res.status(404).json({

                message: "Prestasi tidak ditemukan"

            });

        }

        res.status(200).json(prestasi);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// CREATE Prestasi
const createPrestasi = async (req, res) => {

    try {

        const {
            nama_lomba,
            juara,
            jenis_lomba,
            tahun,
            cabang_lomba,
            tingkat_lomba
        } = req.body;

        const upload_gambar =
    req.file ? req.file.filename : null;

        const lastPrestasi = await Prestasi
            .findOne()
            .sort({ id_prestasi: -1 });

        let newId = 1;

        if (lastPrestasi) {
            newId = lastPrestasi.id_prestasi + 1;
        }

        const prestasi = new Prestasi({

            id_prestasi: newId,

            upload_gambar,

            nama_lomba,

            juara,

            jenis_lomba,

            tahun,

            cabang_lomba,

            tingkat_lomba,

            id_admin: req.admin.id

        });

        await prestasi.save();

        res.status(201).json({

            message: "Prestasi berhasil ditambahkan",

            prestasi

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// UPDATE Prestasi
const updatePrestasi = async (req, res) => {

    try {
const data = {

    ...req.body

};

if (req.file) {

    data.upload_gambar = req.file.filename;

}
        const prestasi = await Prestasi.findOneAndUpdate(

            {
                id_prestasi: req.params.id
            },

            req.body,

            {
                returnDocument: "after"
            }

        );

        if (!prestasi) {

            return res.status(404).json({

                message: "Prestasi tidak ditemukan"

            });

        }

        res.status(200).json({

            message: "Prestasi berhasil diupdate",

            prestasi

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// DELETE Prestasi
const deletePrestasi = async (req, res) => {

    try {

        const prestasi = await Prestasi.findOneAndDelete({

            id_prestasi: req.params.id

        });

        if (!prestasi) {

            return res.status(404).json({

                message: "Prestasi tidak ditemukan"

            });

        }

        res.status(200).json({

            message: "Prestasi berhasil dihapus"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {
    createPrestasi,
    getPrestasi,
    getPrestasiById,
    updatePrestasi,
    deletePrestasi
};