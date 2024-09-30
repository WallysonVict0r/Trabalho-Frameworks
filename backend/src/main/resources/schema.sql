/*CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
    );

CREATE TABLE IF NOT EXISTS tarefa (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    data_inicio TIMESTAMP,
    data_limite TIMESTAMP,
    concluida BOOLEAN DEFAULT false,
    id_usuario INT REFERENCES usuario(id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS habito (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS historico_habito (
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL
    );
INSERT INTO usuario (nome, email, senha) VALUES
     ('João da Silva', 'joao@teste.com', 'senha123'),
     ('Ana Maria Souza', 'maria@teste.com', 'senha456'),
     ('Carlos Pereira', 'carlos@teste.com', 'senha789');

INSERT INTO tarefa (descricao, data_inicio, data_limite, concluida, id_usuario) VALUES
    ('Finalizar projeto de sistemas', '2024-09-29 10:00:00', '2024-10-01 17:00:00', false, 1),
    ('Estudar para a prova', '2024-09-28 08:00:00', '2024-09-30 12:00:00', true, 2),
    ('Enviar relatório', '2024-09-27 09:30:00', '2024-10-03 23:59:00', false, 3);

INSERT INTO habito (descricao) VALUES
   ('Ler 30 minutos por dia'),
   ('Fazer exercícios físicos'),
   ('Meditar 15 minutos');

INSERT INTO historico_habito (data) VALUES
    ( '2024-09-28'),
    ( '2024-09-27'),
    ( '2024-09-26'),
    ( '2024-09-29'),
    ( '2024-09-29');*/