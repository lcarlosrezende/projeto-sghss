const express = require("express");
const router = express.Router();
const pessoaController = require("../controllers/pessoaController");

router.post("/pessoa", pessoaController.criar);
router.get("/pessoa", pessoaController.listar);
router.get("/pessoa/:id", pessoaController.buscarPorId);
router.put("/pessoa/:id", pessoaController.atualizar);
router.delete("/pessoa/:id", pessoaController.deletar);

module.exports = router;
