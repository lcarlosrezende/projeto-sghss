const express = require("express");
const router = express.Router();
const doutorController = require("../controllers/doutorController");

// Rotas para CRUD básico de doutor
router.post("/doutor", doutorController.criar);
router.get("/doutor", doutorController.listardoutores);
router.get("/doutor/:id", doutorController.obterDoutorPorId);
router.put("/doutor/:id", doutorController.atualizarDoutor);
router.delete("/doutor/:id", doutorController.deletarDoutor);

// Rotas para gerenciar o relacionamento com Pacientes
router.post(
  "/doutor/:doutor_id/paciente",
  doutorController.addPacienteParaDoutor
);
router.delete(
  "/doutor/:doutor_id/paciente",
  doutorController.removerPacienteDoctor
);

// Rotas para gerenciar o relacionamento com Admins
router.post("/doutor/:doutor_id/admin", doutorController.associarAdminADoctor);
router.delete(
  "/doutor/:doutor_id/admin",
  doutorController.removerAssociacaoAdminDoctor
);

module.exports = router;
