const express = require("express");

const router = express.Router();

const {

    getPengumuman,
    getPengumumanById,
    createPengumuman,
    updatePengumuman,
    deletePengumuman

} = require("../controllers/pengumumanController");

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// READ semua
router.get("/", getPengumuman);

// READ berdasarkan ID
router.get("/:id", getPengumumanById);

// CREATE
router.post(
    "/",
    verifyToken,
    upload.single("upload_gambar"),
    createPengumuman
);

// UPDATE
router.put(
    "/:id",
    verifyToken,
    updatePengumuman
);

// DELETE
router.delete(
    "/:id",
    verifyToken,
    deletePengumuman
);

module.exports = router;