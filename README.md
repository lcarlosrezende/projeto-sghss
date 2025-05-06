# 💊 SGHSS - Sistema de Gestão Hospitalar

Este repositório contém o **SGHSS**, um sistema de gestão hospitalar com funcionalidades de cadastro e controle de pacientes, doutores e administradores. O sistema oferece autenticação via tokens (JWT), criptografia de senhas e relacionamentos entre entidades. Foi desenvolvido com **Node.js**, **Express**, **Sequelize** e **MySQL**.

---

## 📄 Documentação

A documentação completa do projeto pode ser acessada em PDF:

👉 [Clique aqui para visualizar](https://github.com/lcarlosrezende/projeto-sghss/blob/master/Documentacao%20SGHSS%20-%20Luiz%204303616.pdf)

---

## 🚀 Como rodar o projeto

### ✅ Pré-requisitos

- Node.js instalado (versão 16+ recomendada)
- MySQL em execução
- Editor de código (ex: VS Code)
- Gerenciador de pacotes (NPM)

### 🔧 Passos para executar

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/lcarlosrezende/projeto-sghss.git
   cd projeto-sghss
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure o arquivo `.env`:**

   Crie um arquivo `.env` na raiz do projeto com os seguintes dados:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=sghss_dev
   JWT_SECRET=sua_chave_secreta
   ```

4. **Crie o banco de dados:**

   Execute o script SQL abaixo no seu MySQL

5. **Inicie a aplicação:**

   ```bash
   npm start
   ```

---

## 🗄️ Estrutura do Banco de Dados

O banco de dados utilizado se chama `sghss_dev`. Abaixo está o script DDL completo para criação das tabelas e relacionamentos:

<details>
<summary>📜 Clique para expandir o script de criação do banco</summary>

```sql
-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS sghss_dev;
USE sghss_dev;

-- Tabela Pessoa
CREATE TABLE IF NOT EXISTS Pessoa (
    pessoa_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    contato VARCHAR(50),
    email VARCHAR(100)
);

-- Tabela Doutor
CREATE TABLE IF NOT EXISTS Doutor (
    doutor_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especializacao VARCHAR(100),
    contato VARCHAR(50),
    email VARCHAR(100),
    agendamento VARCHAR(100)
);

-- Tabela Paciente
CREATE TABLE IF NOT EXISTS Paciente (
    paciente_id INT AUTO_INCREMENT PRIMARY KEY,
    pessoa_id INT NOT NULL,
    data_admissao DATE NOT NULL,
    diagnostico TEXT,
    FOREIGN KEY (pessoa_id) REFERENCES Pessoa(pessoa_id)
);

-- Tabela Admin
CREATE TABLE IF NOT EXISTS Admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    senha VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    token VARCHAR(255)
);

-- Relações
CREATE TABLE IF NOT EXISTS Paciente_Doutor (
    paciente_id INT,
    doutor_id INT,
    PRIMARY KEY (paciente_id, doutor_id),
    FOREIGN KEY (paciente_id) REFERENCES Paciente(paciente_id),
    FOREIGN KEY (doutor_id) REFERENCES Doutor(doutor_id)
);

CREATE TABLE IF NOT EXISTS Admin_Paciente (
    admin_id INT,
    paciente_id INT,
    PRIMARY KEY (admin_id, paciente_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id),
    FOREIGN KEY (paciente_id) REFERENCES Paciente(paciente_id)
);

CREATE TABLE IF NOT EXISTS Admin_Doutor (
    admin_id INT,
    doutor_id INT,
    PRIMARY KEY (admin_id, doutor_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id),
    FOREIGN KEY (doutor_id) REFERENCES Doutor(doutor_id)
);
```

</details>

---

## 📁 Estrutura de Pastas (exemplo)

```
projeto-sghss/
│
├── controllers/
├── models/
├── routes/
├── config/
├── .env
├── index.js
├── package.json
└── README.md
```

