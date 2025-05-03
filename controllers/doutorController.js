const { Doutor, Paciente, Admin, AdminDoutor } = require("../models");

// Função para criar um novo doutor
exports.criar = async (req, res) => {
  const { nome, especializacao, contato, email, agendamento, admin_id } =
    req.body;

  try {
    if (!nome || !email) {
      return res
        .status(400)
        .json({ message: "Nome e email são obrigatórios." });
    }

    const doctorExistente = await Doutor.findOne({ where: { email } });
    if (doctorExistente) {
      return res
        .status(400)
        .json({ message: "Doutor já existe com esse e-mail." });
    }

    const novoDoutor = await Doutor.create({
      nome,
      especializacao,
      contato,
      email,
      agendamento,
    });

    // Se um admin_id foi fornecido, associa o doutor ao admin que o criou
    if (admin_id) {
      const admin = await Admin.findByPk(admin_id);
      if (admin) {
        await AdminDoutor.create({
          admin_id: admin.admin_id,
          doutor_id: novoDoutor.doutor_id,
        });
      } else {
        console.warn(
          `Admin com ID ${admin_id} não encontrado ao tentar associar doutor.`
        );
      }
    }

    res
      .status(201)
      .json({ message: "Doutor criado com sucesso.", doutor: novoDoutor });
  } catch (err) {
    console.error("Erro ao criar doutor:", err);
    res
      .status(500)
      .json({ message: "Erro ao criar doutor.", error: err.message });
  }
};

// Função para listar todos os doutores
exports.listardoutores = async (req, res) => {
  try {
    const doctors = await Doutor.findAll({
      include: [
        {
          model: Paciente,
          as: "pacientes", // Alias definido na associação belongsToMany em Doutor
          through: { attributes: [] }, // Omitir os atributos da tabela de junção
        },
      ],
    });
    res.status(200).json(doctors);
  } catch (err) {
    console.error("Erro ao listar doutores e seus pacientes:", err);
    res.status(500).json({
      message: "Erro ao listar doutores e seus pacientes.",
      error: err.message,
    });
  }
};

// Função para buscar um doutor por ID e incluir pacientes e admins associados
exports.obterDoutorPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doutor.findByPk(id, {
      include: [
        {
          model: Paciente,
          as: "pacientes",
          through: { attributes: [] },
        },
      ],
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doutor não encontrado." });
    }

    res.status(200).json(doctor);
  } catch (err) {
    console.error("Erro ao buscar doutor:", err);
    res
      .status(500)
      .json({ message: "Erro ao buscar doutor.", error: err.message });
  }
};

// Função para atualizar um doutor por ID
exports.atualizarDoutor = async (req, res) => {
  const { id } = req.params;
  const { nome, especializacao, contato, email, agendamento } = req.body;

  try {
    const doctor = await Doutor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doutor não encontrado." });
    }

    const updates = {};
    if (nome) updates.nome = nome;
    if (especializacao) updates.especializacao = especializacao;
    if (contato) updates.contato = contato;
    if (email && email !== doctor.email) {
      const doctorExistente = await Doutor.findOne({ where: { email } });
      if (doctorExistente && doctorExistente.doutor_id !== parseInt(id)) {
        return res
          .status(400)
          .json({ message: "Email já está em uso por outro doutor." });
      }
      updates.email = email;
    }
    if (agendamento) updates.agendamento = agendamento;

    await Doutor.update(updates, {
      where: { doutor_id: id },
    });

    const doutorAtualizado = await Doutor.findByPk(id);
    res.status(200).json({
      message: "Doutor atualizado com sucesso.",
      doutor: doutorAtualizado,
    });
  } catch (err) {
    console.error("Erro ao atualizar doutor:", err);
    res
      .status(500)
      .json({ message: "Erro ao atualizar doutor.", error: err.message });
  }
};

// Função para deletar um doutor por ID
exports.deletarDoutor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doutor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doutor não encontrado." });
    }

    await Doutor.destroy({
      where: { doutor_id: id },
    });

    res.status(200).json({ message: "Doutor deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar doutor:", err);
    res
      .status(500)
      .json({ message: "Erro ao deletar doutor.", error: err.message });
  }
};

// Função para associar um doutor a um paciente
exports.addPacienteParaDoutor = async (req, res) => {
  const { doutor_id } = req.params;
  const { paciente_id } = req.body;

  try {
    const doutor = await Doutor.findByPk(doutor_id);
    const paciente = await Paciente.findByPk(paciente_id);

    if (!doutor) {
      return res.status(404).json({ message: "Doutor não encontrado." });
    }
    if (!paciente) {
      return res.status(404).json({ message: "Paciente não encontrado." });
    }

    await doutor.addPaciente(paciente);
    res
      .status(200)
      .json({ message: "Paciente associado ao doutor com sucesso." });
  } catch (err) {
    console.error("Erro ao associar paciente ao doutor:", err);
    console.log("Objeto de erro:", err); // Log do objeto de erro completo
    res.status(500).json({
      message: "Erro ao associar paciente ao doutor.",
      error: err.message,
    });
  }
};

// Função para remover um paciente de um doutor
exports.removerPacienteDoctor = async (req, res) => {
  const { doutor_id } = req.params;
  const { paciente_id } = req.body;

  try {
    const doctor = await Doutor.findByPk(doutor_id);
    const patient = await Paciente.findByPk(paciente_id);

    if (!doctor) {
      return res.status(404).json({ message: "Doutor não encontrado." });
    }
    if (!patient) {
      return res.status(404).json({ message: "Paciente não encontrado." });
    }

    await doctor.removePaciente(patient); // Método mágico gerado pela associação belongsToMany
    res
      .status(200)
      .json({ message: "Paciente removido do doutor com sucesso." });
  } catch (err) {
    console.error("Erro ao remover paciente do doutor:", err);
    res.status(500).json({
      message: "Erro ao remover paciente do doutor.",
      error: err.message,
    });
  }
};

// Função para associar um doutor a um admin
exports.associarAdminADoctor = async (req, res) => {
  const { doutor_id } = req.params;
  const { admin_id } = req.body;

  try {
    const doctor = await Doutor.findByPk(doutor_id);
    const admin = await Admin.findByPk(admin_id);

    if (!doctor) {
      return res.status(404).json({ message: "Doutor não encontrado." });
    }
    if (!admin) {
      return res.status(404).json({ message: "Admin não encontrado." });
    }

    await doctor.addAdmin(admin);
    res.status(200).json({ message: "Admin associado ao doutor com sucesso." });
  } catch (err) {
    console.error("Erro ao associar admin ao doutor:", err);
    res.status(500).json({
      message: "Erro ao associar admin ao doutor.",
      error: err.message,
    });
  }
};

// Função para remover um admin de um doutor
exports.removerAssociacaoAdminDoctor = async (req, res) => {
  const { doutor_id } = req.params;
  const { admin_id } = req.body;

  try {
    const doctor = await Doutor.findByPk(doutor_id);
    const admin = await Admin.findByPk(admin_id);

    if (!doctor) {
      return res.status(404).json({ message: "Doutor não encontrado." });
    }
    if (!admin) {
      return res.status(404).json({ message: "Admin não encontrado." });
    }

    await doctor.removeAdmin(admin); // Método mágico gerado pela associação belongsToMany
    res.status(200).json({ message: "Admin removido do doutor com sucesso." });
  } catch (err) {
    console.error("Erro ao remover admin do doutor:", err);
    res.status(500).json({
      message: "Erro ao remover admin do doutor.",
      error: err.message,
    });
  }
};
