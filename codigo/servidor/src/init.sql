CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile VARCHAR(30) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    contact VARCHAR(160) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(20) UNIQUE,
    client_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    status VARCHAR(30) NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    service_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_service_orders_client FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS financial_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entry_type VARCHAR(20) NOT NULL,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(60) NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    status VARCHAR(30) NOT NULL,
    entry_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO users (id, username, password, profile) VALUES
    (1, 'admin', '1234', 'admin');

INSERT IGNORE INTO clients (id, name, contact) VALUES
    (1, 'Administrador', 'admin@empresa.com');

INSERT IGNORE INTO service_orders (id, number, client_id, description, status, value, service_date) VALUES
    (1, 'OS-001', 1, 'Manutenção preventiva', 'Concluída', 150.00, '2024-01-15');

INSERT IGNORE INTO financial_entries (id, entry_type, description, category, value, status, entry_date) VALUES
    (1, 'Receita', 'Serviço técnico - OS-001', 'Serviços', 150.00, 'Paga', '2024-01-15'),
    (2, 'Despesa', 'Aluguel do espaço', 'Aluguel', 500.00, 'Paga', '2024-01-10'),
    (3, 'Despesa', 'Fornecimento de materiais', 'Fornecedores', 200.00, 'Paga', '2024-01-08');
