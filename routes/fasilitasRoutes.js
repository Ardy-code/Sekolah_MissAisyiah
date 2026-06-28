const express = require("express");
const router = express.Router();

const {
    getFasilitas,
    getFasilitasById,
    createFasilitas,
    updateFasilitas,
    deleteFasilitas
} = require("../controllers/fasilitasController");

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getFasilitas);
router.get("/:id", getFasilitasById);
router.post("/", verifyToken, upload.single("upload_gambar"), createFasilitas);
router.put("/:id", verifyToken, upload.single("upload_gambar"), updateFasilitas);
router.delete("/:id", verifyToken, deleteFasilitas);

module.exports = router;
