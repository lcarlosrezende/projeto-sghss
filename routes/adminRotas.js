const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/admin/create", adminController.criarAdmin);
router.put("/admin/update", adminController.atualizarAdmin);
router.delete("/admin/delete", adminController.deletarAdmin);
router.get("/admin", adminController.listarAdmins);
router.get("/admin/:id", adminController.obterAdminPorId);

module.exports = router;
