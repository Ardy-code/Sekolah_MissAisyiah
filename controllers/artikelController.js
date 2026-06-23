const Artikel = require("../models/Artikel");

const getArtikel = async (req, res) => {

    try {

        const artikel = await Artikel.find();

        res.json(artikel);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getArtikel
};