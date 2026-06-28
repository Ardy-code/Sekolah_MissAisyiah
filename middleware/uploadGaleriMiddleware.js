const multer = require("multer");
const path = require("path");

// Penyimpanan file
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// Filter file
const fileFilter = (req, file, cb) => {

    const allowedTypes =
        /jpg|jpeg|png|webp|mp4|mov|avi|mkv/;

    const ext = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mime =
        file.mimetype.startsWith("image/")
        ||
        file.mimetype.startsWith("video/");

    if (ext && mime) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Hanya file gambar atau video yang diperbolehkan."
            )
        );

    }

};

module.exports = multer({

    storage,

    fileFilter

});