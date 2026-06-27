const Agenda = require("../models/Agenda");

// GET semua agenda
const getAgenda = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const keyword = req.query.search || "";

        const skip = (page - 1) * limit;

        const agenda = await Agenda.find({
            judul: {
                $regex: keyword,
                $options: "i"
            }
        })
        .skip(skip)
        .limit(limit);

        const total = await Agenda.countDocuments({
            judul: {
                $regex: keyword,
                $options: "i"
            }
        });

        res.status(200).json({
            total,
            page,
            totalPage: Math.ceil(total / limit),
            data: agenda
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET agenda berdasarkan id
const getAgendaById = async (req, res) => {

    try {

        const agenda = await Agenda.findOne({
            id_agenda: req.params.id
        });

        if (!agenda) {
            return res.status(404).json({
                message: "Agenda tidak ditemukan"
            });
        }

        res.status(200).json(agenda);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// CREATE agenda
const createAgenda = async (req, res) => {

    try {

        const {
            judul,
            deskripsi,
            tanggal_agenda,
            icon_kategori
        } = req.body;

        const lastAgenda = await Agenda
            .findOne()
            .sort({ id_agenda: -1 });

        let newId = 1;

        if (lastAgenda) {
            newId = lastAgenda.id_agenda + 1;
        }

        const agenda = new Agenda({

            id_agenda: newId,

            judul,

            deskripsi,

            tanggal_agenda,

            icon_kategori,

            id_admin: req.admin.id

        });

        await agenda.save();

        res.status(201).json({
            message: "Agenda berhasil ditambahkan",
            agenda
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// UPDATE agenda
const updateAgenda = async (req, res) => {

    try {

        const agenda = await Agenda.findOneAndUpdate(
            {
                id_agenda: req.params.id
            },
            req.body,
            {
                returnDocument: "after"
            }
        );

        if (!agenda) {
            return res.status(404).json({
                message: "Agenda tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "Agenda berhasil diupdate",
            agenda
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// DELETE agenda
const deleteAgenda = async (req, res) => {

    try {

        const agenda = await Agenda.findOneAndDelete({
            id_agenda: req.params.id
        });

        if (!agenda) {
            return res.status(404).json({
                message: "Agenda tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "Agenda berhasil dihapus"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getAgenda,
    getAgendaById,
    createAgenda,
    updateAgenda,
    deleteAgenda
};