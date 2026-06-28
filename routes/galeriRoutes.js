const express = require("express");

const router = express.Router();

const {

    createGaleri,
    getGaleri,
    getGaleriById,
    updateGaleri,
    deleteGaleri

} = require("../controllers/galeriController");

const verifyToken =
    require("../middleware/authMiddleware");

const upload =
    require("../middleware/uploadGaleriMiddleware");

// READ galeri berdasarkan ID
router.get("/:id", getGaleriById);

// READ semua galeri
router.get("/", getGaleri);

router.post(

    "/",

    verifyToken,

    upload.single("upload_file"),

    createGaleri

);

router.put(

    "/:id",

    verifyToken,

    upload.single("upload_file"),

    updateGaleri

);

router.delete(

    "/:id",

    verifyToken,

    deleteGaleri

);

module.exports = router;