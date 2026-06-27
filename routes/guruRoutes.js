const express = require("express");

const router = express.Router();

const {

    createGuru,
    getGuru,
    getGuruById,
    updateGuru,
    deleteGuru

} = require("../controllers/guruController");

const verifyToken =
require("../middleware/authMiddleware");

const upload =
require("../middleware/uploadMiddleware");

// READ
router.get("/", getGuru);

router.get("/:id", getGuruById);


// create
router.post(

    "/",

    verifyToken,

    upload.single("foto_guru"),

    createGuru

);

// UPDATE
router.put(
    "/:id",
    verifyToken,
    upload.single("foto_guru"),
    updateGuru
);

// DELETE
router.delete(
    "/:id",
    verifyToken,
    deleteGuru
);
module.exports = router;