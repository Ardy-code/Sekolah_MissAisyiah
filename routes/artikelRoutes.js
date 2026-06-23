const express = require("express");

const router = express.Router();

const {
    getArtikel,
    createArtikel,
    updateArtikel,
    deleteArtikel
} = require("../controllers/artikelController");

const verifyToken =
require("../middleware/authMiddleware");

router.get("/", getArtikel);

router.post(
    "/",
    verifyToken,
    createArtikel
);

router.put(
    "/:id",
    verifyToken,
    updateArtikel
);

router.delete(
    "/:id",
    verifyToken,
    deleteArtikel
);

module.exports = router;