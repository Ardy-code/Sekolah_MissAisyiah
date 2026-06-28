const Fasilitas = require("../models/fasilitas");

const getFasilitas = async (req, res) => {
    try {
        const fasilitas = await Fasilitas.find();
        res.status(200).json(fasilitas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFasilitasById = async (req, res) => {
    try {
        const fasilitas = await Fasilitas.findOne({ id_fasilitas: req.params.id });
        if (!fasilitas) {
            return res.status(404).json({ message: "Fasilitas tidak ditemukan" });
        }
        res.status(200).json(fasilitas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createFasilitas = async (req, res) => {
    try {
        const { nama_fasilitas, deskripsi, kondisi } = req.body;
        const upload_gambar = req.file ? req.file.filename : null;

        const last = await Fasilitas.findOne().sort({ id_fasilitas: -1 });
        const newId = last ? last.id_fasilitas + 1 : 1;

        const fasilitas = new Fasilitas({
            id_fasilitas: newId,
            nama_fasilitas,
            deskripsi,
            kondisi,
            upload_gambar,
            id_admin: req.admin.id
        });

        await fasilitas.save();
        res.status(201).json({ message: "Fasilitas berhasil ditambahkan", fasilitas });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFasilitas = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.upload_gambar = req.file.filename;

        const fasilitas = await Fasilitas.findOneAndUpdate(
            { id_fasilitas: req.params.id },
            updateData,
            { returnDocument: "after" }
        );

        if (!fasilitas) {
            return res.status(404).json({ message: "Fasilitas tidak ditemukan" });
        }

        res.status(200).json({ message: "Fasilitas berhasil diupdate", fasilitas });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteFasilitas = async (req, res) => {
    try {
        const fasilitas = await Fasilitas.findOneAndDelete({ id_fasilitas: req.params.id });
        if (!fasilitas) {
            return res.status(404).json({ message: "Fasilitas tidak ditemukan" });
        }
        res.status(200).json({ message: "Fasilitas berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getFasilitas, getFasilitasById, createFasilitas, updateFasilitas, deleteFasilitas };
