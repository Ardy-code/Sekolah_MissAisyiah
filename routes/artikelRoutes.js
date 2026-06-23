const express = require("express");

const router = express.Router();

const {
    getArtikel
} = require("../controllers/artikelController");

router.get("/", getArtikel);

module.exports = router;