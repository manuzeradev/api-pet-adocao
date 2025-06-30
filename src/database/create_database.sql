CREATE DATABASE IF NOT EXISTS pets_db;
USE pets_db;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    phone VARCHAR(20),
    role ENUM('admin', 'adopter') NOT NULL
);


CREATE TABLE pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    species VARCHAR(50) NOT NULL,
    size ENUM('small', 'medium', 'large') NOT NULL,
    status ENUM('available', 'adopted') NOT NULL DEFAULT 'available',
    description TEXT
);

CREATE TABLE adoptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pet_id INT NOT NULL,
    adoption_date VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password, phone, role) VALUES
('Ana Souza', 'ana@example.com', '$2b$10$abc123AnaSenhaFakeHash', '11999998888', 'adopter'),
('Carlos Lima', 'carlos@example.com', '$2b$10$abc123CarlosSenhaFakeHash', '11988887777', 'admin'),
('Fernanda Dias', 'fernanda@example.com', '$2b$10$abc123FernandaSenhaFakeHash', '11977776666', 'adopter');

INSERT INTO pets (name, age, species, size, status, description) VALUES
('Rex', 3, 'dog', 'large', 'available', 'Cachorro dócil e brincalhão.'),
('Mimi', 2, 'cat', 'small', 'available', 'Gatinha calma e carinhosa.'),
('Bolt', 5, 'dog', 'medium', 'adopted', 'Muito energético e adora correr.');

INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES
(1, 3, '2025-06-01'),
(3, 2, '2025-06-10'),
(1, 1, '2025-06-15');