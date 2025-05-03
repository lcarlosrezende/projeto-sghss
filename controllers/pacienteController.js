const { Paciente, Admin, Pessoa } = require("../models");

exports.listar = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll({
      include: [
        {
          model: Pessoa,
          as: "pessoa",
          attributes: ["nome", "contato", "email"],
        },
      ],
    });

    const pacientesComDadosPessoa = pacientes.map((paciente) => {
      return {
        paciente_id: paciente.paciente_id,
        data_admissao: paciente.data_admissao,
        diagnostico: paciente.diagnostico,
        pessoa_id: paciente.pessoa_id,
        nome: paciente.pessoa ? paciente.pessoa.nome : null,
        contato: paciente.pessoa ? paciente.pessoa.contato : null,
        email: paciente.pessoa ? paciente.pessoa.email : null,
      };
    });

    res.json(pacientesComDadosPessoa);
  } catch (err) {
    console.error("Erro ao buscar pacientes:", err);
    res.status(500).json({ mensagem: "Erro ao buscar pacientes.", erro: err });
  }
};

exports.criar = async (req, res) => {
  try {
    const { pessoa_id, data_admissao, diagnostico } = req.body;
    const adminId = req.admin_id;

    if (!adminId) {
      return res.status(401).json({ mensagem: "Admin não autenticado." });
    }

    if (!pessoa_id || !data_admissao) {
      return res
        .status(400)
        .json({ mensagem: "pessoa_id e data_admissao são obrigatórios." });
    }

    const novoPaciente = await Paciente.create({
      pessoa_id,
      data_admissao,
      diagnostico,
    });

    console.log("Paciente criado:", novoPaciente);

    // Agora, vamos associar o paciente ao admin que o criou
    const admin = await Admin.findByPk(adminId);

    if (admin) {
      await admin.addPaciente(novoPaciente); // Método Sequelize gerado pela associação belongsToMany
      console.log("Paciente associado ao Admin:", adminId);

      res.status(201).json({
        mensagem: "Paciente criado e associado ao Admin com sucesso.",
        paciente: novoPaciente,
      });
    } else {
      // Se o admin não for encontrado (algo inesperado)
      console.warn("Admin não encontrado ao tentar associar paciente.");
      res.status(201).json({
        // Mesmo assim, o paciente foi criado
        mensagem:
          "Paciente criado com sucesso, mas houve um problema ao associar ao Admin.",
        paciente: novoPaciente,
      });
    }
  } catch (err) {
    console.error("Erro ao criar paciente:", err);
    res.status(500).json({ mensagem: "Erro ao criar paciente.", erro: err });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);
    if (!paciente)
      return res.status(404).json({ mensagem: "Paciente não encontrado." });

    res.json(paciente);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar paciente.", erro: err });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);
    if (!paciente)
      return res.status(404).json({ mensagem: "Paciente não encontrado." });

    await paciente.update(req.body);
    res.json({ mensagem: "Paciente atualizado com sucesso.", paciente });
  } catch (err) {
    res
      .status(500)
      .json({ mensagem: "Erro ao atualizar paciente.", erro: err });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);
    if (!paciente)
      return res.status(404).json({ mensagem: "Paciente não encontrado." });

    await paciente.destroy();
    res.json({ mensagem: "Paciente excluído com sucesso." });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao excluir paciente.", erro: err });
  }
};
