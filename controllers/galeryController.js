const Galery = require("../models/galery");

const getGalery = async (req, res) => {
    try {
        const galery = await Galery.find();
        res.status(200).json(galery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGaleryById = async (req, res) => {
    try {
        const galery = await Galery.findOne({ id_galeri: req.params.id });
        if (!galery) {
            return res.status(404).json({ message: "Galery tidak ditemukan" });
        }
        res.status(200).json(galery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createGalery = async (req, res) => {
    try {
        const { nama_kegiatan, kategori, file } = req.body;
        const upload_fotovideo = req.file ? req.file.filename : null;

        const last = await Galery.findOne().sort({ id_galeri: -1 });
        const newId = last ? last.id_galeri + 1 : 1;

        const galery = new Galery({
            id_galeri: newId,
            nama_kegiatan,
            kategori,
            file,
            upload_fotovideo,
            id_admin: req.admin.id
        });

        await galery.save();
        res.status(201).json({ message: "Galery berhasil ditambahkan", galery });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGalery = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.upload_fotovideo = req.file.filename;

        const galery = await Galery.findOneAndUpdate(
            { id_galeri: req.params.id },
            updateData,
            { returnDocument: "after" }
        );

        if (!galery) {
            return res.status(404).json({ message: "Galery tidak ditemukan" });
        }

        res.status(200).json({ message: "Galery berhasil diupdate", galery });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteGalery = async (req, res) => {
    try {
        const galery = await Galery.findOneAndDelete({ id_galeri: req.params.id });
        if (!galery) {
            return res.status(404).json({ message: "Galery tidak ditemukan" });
        }
        res.status(200).json({ message: "Galery berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getGalery, getGaleryById, createGalery, updateGalery, deleteGalery };
