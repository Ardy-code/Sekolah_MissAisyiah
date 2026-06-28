const express = require("express");
const router = express.Router();

const {
    getGalery,
    getGaleryById,
    createGalery,
    updateGalery,
    deleteGalery
} = require("../controllers/galeryController");

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getGalery);
router.get("/:id", getGaleryById);
router.post("/", verifyToken, upload.single("upload_fotovideo"), createGalery);
router.put("/:id", verifyToken, upload.single("upload_fotovideo"), updateGalery);
router.delete("/:id", verifyToken, deleteGalery);

module.exports = router;
