const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/paciente/", pacienteController.listar);
router.get("/paciente/:id", pacienteController.buscarPorId);
router.post("/paciente", pacienteController.criar);
router.put("/paciente/:id", pacienteController.atualizar);
router.delete("/paciente/:id", pacienteController.deletar);

module.exports = router;
