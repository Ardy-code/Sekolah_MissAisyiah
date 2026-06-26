const express = require("express");
const router = express.Router();

const {
    getArtikel,
    getArtikelById,
    createArtikel,
    updateArtikel,
    deleteArtikel
} = require("../controllers/artikelController");

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// READ
router.get("/", getArtikel);

router.get("/:id", getArtikelById);

// CREATE
router.post(
    "/",
    verifyToken,
    upload.single("upload_gambar"),
    createArtikel
);

// UPDATE
router.put(
    "/:id",
    verifyToken,
    updateArtikel
);

// DELETE
router.delete(
    "/:id",
    verifyToken,
    deleteArtikel
);

module.exports = router;