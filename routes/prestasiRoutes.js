const express = require("express");

const router = express.Router();

const {

    getPrestasi,
    getPrestasiById,
    createPrestasi,
    updatePrestasi,
    deletePrestasi

} = require("../controllers/prestasiController");

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// READ semua
router.get("/", getPrestasi);

// READ berdasarkan ID
router.get("/:id", getPrestasiById);

// CREATE
router.post(
    "/",
    verifyToken,
    upload.single("upload_gambar"),
    createPrestasi
);
// UPDATE
router.put(
    "/:id",
    verifyToken,
    upload.single("upload_gambar"),
    updatePrestasi
);

// DELETE
router.delete(
    "/:id",
    verifyToken,
    deletePrestasi
);
module.exports = router;