const express = require("express");

const router = express.Router();

const {

    createEkstrakurikuler,
    getEkstrakurikuler,
    getEkstrakurikulerById,
    updateEkstrakurikuler,
    deleteEkstrakurikuler

} = require("../controllers/ekstrakurikulerController");

const verifyToken =
    require("../middleware/authMiddleware");

const upload =
    require("../middleware/uploadMiddleware");

// READ berdasarkan ID
router.get("/:id", getEkstrakurikulerById);

// READ semua ekstrakurikuler
router.get("/", getEkstrakurikuler);

router.post(

    "/",

    verifyToken,

    upload.single("upload_gambar"),

    createEkstrakurikuler

);


router.put(

    "/:id",

    verifyToken,

    upload.single("upload_gambar"),

    updateEkstrakurikuler

);

router.delete(

    "/:id",

    verifyToken,

    deleteEkstrakurikuler

);
module.exports = router;