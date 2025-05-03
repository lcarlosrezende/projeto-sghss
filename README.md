SCRIPT CRIAÇÃO DE BANCO DDL

-- Criar o banco de dados DDL
CREATE DATABASE IF NOT EXISTS sghss_dev;

-- Usar o banco de dados criado
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

-- Tabela Admin com token
CREATE TABLE IF NOT EXISTS Admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    senha VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    token VARCHAR(255)
);

-- Relação Paciente-Doutor (muitos para muitos)
CREATE TABLE IF NOT EXISTS Paciente_Doutor (
    paciente_id INT,
    doutor_id INT,
    PRIMARY KEY (paciente_id, doutor_id),
    FOREIGN KEY (paciente_id) REFERENCES Paciente(paciente_id),
    FOREIGN KEY (doutor_id) REFERENCES Doutor(doutor_id)
);

-- Relação Admin-Paciente
CREATE TABLE IF NOT EXISTS Admin_Paciente (
    admin_id INT,
    paciente_id INT,
    PRIMARY KEY (admin_id, paciente_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id),
    FOREIGN KEY (paciente_id) REFERENCES Paciente(paciente_id)
);

-- Relação Admin-Doutor
CREATE TABLE IF NOT EXISTS Admin_Doutor (
    admin_id INT,
    doutor_id INT,
    PRIMARY KEY (admin_id, doutor_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id),
    FOREIGN KEY (doutor_id) REFERENCES Doutor(doutor_id)
);

select * from admin_paciente;
select * from paciente;
select * from admin_doutor;
select * from paciente_doutor;
select * from doutor;
select * from admin;


select * from pessoa;
