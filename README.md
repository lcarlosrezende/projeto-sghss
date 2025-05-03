# SGHSS - Sistema de Gestão Hospitalar 
Este projeto é um sistema de gestão hospitalar com funcionalidades de cadastro e controle de pacientes, doutores e administradores, incluindo autenticação com tokens e criptografia de senhas. Desenvolvido com NodeJs, Express, Sequelize e banco de dados MySQL.

## 🏥 Sobre a documentação
É possível acessa-la clicando aqui.

## 🗄️ Estrutura do Banco de Dados

O banco de dados utilizado se chama `sghss_dev`. A estrutura completa está definida no script DDL abaixo.

<details>
<summary>Clique para expandir o script de criação do banco</summary>


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
