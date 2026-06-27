const express = require("express");

const router = express.Router();

const {
    getAgenda,
    getAgendaById,
    createAgenda,
    updateAgenda,
    deleteAgenda
} = require("../controllers/agendaController");

const verifyToken = require("../middleware/authMiddleware");

// READ semua agenda
router.get("/", getAgenda);

// READ agenda berdasarkan ID
router.get("/:id", getAgendaById);

// CREATE agenda
router.post(
    "/",
    verifyToken,
    createAgenda,
);

// UPDATE
router.put(
    "/:id",
    verifyToken,
    updateAgenda
);

// DELETE
router.delete(
    "/:id",
    verifyToken,
    deleteAgenda
);
module.exports = router;